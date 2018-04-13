import React, { Component } from 'react';
import './region.css';
import { AddIcon, RemoveIcon } from '../../images';
import Map from '../../components/Map/Map';
import ReactTable from 'react-table';

class Region extends Component {
  onSaveRegion = () => {
    // Api.region.addRegion(region);

    const region = {
      name: 'Brighton',
      defaultRate: this.state.defaultRate,
      regionTimes: this.state.regionTimes
    };

    console.log('Region to add', region);
  };

  onAddRegionRow = () => {
    this.setState(state => ({
      regionTimes: [...state.regionTimes, { startTime: '', endTime: '', rate: 0 }]
    }));
  };

  onFieldChange = ({ target }) => {
    this.setState({ [target.name]: parseFloat(target.value) });
  };

  onEditRegionTime = ({ name, value }, index) => {
    this.setState(state => {
      const regionTimes = state.regionTimes;
      regionTimes[index][name] = value;

      return ({ regionTimes });
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      regions: [
        {
          id: 1,
          name: 'Brighton',
          defaultRate: 5.00
        },
        {
          id: 2,
          name: 'Manchester',
          defaultRate: 6.80
        }
      ],
      regionTimes: [
        {
          startTime: '8:00',
          endTime: '12:00',
          rate: 8.50
        },
        {
          startTime: '15:00',
          endTime: '17:00',
          rate: 7.00
        },
        {
          startTime: '20:00',
          endTime: '22:00',
          rate: 5.50
        }
      ]
    };
  }

  render() {
    const { regions, regionTimes } = this.state;

    const columns = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Default Rate',
        accessor: 'defaultRate'
      },
    ];

    return (
      <div className="region-page">
        <Map/>
        <div className="region__info__table">
          <ReactTable
            data={regions}
            columns={columns}
            showPagination={false}
          />
        </div>
        <div className="region__info__prices">
          <div className="region__time__price--default">
            <span>Default Rate</span>
            <input type="text" name="defaultRate" onChange={this.onFieldChange} placeholder="0.00"/>
          </div>
          <div className="region__time__price__headers">
          </div>
          {regionTimes.map(({ startTime, endTime, rate }, index) =>
            <div className="region__time__price" key={index}>
              <input type="text" name="startTime" value={startTime} placeholder="00:00"
                     onChange={({ target }) => this.onEditRegionTime(target, index)}/>
              <input type="text" name="endTime" value={endTime} placeholder="00:00"
                     onChange={({ target }) => this.onEditRegionTime(target, index)}/>
              <input type="text" name="rate" value={rate} placeholder="5.00"
                     onChange={({ target }) => this.onEditRegionTime(target, index)}/>
              <RemoveIcon/>
            </div>
          )}
          <AddIcon onClick={this.onAddRegionRow}/>
        </div>
        <button className="save-time-region-button btn" onClick={this.onSaveRegion}>Save</button>
      </div>
    );
  }
}

export default Region;
