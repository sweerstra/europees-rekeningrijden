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
      vehicles: []
    };
  }

  componentDidMount() {
    Api.vehicle.getCurrentVehiclesByOwner(1)
      .then(vehicles => this.setState({ vehicles }));
  }

  render() {
    const columns = [
      {
        Header: 'License Plate',
        id: 'licensePlate',
        accessor: d => d.vehicle ? d.vehicle.licensePlate : 'n/a'
      },
      {
        Header: 'Emission Category',
        id: 'emissionCategory',
        accessor: d => d.vehicle ? d.vehicle.emissionCategory : 'n/a'
      },
      {
        Header: 'Tracker ID',
        accessor: 'trackerId'
      },
      {
        Header: 'Sign Over Vehicle',
        id: 'signOver',
        accessor: d => <ShareIcon onClick={() => console.log('Sign Over')}/>
      }
    ];

    const { vehicles } = this.state;

    return (
      <div className="vehicles">
        <Navigation heading="Traxit Driver Vehicles"/>
        <div className="vehicles__table">
          <ReactTable
            data={vehicles}
            columns={columns}
            minRows="0"
            showPagination={false}
          />
        </div>
        <div></div>
      </div>
    );
  }
}

export default Vehicles;
