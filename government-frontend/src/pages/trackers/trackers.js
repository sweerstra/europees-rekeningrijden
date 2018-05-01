import React, { Component } from 'react';
import ReactTable from 'react-table';
import Modal from 'react-modal';
import 'react-table/react-table.css';
import './trackers.css';
import Navigation from '../../components/Navigation/Navigation';
import TrackerModal from '../../components/TrackerModal/TrackerModal';
import { Link } from 'react-router-dom';
import Api from '../../api';
import { EditIcon, RemoveIcon } from '../../images/index';

class Trackers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackers: [],
      history: [],
      search: '',
      modalIsOpen: false,
      selectedRow: null,
      isEditing: false,
      trackerToEdit: null
    };

    Modal.setAppElement('body');
  }

  componentDidMount() {
    Api.ownership.getLatest()
      .then(trackers => this.setState({ trackers }));
  }

  onAddTracker = (tracker) => {
    Api.ownership.add(tracker)
      .then(createdTracker => this.setState(state => ({ trackers: [...state.trackers, createdTracker] })));
  };

  onEditTracker = (tracker) => {
    Api.ownership.edit(tracker)
      .then(updatedTracker => {
        this.setState(state => ({
          trackers: state.trackers.map(t => {
            if (t.trackerId === updatedTracker.trackerId) {
              return updatedTracker;
            }
            return t;
          })
        }));
      });
  };

  fetchOwnershipForTracker(trackerId) {
    Api.ownership.getByTrackerId(trackerId)
      .then(history => this.setState(state => ({ history })));
  }

  showModal = (modalIsOpen) => this.setState({ modalIsOpen });

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
      },
      {
        columns: [
          {
            Header: 'Edit',
            id: 'edit',
            accessor: ({ id, trackerId }) =>
              <EditIcon onClick={e => {
                e.stopPropagation();
                console.log('tracker to edit: ', id, trackerId);
                this.setState({ isEditing: true, trackerToEdit: { id, trackerId } });
                this.showModal(true);
              }}/>
          },
          {
            Header: 'Remove',
            id: 'remove',
            accessor: ({ id }) => {
              return <RemoveIcon onClick={e => {
                e.stopPropagation();

                Api.ownership.remove(id)
                  .then(() => {
                    this.setState(({ trackers }) => {
                      const index = trackers.findIndex(t => t.id === id);
                      trackers.splice(index, 1);
                      return ({ trackers });
                    });
                  });
              }}/>;
            }
          }
        ]
      }
    ];

    const { trackers, history, modalIsOpen, selectedRow, isEditing, trackerToEdit } = this.state;
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
                  const { trackerId } = rowInfo.original;

                  this.fetchOwnershipForTracker(trackerId);
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
              <button className="btn blue" onClick={() => this.showModal(true)}>Add tracker</button>
              <Link to="/invoices">View invoices</Link>
              <Link to="/region">View regions</Link>
            </div>
          </div>
          <div className="trackers__administration__history">
            <h2>Vehicle History</h2>
            <div className="tracker-history">
              {
                history.length > 0
                  ? history.map(({ vehicle, owner, startDate, endDate }, index) => {
                    owner = owner || { firstName: '', lastName: '' };
                    vehicle = vehicle || { licensePlate: '' };

                    return <div className="history" key={index}><span>{vehicle.licensePlate}</span>
                      <span>{`${owner.firstName} ${owner.lastName}`}</span>
                      <span className="history__date">{new Date(startDate).toLocaleDateString()}</span>
                      <span className="history__date">{endDate ? new Date(endDate).toLocaleDateString() : 'Now'}</span>
                    </div>;
                  })
                  : <div>Select a tracker to see it's vehicle history</div>
              }
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => {
            this.showModal(false);
            this.setState({ isEditing: false });
          }}
          style={customStyles}
          contentLabel="Add Tracker Modal"
        >
          <span className="modal__header__close"
                onClick={() => this.showModal(false)}>&times;</span>
          <header className="modal__header">
            <h2>{isEditing ? 'Edit Tracker' : 'Add Tracker'}</h2>
          </header>

          <TrackerModal
            onSave={tracker => {
              if (isEditing) {
                this.onEditTracker(tracker);
              } else {
                this.onAddTracker(tracker);
              }
              this.showModal(false);
            }}
            trackerToEdit={trackerToEdit}
            isEditing={isEditing}/>
        </Modal>
      </div>
    );
  }
}

export default Trackers;
