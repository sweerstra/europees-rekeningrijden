import React, { Component } from 'react';
import './region.css';
import { RemoveIcon } from '../../images';
import Map from '../../components/Map/Map';
import ReactTable from 'react-table';

class Region extends Component {
  onCreateRegion = () => {
    // Api.region.addRegion(region);

    const region = {
      name: 'Brighton',
      defaultRate: this.state.defaultRate,
      regionTimes: this.state.regionTimes
    };

    console.log('Region to add', region);
  };

  onEditRegion = () => {

  };

  onAddRegionRow = () => {
    this.setState(state => ({
      regionTimes: [...state.regionTimes, { startTime: '', endTime: '', rate: 0 }]
    }));
  };

  onRemoveRegionRow = (index) => {
    const { regionTimes } = this.state;
    regionTimes.splice(index, 1);
    this.setState({ regionTimes });
  };

  onDefaultRateChange = ({ target }) => {
    const { value } = target;

    this.setState({
      defaultRate: parseFloat(value),
      defaultRateValid: !isNaN(value)
    });
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
      ],
      selectedRegion: null
    };
  }

  render() {
    const { selectedRegion, defaultRate, defaultRateValid, regions, regionTimes } = this.state;

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
            getTrProps={(state, rowInfo) => {
              const isSelected = rowInfo && selectedRegion && rowInfo.original.id === selectedRegion.id;
              return {
                onClick: () => this.setState({ selectedRegion: rowInfo.original }),
                style: {
                  color: isSelected ? 'white' : 'black',
                  backgroundColor: isSelected ? '#3F51B5' : 'white'
                }
              }
            }}
            minRows="5"
            showPagination={false}
          />
        </div>
        <div className="region__info__prices">
          <div className="region__time__price--default">
            <span>Default Rate</span>
            <input type="text" name="defaultRate" onChange={this.onDefaultRateChange} placeholder="&#163; 0.00"/>
          </div>
          <div className="region__time__price__headers">
            <span>Start Time</span>
            <span>End Time</span>
            <span>Rate</span>
            {regionTimes.length > 0 && <span style={{ justifySelf: 'flex-end' }}>Remove Rate</span>}
          </div>
          {regionTimes.map(({ startTime, endTime, rate }, index) =>
            <div className="region__time__price" key={index}>
              <input type="text" name="startTime" value={startTime} placeholder="00:00"
                     onChange={({ target }) => this.onEditRegionTime(target, index)}/>
              <input type="text" name="endTime" value={endTime} placeholder="00:00"
                     onChange={({ target }) => this.onEditRegionTime(target, index)}/>
              <input type="text" name="rate" value={rate} placeholder="&#163; 0.00"
                     onChange={({ target }) => this.onEditRegionTime(target, index)}/>
              <RemoveIcon onClick={() => this.onRemoveRegionRow(index)}/>
            </div>
          )}
          <div className="region__add-row">
            <button className="btn" onClick={this.onAddRegionRow}>Add Row</button>
          </div>

          <div className="region__actions">
            <button className="add-time-region-button btn green"
                    onClick={this.onCreateRegion}
                    disabled={!defaultRate || !defaultRateValid}>Create
            </button>
            <button className="save-time-region-button btn green"
                    onClick={this.onEditRegion}
                    disabled={!selectedRegion || !defaultRate || !defaultRateValid}>Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Region;
