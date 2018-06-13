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
      account: null,
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


  /*  private String firstName;
    private String lastName;
    private String address;
    private String postalCode;
    private String city;
    private String phone;
    private String email;
    private Date dateOfBirth;*/

  render() {


    const { selectedInvoice, account } = this.state;

    return (
      <div className="route-account">
        <Navigation heading="Account Details"/>

        <form class="acount-details__form">
          <fieldset>
            <label>First Name:</label>
            <label></label>
          </fieldset>
          <fieldset>
            <label>Last Name:</label>
            <label> </label>
          </fieldset>
          <fieldset>
            <label>Address:</label>
            <label> </label>
          </fieldset>
          <fieldset>
            <label>City:</label>
            <label> </label>
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
