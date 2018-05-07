import React, { Component } from 'react';
import './route-invoices.css';
import Navigation from '../../components/Navigation/Navigation';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import RouteMap from '../../components/RouteMap/RouteMap';
import { FileTextIcon } from '../../icons';
import Api from '../../api';

class RouteInvoices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: [],
      selectedInvoice: {
        id: 0,
        routes: []
      }
    };
  }

  componentDidMount() {
    Api.invoice.getInvoices()
      .then(invoices => this.setState({ invoices }));
  }

  render() {
    const columns = [
      {
        Header: 'Tracker ID',
        accessor: 'trackerId',
        id: 'trackerId'
      },
      {
        Header: 'License Plate',
        id: 'licensePlate',
        accessor: d => d.vehicle ? d.vehicle.licensePlate : undefined
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
        Header: 'Status',
        id: 'paid',
        accessor: 'paid'
      },
      {
        Header: 'Billing Month',
        id: 'month',
        accessor: d => <span>{new Date(`2018-${d.billingMonth}-01`).toLocaleString('en-GB', {
          month: 'long',
          year: 'numeric'
        })}</span>
      },
      {
        Header: 'PDF',
        id: 'open',
        accessor: d => <FileTextIcon onClick={e => {
          // prevent selection of invoice, we just want to download
          e.stopPropagation();

          const url = Api.invoice.getDownloadUrl(d.id);
          window.open(url, '_blank');
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
              const id = rowInfo ? rowInfo.original.id : null;
              const isSelected = id === selectedInvoice.id;

              return {
                onClick: () => {
                  if (id === null) return;

                  Api.route.getRoute(id)
                    .then(({ routes }) => this.setState(state => ({
                      selectedInvoice: { id, routes }
                    })));
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
