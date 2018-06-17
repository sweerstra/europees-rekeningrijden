import React, { Component } from 'react';
import './invoices.css';
import ReactTable from 'react-table';
import Navigation from '../../components/Navigation/Navigation';
import Api from '../../api';

class Invoices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: [],
      logs: []
    };
  }

  componentDidMount() {
    Api.invoices.getAll()
      .then(invoices => this.setState({ invoices }));
  }

  render() {
    const columns = [
      {
        Header: 'Tracker ID',
        id: 'trackerId',
        accessor: d => d.ownership ? d.ownership.trackerId : undefined
      },
      {
        Header: 'Owner',
        id: 'owner',
        accessor: d => d.ownership ? d.ownership.owner.firstName + ' ' + d.ownership.owner.lastName : undefined
      },
      {
        Header: 'License Plate',
        id: 'licensePlate',
        accessor: d => d.ownership ? d.ownership.vehicle.licensePlate : undefined
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
        accessor: d => <span>{new Date(d.billingDate.slice(0, -5)).toLocaleString('en-GB', {
          month: 'long',
          year: 'numeric'
        })}</span>
      }
    ];

    return (
      <div className="invoices">
        <Navigation heading="Traxit Invoices"
                    onLogout={this.props.onLogout}/>
        <div className="invoices__table">
          <ReactTable
            data={this.state.invoices}
            columns={columns}
            showPagination={false}
          />
        </div>
      </div>
    );
  }
}

export default Invoices;
