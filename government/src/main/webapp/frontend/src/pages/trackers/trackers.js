import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './trackers.css';

class Trackers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackers: [
        {
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
      search: ''
    };
  }

  render() {
    const columns = [
      {
        Header: 'Tracker',
        columns: [
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
            accessor: d => d.name
          },
          {
            Header: 'Uses Billriders',
            id: 'userBillriderWebsite',
            accessor: d => d.userBillriderWebsite
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

    const { trackers } = this.state;
    const search = this.state.search.toLowerCase();

    const filtered = search
      ? trackers.filter(row => {
        return row.trackerType.toLowerCase().includes(search)
          || row.tariffCategory.toLowerCase().includes(search)
          || row.licencePlate.toLowerCase().includes(search)
          || row.owner.name.toLowerCase().includes(search)

      })
      : trackers;

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
            <button className="btn">Add tracker</button>
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
      </div>
    );
  }
}

export default Trackers;
