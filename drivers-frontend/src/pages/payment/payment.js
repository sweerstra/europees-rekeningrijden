import React, { Component } from 'react';
import './payment.css';

class Payment extends Component {
  render() {
    const { search } = this.props.location;
    const params = new URLSearchParams(search);
    const invoiceId = params.get('invoiceId');

    const { isSuccessful } = this.props;

    return (
      isSuccessful
        ? <div className="payment green">
          <h2>Payment Successful!</h2>
          <p>Your payment for the invoice with id: {invoiceId} was processed.</p>
          <a href="/invoices">Go back to invoices page</a>
        </div>
        : <div className="payment red">
          <h2>Something went wrong with your payment</h2>
          <p>Your payment failed.</p>
          <a href="/invoices">Go back to invoices page</a>
        </div>
    );
  }
}

export default Payment;
