import React, { Component } from 'react';
import './account.css';
import Navigation from '../../components/Navigation/Navigation';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import RouteMap from '../../components/RouteMap/RouteMap';
import { CreditCardIcon, FileTextIcon } from '../../icons';
import Api from '../../api';
import { getLoggedInProperty } from "../../api/auth";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: {},
      selectedInvoice: {
        id: 0,
        routes: []
      }
    };
  }

  componentDidMount() {
    const ownerId = getLoggedInProperty('ownerId');
    Api.user.getUserDetails(ownerId)
      .then(account => this.setState({ account }));
  }

  render() {
    const { selectedInvoice, account } = this.state;

    return (
      <div className="route-account">
        <Navigation heading="Account Details"/>

        <form className="acount-details__form">
          <fieldset>
            <label className="namer">First Name:</label>
            <label>{account.firstName}</label>
          </fieldset>
          <fieldset>
            <label className="namer">Last Name:</label>
            <label>{account.lastName}</label>
          </fieldset>
          <fieldset>
            <label className="namer">Birthday:</label>
            <label>{account.dateOfBirth}</label>
          </fieldset>
          <fieldset>
            <label className="namer">Address:</label>
            <label>{account.address}</label>
          </fieldset>
          <fieldset>
            <label className="namer">City:</label>
            <label>{account.city}</label>
          </fieldset>
          <fieldset>
            <label className="namer">PostalCode:</label>
            <label>{account.postalCode}</label>
          </fieldset>
          <fieldset>
            <label className="namer">Phone:</label>
            <label>{account.phone}</label>
          </fieldset>
          <fieldset>
            <label className="namer">Email:</label>
            <label>{account.email}</label>
          </fieldset>
        </form>

        <div className="route-account__map">
          <RouteMap route={{
            id: selectedInvoice.id,
            coordinates: selectedInvoice.routes
          }}/>
        </div>
      </div>
    );
  }
}

export default Account;
