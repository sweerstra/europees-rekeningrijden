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

    const { vehicles, selectedVehicle } = this.state;

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
        <div></div>
      </div>
    );
  }
}

export default Vehicles;
