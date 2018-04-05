import React, { Component } from 'react';
import './invoices.css';
import ReactTable from 'react-table';
import Navigation from "../../components/Navigation/Navigation";

class Invoices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoices: [
        {
          invoiceId: 1,
          vehicleId: 1,
          name: 'H. Thompson',
          totalAmount: 110.22,
          paid: true
        },
        {
          invoiceId: 2,
          vehicleId: 2,
          name: 'J. Smith',
          totalAmount: 60,
          paid: false
        }
      ],
      logs: [
        {
          id: 3,
          type: 'error'
        },
        {
          id: 4,
          type: 'error'
        },
        {
          id: 5,
          type: 'error'
        },
        {
          id: 6,
          type: 'error'
        },
      ]
    };
  }

  render() {
    const columns = [
      {
        Header: 'Invoice ID',
        accessor: 'invoiceId',
        id: 'invoiceId'
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
        accessor: d => d.paid ? <span>&times;</span> : undefined
      },
      {
        Header: 'Action',
        id: 'recalculate',
        accessor: d => <a href="#">Recalculate</a>
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
        <div className="invoices__logs">
          <h2>Generated invoices</h2>
          {this.state.logs.map(({ id, type }, index) =>
            <div className="invoices__log" key={index}>
              {type === 'error'
                ? `Error generating invoice with id ${id}`
                : `Generated new invoice with id: ${id}`}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Invoices;
