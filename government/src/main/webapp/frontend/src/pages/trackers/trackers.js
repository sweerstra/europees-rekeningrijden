import React, { Component } from 'react';
import ReactTable from 'react-table';
import Modal from 'react-modal';
import 'react-table/react-table.css';
import './trackers.css';

class Trackers extends Component {
  onFormChange = (e) => {
    const { name, value } = e.target;

    if (name === 'licensePlate') {
      if (value.match('^[A-Za-z]{2}-[0-9]{2}-[A-Za-z]{3}$')) {
        this.setState({ errors: ['License Plate is not valid.'] });
        return;
      }
    }

    this.setState(state => ({ addTracker: { ...state.addTracker, [name]: value } }));
  };
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
          licencePlate: '22-AB-134',
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
          licencePlate: '14-AB-133',
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
          licencePlate: '20-AC-166',
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
          licencePlate: '45-XY-487',
        }
      ],
      search: '',
      modalIsOpen: false,
      disableSave: true,
      addTracker: {}
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
            Header: 'Licence Plate',
            accessor: 'licencePlate'
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
            accessor: d => d.owner.usesBillriderWebsite ? 'X' : ''
          }
        ]
      }
    ];

    const history = [
      { name: 'O. Bean', date: 'Now' },
      { name: 'M. Smith', date: new Date('2017-09-09') },
      { name: 'P. Andrea', date: new Date('2011-01-07') },
      { name: 'C. Young', date: new Date('2002-06-04') }
    ];

    const { trackers, addTracker } = this.state;
    const saveIsDisabled = !addTracker.trackerId || !addTracker.licensePlate;
    const search = this.state.search.toLowerCase();

    const filtered = search
      ? trackers.filter(row => {
        return row.trackerType.toLowerCase().includes(search)
          || row.tariffCategory.toLowerCase().includes(search)
          || row.licencePlate.toLowerCase().includes(search)
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
          <span className="h1">Traxit Trackers</span>
        </nav>
        <div className="trackers__table">
          <ReactTable
            data={filtered}
            columns={columns}
            showPagination={false}
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
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add Tracker Modal"
        >
          <header className="modal__header">
            <h2>Add Tracker</h2>
            <span className="modal__header__close"
                  onClick={this.closeModal}>&times;</span>
          </header>

          <form className="modal__form">
            <label>
              Tracker ID
              <input type="text"
                     className="modal__form__tracker-id"
                     onChange={this.onFormChange}
                     name="trackerId"
                     placeholder="Enter ID here"/>
            </label>

            <section className="horizontal">
              <label>
                License Plate
                <input type="text"
                       onChange={this.onFormChange}
                       name="licensePlate" placeholder="Enter Plate here"/>
              </label>

              <label>
                Emission Category
                <input type="text" className="read-only"
                       readOnly="true" value={"Euro-1"}/>
              </label>
            </section>

            <section className="horizontal">
              <div className="modal__form__owners">
                <input type="text" placeholder="Search Owner..."/>
                <ul>
                  <li>H. Thompson</li>
                  <li>D. Jackson</li>
                  <li>H. Thompson</li>
                  <li>D. Jackson</li>
                  <li>H. Thompson</li>
                  <li>D. Jackson</li>
                </ul>
              </div>

              <div className="modal__form__owner">
                <label>
                  Name
                  <input type="text" className="read-only"
                         readOnly="true" value={"H. Thompson"}/>
                </label>

                <label>
                  Address
                  <input type="text" className="read-only"
                         readOnly="true" value={"Straatnaam 15, Goirle"}/>
                </label>

                <label>
                  Birthdate
                  <input type="text" className="read-only"
                         readOnly="true" value={"1980-01-01"}/>
                </label>
              </div>
            </section>

            <section className="modal__form__save">
              <button className="btn"
                      disabled={saveIsDisabled}>Save
              </button>
            </section>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Trackers;
