import React, { Component } from 'react';
import './payment.css';

class Payment extends Component {
  render() {
    const { invoiceId } = this.props.match.params;

    console.log(invoiceId);

    return (
      <div className="payment">

      </div>
    );
  }
}

export default Payment;
