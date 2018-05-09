import React, { Component } from 'react';
import ReactTable from 'react-table';
import './vehicles.css';
import Api from '../../api';
import Navigation from '../../components/Navigation/Navigation';
import { ShareIcon } from '../../icons/index';

class Vehicles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: [],
      selectedVehicle: {}
    };
  }

  componentDidMount() {
    Api.vehicle.getCurrentTrackersWithVehicleByOwner(1)
      .then(vehicles => {
        this.setState({ vehicles: vehicles.map(({ trackerId, vehicle }) => ({ trackerId, ...vehicle })) });
      });
  }

  render() {
    const columns = [
      {
        Header: 'License Plate',
        accessor: 'licensePlate'
      },
      {
        Header: 'Emission Category',
        accessor: 'emissionCategory'
      },
      {
        Header: 'Tracker ID',
        accessor: 'trackerId'
      },
      {
        Header: 'Sign Over Vehicle',
        id: 'signOver',
        accessor: d => <ShareIcon onClick={() => this.setState({ selectedVehicle: d })}/>
      }
    ];

    const { vehicles, selectedVehicle, email, firstName, lastName, isVerifiedSignOverDetails, password } = this.state;

    const isEmptySignOverDetails = !email || !firstName || !lastName;

    return (
      <div className="vehicles">
        <Navigation heading="Traxit Driver Vehicles"/>
        <div className="vehicles__table">
          <ReactTable
            data={vehicles}
            getTrProps={(state, rowInfo) => {
              const id = rowInfo ? rowInfo.original.id : null;
              const isSelected = id === selectedVehicle.id;

              return {
                className: isSelected ? 'active' : '',
                style: {
                  color: isSelected ? 'white' : 'black',
                  backgroundColor: isSelected ? '#3F51B5' : 'white'
                }
              }
            }}
            columns={columns}
            minRows="0"
            showPagination={false}
          />
        </div>
        {selectedVehicle.id && <form className="vehicles__sign-over">
          <fieldset disabled={isVerifiedSignOverDetails}>
            <h2>Vehicle Receiver Details</h2>

            <section>
              <label>
                Email address
                <input type="email"
                       onChange={this.onSignOverChange}
                       required
                       name="email" placeholder="Email"/>
              </label>
            </section>
            <section className="vehicles__sign-over__user-details">
              <label>
                Name
                <input type="text"
                       onChange={this.onSignOverChange}
                       required
                       name="firstName" placeholder="First name"/>
              </label>
              <label>
                &nbsp;
                <input type="text"
                       onChange={this.onSignOverChange}
                       required
                       name="lastName" placeholder="Last name"/>
              </label>
            </section>
            <button className="btn blue" disabled={isEmptySignOverDetails}
                    onClick={() => this.setState({ isVerifiedSignOverDetails: true })}>Verify Receiver
            </button>
          </fieldset>

          <fieldset disabled={!isVerifiedSignOverDetails}>
            <section>
              <label>
                Confirm Your Password
                <input type="password"
                       onChange={this.onSignOverChange}
                       required
                       name="password" placeholder="Password"/>
              </label>
            </section>
            {isVerifiedSignOverDetails && <section className="vehicles__sign-over__warning">
              <span>
                Please make sure this is the vehicle you want to sign over to&nbsp;
                <b>{`${firstName} ${lastName}`}</b>
              </span>
            </section>}
            <section className="vehicles__sign-over__confirmation">
              <input type="text" value={selectedVehicle.licensePlate} readOnly="true"/>
              <button className="btn red" disabled={!password}>Confirm Sign Over</button>
            </section>
          </fieldset>
        </form>}
      </div>
    );
  }

  onSignOverChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }
}

export default Vehicles;
