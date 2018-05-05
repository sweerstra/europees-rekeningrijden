import React, { Component } from 'react';
import './route-invoices.css';
import Navigation from '../../components/Navigation/Navigation';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import RouteMap from '../../components/RouteMap/RouteMap';
import { DownloadIcon } from '../../icons/index';

class RouteInvoices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: [
        {
          id: 1,
          vehicleId: 1,
          name: 'H. Thompson',
          totalAmount: 110.22,
          paid: true
        },
        {
          id: 2,
          vehicleId: 2,
          name: 'J. Smith',
          totalAmount: 60,
          paid: false
        }
      ],
      selectedInvoice: {
        id: 0,
        routes: []
      }
    };
  }

  render() {
    const columns = [
      {
        Header: 'Invoice ID',
        accessor: 'id',
        id: 'id'
      },
      {
        Header: 'Vehicle ID',
        accessor: 'vehicleId',
        id: 'vehicleId'
      },
      {
        Header: 'Person name',
        accessor: 'name'
      },
      {
        Header: 'Total Amount',
        accessor: 'totalAmount'
      },
      {
        Header: 'Paid',
        id: 'paid',
        accessor: d => d.paid ? <span>&#x2713;</span> : undefined
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
                  this.setState({ selectedInvoice: rowInfo.original });
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
          <RouteMap routes={selectedInvoice.routes}/>
        </div>
      </div>
    );
  }
}

export default RouteInvoices;
