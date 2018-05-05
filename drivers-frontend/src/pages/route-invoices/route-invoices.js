import React, { Component } from 'react';
import './route-invoices.css';
import Navigation from '../../components/Navigation/Navigation';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import RouteMap from '../../components/RouteMap/RouteMap';
import { DownloadIcon } from '../../icons';

class RouteInvoices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: [
        {
          id: 1,
          trackerId: 'ENG1234',
          name: 'H. Thompson',
          distanceTravelled: 56,
          totalAmount: 110.22,
          month: '2017-07-09',
          paid: true
        },
        {
          id: 2,
          trackerId: 'ENG1234',
          name: 'H. Thompson',
          distanceTravelled: 14.2,
          totalAmount: 30.89,
          month: '2017-12-12',
          paid: false
        },
        {
          id: 3,
          trackerId: 'ENG5678',
          name: 'J. Smith',
          distanceTravelled: 120.5,
          totalAmount: 206,
          month: '2018-01-01',
          paid: true
        }
      ],
      selectedInvoice: {
        id: 0,
        routes: [{ "latitude": 51.50986, "longitude": -0.11812 }, {
          "latitude": 51.51164000000001,
          "longitude": -0.11903000000000001
        }, { "latitude": 51.5127, "longitude": -0.11850000000000001 }, {
          "latitude": 51.51328,
          "longitude": -0.11767000000000001
        }, { "latitude": 51.51474, "longitude": -0.11861000000000001 }, {
          "latitude": 51.517360000000004,
          "longitude": -0.12034000000000002
        }, { "latitude": 51.519310000000004, "longitude": -0.12149000000000001 }, {
          "latitude": 51.523680000000006,
          "longitude": -0.12676
        }, { "latitude": 51.52711000000001, "longitude": -0.13054000000000002 }, {
          "latitude": 51.52573,
          "longitude": -0.13533
        }, { "latitude": 51.52398, "longitude": -0.14404 }, {
          "latitude": 51.522310000000004,
          "longitude": -0.15617
        }, { "latitude": 51.52049, "longitude": -0.16689 }, {
          "latitude": 51.51993,
          "longitude": -0.18151
        }, { "latitude": 51.519540000000006, "longitude": -0.18848 }, {
          "latitude": 51.52046000000001,
          "longitude": -0.19508
        }, { "latitude": 51.52149000000001, "longitude": -0.20161 }, {
          "latitude": 51.51921,
          "longitude": -0.20624
        }, { "latitude": 51.51576000000001, "longitude": -0.21727000000000002 }, {
          "latitude": 51.514230000000005,
          "longitude": -0.23701000000000003
        }, { "latitude": 51.513980000000004, "longitude": -0.24670000000000003 }, {
          "latitude": 51.51447,
          "longitude": -0.25499
        }, { "latitude": 51.517030000000005, "longitude": -0.2606 }, {
          "latitude": 51.52268,
          "longitude": -0.26464000000000004
        }, { "latitude": 51.525670000000005, "longitude": -0.27221 }, {
          "latitude": 51.526810000000005,
          "longitude": -0.28284000000000004
        }, { "latitude": 51.529740000000004, "longitude": -0.29281 }, {
          "latitude": 51.531180000000006,
          "longitude": -0.30499000000000004
        }, { "latitude": 51.534510000000004, "longitude": -0.33819000000000005 }, {
          "latitude": 51.53945,
          "longitude": -0.36328000000000005
        }, { "latitude": 51.54079, "longitude": -0.37143000000000004 }, {
          "latitude": 51.544720000000005,
          "longitude": -0.38322
        }, { "latitude": 51.547650000000004, "longitude": -0.39353000000000005 }, {
          "latitude": 51.54797000000001,
          "longitude": -0.40349
        }, { "latitude": 51.5484, "longitude": -0.41922000000000004 }, {
          "latitude": 51.549690000000005,
          "longitude": -0.43526000000000004
        }]
      }
    };
  }

  render() {
    const columns = [
      {
        Header: 'ID',
        accessor: 'id',
        id: 'id'
      },
      {
        Header: 'Tracker ID',
        accessor: 'trackerId',
        id: 'trackerId'
      },
      {
        Header: 'Distance',
        id: 'distanceTravelled',
        accessor: d => <span>{d.distanceTravelled} km</span>
      },
      {
        Header: 'Total Amount',
        id: 'totalAmount',
        accessor: d => <span>&#163; {d.totalAmount.toFixed(2)}</span>
      },
      {
        Header: 'Paid',
        id: 'paid',
        accessor: d => d.paid ? <span>&#x2713;</span> : undefined
      },
      {
        Header: 'Month',
        id: 'month',
        accessor: d => <span>{new Date(d.month).toLocaleString('en-GB', { month: 'long', year: 'numeric' })}</span>
      },
      {
        id: 'download',
        accessor: d => <DownloadIcon onClick={e => {
          // prevent selection of invoice, we just want to download
          e.stopPropagation();

          // TODO: make call to invoice PDF service

        }}/>
      }
    ];

    const { selectedInvoice } = this.state;

    return (
      <div className="route-invoices">
        <Navigation heading="Traxit Route Invoices"/>
        <div className="route-invoices__table">
          <ReactTable
            data={this.state.invoices}
            getTrProps={(state, rowInfo) => {
              const isSelected = rowInfo && rowInfo.original.id === selectedInvoice.id;

              return {
                onClick: () => {
                  this.setState(state => ({
                    selectedInvoice: { ...state.selectedInvoice, ...rowInfo.original }
                  }));

                  // TODO: fetch routes from invoice

                },
                className: isSelected ? 'active' : '',
                style: {
                  color: isSelected ? 'white' : 'black',
                  backgroundColor: isSelected ? '#3F51B5' : 'white'
                }
              }
            }}
            columns={columns}
            showPagination={false}
            minRows="0"
          />
        </div>
        <div className="route-invoices__map">
          <RouteMap route={{
            id: selectedInvoice.id,
            coordinates: selectedInvoice.routes
          }}/>
        </div>
      </div>
    );
  }
}

export default RouteInvoices;
