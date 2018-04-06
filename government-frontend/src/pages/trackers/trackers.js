import React, { Component } from 'react';
import ReactTable from 'react-table';
import Modal from 'react-modal';
import 'react-table/react-table.css';
import './trackers.css';
import Navigation from '../../components/Navigation/Navigation';
import AddTracker from '../../components/AddTracker/AddTracker';
import { Link } from "react-router-dom";
import Api from '../../api';

class Trackers extends Component {
  componentDidMount() {
    Api.ownership.getLatest()
      .then(ownerships => this.setState({ trackers: ownerships }));
  }

  onAddTracker = (ownership) => {
    console.log('API -> Add ownership', ownership);

    Api.ownership.add(ownership)
      .then(ownership => {
        this.setState(state => ({ trackers: [...state.trackers, ownership] }));
        this.closeModal();
      });
  };

  fetchPreviousOwnership(owner) {
    Api.ownership.getByOwner(owner.id)
      .then(history => this.setState(state => ({ history })));
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  constructor(props) {
    super(props);

    this.state = {
      trackers: [],
      history: [],
      search: '',
      modalIsOpen: false,
      selectedRow: null
    };
  }

  render() {
    const columns = [
      {
        Header: 'Tracker',
        columns: [
          {
            Header: 'Tracker ID',
            id: 'trackerId',
            accessor: d => d.vehicle.trackerId
          },
          {
            Header: 'Vehicle ID',
            id: 'vehicleId',
            accessor: d => d.vehicle.id
          },
          {
            Header: 'Tracker Type',
            id: 'trackerType',
            accessor: d => d.vehicle.typeTracker
          },
          {
            Header: 'Emission Category',
            id: 'emissionCategory',
            accessor: d => d.vehicle.emissionCategory
          },
          {
            Header: 'License Plate',
            id: 'licensePlate',
            accessor: d => d.vehicle.licensePlate
          }
        ]
      },
      {
        Header: 'Owner',
        columns: [
          {
            Header: 'Name',
            id: 'name',
            accessor: d => d.owner.firstName + ' ' + d.owner.lastName
          },
          {
            Header: 'Uses Billriders',
            id: 'usesBillriderWebsite',
            accessor: d => d.owner.usesBillriderWebsite ? <span>&#x2713;</span> : undefined
          }
        ]
      }
    ];

    const { trackers, history, modalIsOpen, selectedRow } = this.state;
    const search = this.state.search.toLowerCase();

    const filtered = search
      ? trackers.filter(row => {
        return row.vehicle.trackerId.toLowerCase().includes(search)
          || row.vehicle.typeTracker.toLowerCase().includes(search)
          || row.vehicle.emissionCategory.toLowerCase().includes(search)
          || row.vehicle.licensePlate.toLowerCase().includes(search)
          || row.owner.firstName.toLowerCase().includes(search)
          || row.owner.lastName.toLowerCase().includes(search)
      })
      : trackers;

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: '20px 100px 30px 100px',
        transform: 'translate(-50%, -50%)'
      }
    };

    return (
      <div className="trackers">
        <Navigation heading="Traxit Trackers"
                    onLogout={this.props.onLogout}/>
        <div className="trackers__table">
          <ReactTable
            data={filtered}
            columns={columns}
            showPagination={false}
            getTrProps={(state, rowInfo) => {
              const isSelected = rowInfo && rowInfo.original.vehicle.trackerId === selectedRow;
              return {
                onClick: () => {
                  this.fetchPreviousOwnership(rowInfo.original.owner);
                  this.setState({ selectedRow: rowInfo.original.vehicle.trackerId })
                },
                style: {
                  color: isSelected ? 'white' : 'black',
                  backgroundColor: isSelected ? '#3F51B5' : 'white'
                }
              }
            }}
          />
        </div>
        <div className="trackers__administration">
          <div className="trackers__administration__controls">
            <input placeholder="Search trackers..."
                   onChange={e => this.setState({ search: e.target.value })}/>
            <hr/>
            <div className="trackers__navigation__buttons">
              <button className="btn blue" onClick={this.openModal}>Add tracker</button>
              <Link to="/invoices">View invoices</Link>
            </div>
          </div>
          <div className="trackers__administration__history">
            <h2>Tracker History</h2>
            <div className="tracker-history">
              {
                history.length > 0
                  ? history.map(({ vehicle: { trackerId }, owner: { firstName, lastName }, startDate, endDate }, index) =>
                    <div className="history" key={index}>
                      <span>{trackerId}</span>
                      <span className="history__date">{new Date(startDate).toLocaleDateString()}</span>
                      <span className="history__date">{endDate ? new Date(endDate).toLocaleDateString() : 'Now'}</span>
                    </div>
                  )
                  : <div>Select a tracker to see it's history</div>
              }
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add Tracker Modal"
        >
          <span className="modal__header__close"
                onClick={this.closeModal}>&times;</span>
          <header className="modal__header">
            <h2>Add Tracker</h2>
          </header>

          <AddTracker onAdd={this.onAddTracker}/>
        </Modal>
      </div>
    );
  }
}

export default Trackers;
