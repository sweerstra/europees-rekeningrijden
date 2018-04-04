import React, { Component } from 'react';
import ReactTable from 'react-table';
import Modal from 'react-modal';
import 'react-table/react-table.css';
import './trackers.css';
import AddTracker from '../../components/AddTracker/AddTracker';

class Trackers extends Component {
  onAddTracker = (e) => {
    const { target } = e;
    e.preventDefault();

    const trackerId = target.trackerId.value;
    const licensePlate = target.licensePlate.value;

    const tracker = {
      trackerId, licensePlate,
      vehicleId: trackerId,
      trackerType: 'HP autotracker',
      owner: {
        name: 'H. Thompson',
        usesBillriderWebsite: false
      },
      tariffCategory: 'Euro 1',
    };

    this.setState(state => ({ trackers: [...state.trackers, tracker] }))
  };

  fetchPreviousOwner() {
    this.setState(state => ({ history: state.history.slice(0, -1) }));
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
      trackers: [
        {
          trackerId: 1,
          vehicleId: 1,
          trackerType: 'HP autotracker',
          owner: {
            name: 'H. Thompson',
            usesBillriderWebsite: false
          },
          tariffCategory: 'Euro 1',
          licensePlate: '22-AB-134',
        },
        {
          trackerId: 2,
          vehicleId: 2,
          trackerType: 'Acer GPS system',
          owner: {
            name: 'B Thompson',
            usesBillriderWebsite: true
          },
          tariffCategory: 'Euro 2',
          licensePlate: '14-AB-133',
        },
        {
          trackerId: 3,
          vehicleId: 3,
          trackerType: 'TomTom ATS',
          owner: {
            name: 'C. Thompson',
            usesBillriderWebsite: true
          },
          tariffCategory: 'Euro 3',
          licensePlate: '20-AC-166',
        },
        {
          trackerId: 4,
          vehicleId: 4,
          trackerType: 'TomTom ATS',
          owner: {
            name: 'M. Smith',
            usesBillriderWebsite: true
          },
          tariffCategory: 'Euro 4',
          licensePlate: '45-XY-487',
        }
      ],
      history: [
        { name: 'O. Bean', date: 'Now' },
        { name: 'M. Smith', date: new Date('2017-09-09') },
        { name: 'P. Andrea', date: new Date('2011-01-07') },
        { name: 'C. Young', date: new Date('2002-06-04') }
      ],
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
            accessor: 'trackerId',
            id: 'trackerId'
          },
          {
            Header: 'Vehicle ID',
            accessor: 'vehicleId',
            id: 'vehicleId'
          },
          {
            Header: 'Tracker Type',
            accessor: 'trackerType'
          },
          {
            Header: 'Tariff Category',
            accessor: 'tariffCategory'
          },
          {
            Header: 'License Plate',
            accessor: 'licensePlate'
          }
        ]
      },
      {
        Header: 'Owner',
        columns: [
          {
            Header: 'Name',
            id: 'name',
            accessor: d => d.owner.name
          },
          {
            Header: 'Uses Billriders',
            id: 'usesBillriderWebsite',
            accessor: d => d.owner.usesBillriderWebsite ? <span>&times;</span> : undefined
          }
        ]
      }
    ];

    const { trackers, history, modalIsOpen, selectedRow } = this.state;
    const search = this.state.search.toLowerCase();

    const filtered = search
      ? trackers.filter(row => {
        return row.trackerType.toLowerCase().includes(search)
          || row.tariffCategory.toLowerCase().includes(search)
          || row.licensePlate.toLowerCase().includes(search)
          || row.owner.name.toLowerCase().includes(search)

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
        <nav className="trackers__nav">
          <h1>Traxit Trackers</h1>
        </nav>
        <div className="trackers__table">
          <ReactTable
            data={filtered}
            columns={columns}
            showPagination={false}
            getTrProps={(state, rowInfo) => {
              const isSelected = rowInfo && rowInfo.original.trackerId === selectedRow;
              return {
                onClick: () => {
                  this.fetchPreviousOwner(rowInfo.original);
                  this.setState({ selectedRow: rowInfo.original.trackerId })
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
            <button className="btn" onClick={this.openModal}>Add tracker</button>
          </div>
          <div className="trackers__administration__history">
            <h2>Tracker History</h2>
            <div className="tracker-history">
              {history.map(({ name, date }, index) =>
                <div className="history" key={index}>
                  <span>{name}</span>
                  <span>{typeof date === 'object' ? date.toLocaleDateString() : date}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add Tracker Modal"
        >
          <header className="modal__header">
            <h2>Add Tracker</h2>
            <span className="modal__header__close"
                  onClick={this.closeModal}>&times;</span>
          </header>

          <AddTracker onAddTracker={this.onAddTracker}/>

        </Modal>
      </div>
    );
  }
}

export default Trackers;
