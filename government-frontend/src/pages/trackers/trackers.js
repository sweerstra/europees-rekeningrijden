import React, { Component } from 'react';
import ReactTable from 'react-table';
import Modal from 'react-modal';
import 'react-table/react-table.css';
import './trackers.css';
import Navigation from '../../components/Navigation/Navigation';
import AddTracker from '../../components/AddTracker/AddTracker';
import { Link } from 'react-router-dom';
import Api from '../../api';

class Trackers extends Component {
  componentDidMount() {
    Api.ownership.getLatest()
      .then(ownerships => this.setState({ trackers: ownerships }));
  }

  onAddTracker = (ownership) => {
    console.log({ ownership });

    Api.ownership.add(ownership)
      .then(ownership => {
        this.setState(state => ({ trackers: [...state.trackers, ownership] }));
        this.closeModal();
      });
  };

  fetchPreviousOwnershipFromVehicle(vehicle, trackerId) {
    Api.ownership.getByVehicleOrTrackerId(vehicle.id, trackerId)
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
            accessor: d => d.trackerId
          },
          {
            Header: 'License Plate',
            id: 'licensePlate',
            accessor: d => d.vehicle ? d.vehicle.licensePlate : 'n/a'
          },
          {
            Header: 'Tracker Type',
            id: 'trackerType',
            accessor: d => d.vehicle ? d.vehicle.typeTracker : 'n/a'
          },
          {
            Header: 'Emission Category',
            id: 'emissionCategory',
            accessor: d => d.vehicle ? d.vehicle.emissionCategory : 'n/a'
          }
        ]
      },
      {
        Header: 'Owner',
        columns: [
          {
            Header: 'Name',
            id: 'name',
            accessor: d => d.owner ? `${d.owner.firstName} ${d.owner.lastName}` : 'n/a'
          },
          {
            Header: 'Uses Billriders',
            id: 'usesBillriderWebsite',
            accessor: d => d.owner && d.owner.usesBillriderWebsite ? <span>&#x2713;</span> : undefined
          }
        ]
      }
    ];

    const { trackers, history, modalIsOpen, selectedRow } = this.state;
    const search = this.state.search.toLowerCase();

    const filtered = search
      ? trackers.filter(({ trackerId, vehicle, owner }) => {
        vehicle = vehicle || { typeTracker: '', emissionCategory: '', licensePlate: '' };
        owner = owner || { firstName: '', lastName: '' };

        return trackerId.toLowerCase().includes(search)
          || vehicle.typeTracker.toLowerCase().includes(search)
          || vehicle.emissionCategory.toLowerCase().includes(search)
          || vehicle.licensePlate.toLowerCase().includes(search)
          || owner.firstName.toLowerCase().includes(search)
          || owner.lastName.toLowerCase().includes(search)
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
            getTrProps={(state, rowInfo) => {
              const isSelected = rowInfo && rowInfo.original.trackerId === selectedRow;

              return {
                onClick: () => {
                  const { trackerId, vehicle } = rowInfo.original;

                  if (vehicle) {
                    this.fetchPreviousOwnershipFromVehicle(vehicle, trackerId);
                  }

                  this.setState({ selectedRow: trackerId });
                },
                style: {
                  color: isSelected ? 'white' : 'black',
                  backgroundColor: isSelected ? '#3F51B5' : 'white'
                }
              }
            }}
            minRows="5"
            showPagination={false}
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
              <Link to="/region">View regions</Link>
            </div>
          </div>
          <div className="trackers__administration__history">
            <h2>Vehicle History</h2>
            <div className="tracker-history">
              {
                history.length > 0
                  ? history.map(({ trackerId, vehicle: { licensePlate }, owner: { firstName, lastName }, startDate, endDate }, index) =>
                    <div className="history" key={index}>
                      <span>{licensePlate}</span>
                      <span>{`${firstName} ${lastName}`}</span>
                      <span className="history__date">{new Date(startDate).toLocaleDateString()}</span>
                      <span className="history__date">{endDate ? new Date(endDate).toLocaleDateString() : 'Now'}</span>
                    </div>
                  )
                  : <div>Select a tracker to see it's vehicle history</div>
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
