import React, { Component } from 'react';
import './region.css';
import { RemoveIcon } from '../../images';
import Map from '../../components/Map/Map';
import ReactTable from 'react-table';
import Api from '../../api';

class Region extends Component {
  onCreateRegion = () => {
    const region = {
      name: 'Brighton',
      defaultRate: parseFloat(this.state.defaultRate),
      regionTimes: this.state.regionTimes
    };

    Api.region.addRegion(region)
      .then(createdRegion => {
        this.setState(state => ({ regions: [...state.regions, createdRegion] }));
        console.log('Region created', createdRegion);
      });
  };

  onEditRegion = () => {
    const { selectedRegion, defaultRate, regionTimes } = this.state;

    const region = { defaultRate: parseFloat(defaultRate), regionTimes };

    console.log(selectedRegion.id, region);

    Api.region.editRegion(selectedRegion.id, region);
  };

  onSelectRegion = (selectedRegion) => {
    this.setState({ selectedRegion });

    Api.region.getByName(selectedRegion.name)
      .then(({ defaultRate, regionTimes }) => this.setState({ defaultRate, defaultRateValid: true, regionTimes }));
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
      defaultRate: value,
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
      regions: [],
      regionTimes: [],
      selectedRegion: null
    };
  }

  componentDidMount() {
    Api.region.getAll()
      .then(regions => this.setState({ regions }));
  }

  render() {
    const { selectedRegion, defaultRate, defaultRateValid, regions, regionTimes } = this.state;

    const columns = [
      {
        Header: 'Location',
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
                onClick: () => this.onSelectRegion(rowInfo.original),
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
            <input type="text" name="defaultRate" value={defaultRate}
                   onChange={this.onDefaultRateChange} placeholder="&#163; 0.00"/>
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
            <button className="btn" onClick={this.onAddRegionRow}>Add Timeslot</button>
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
