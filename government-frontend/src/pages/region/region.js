import React, { Component } from 'react';
import './region.css';
import { RemoveIcon } from '../../images';
import Map from '../../components/Map/Map';
import ReactTable from 'react-table';
import Api from '../../api';

class Region extends Component {
  onCreateRegion = () => {
    const region = {
      name: this.state.name,
      defaultRate: parseFloat(this.state.defaultRate),
      regionTimes: this.state.regionTimes,
      coordinates: this.state.coordinates
    };

    Api.region.addRegion(region)
      .then(createdRegion => this.setState(state => ({ regions: [...state.regions, createdRegion] })));
  };

  onEditRegion = () => {
    const { selectedRegion, name, defaultRate, regionTimes, coordinates } = this.state;
    const region = { name, defaultRate: parseFloat(defaultRate), regionTimes, coordinates };

    Api.region.editRegion(selectedRegion.id, region);
  };

  onSelectRegion = (selectedRegion) => {
    Api.region.getByName(selectedRegion.name)
      .then(({ name, defaultRate, regionTimes, coordinates }) =>
        this.setState({
          selectedRegion,
          name,
          defaultRate,
          regionTimes,
          coordinates,
          isValid: true
        }));
  };

  onAddRegionRow = () => {
    this.setState(state => ({
      regionTimes: [...state.regionTimes, { startTime: '', endTime: '', rate: 0 }],
      isValid: false
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
      isValid: !isNaN(value)
    });
  };

  onLocationNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  onRegionTimeChange = ({ name, value }, index) => {
    let isValidTime = true;

    if (name === 'startTime' || name === 'endTime') {
      // @https://stackoverflow.com/questions/7536755/regular-expression-for-matching-hhmm-time-format
      const pattern = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
      if (!pattern.test(value)) {
        isValidTime = false;
      }
    }

    this.setState(state => {
      const regionTimes = state.regionTimes;
      regionTimes[index][name] = value;

      const currentRegionTime = regionTimes[index];
      // validate if the region times are filled in
      const hasValidProps = Object.keys(currentRegionTime).every(key => currentRegionTime[key]);
      return ({ regionTimes, isValid: isValidTime && hasValidProps });
    });
  };

  onSelectPolygon = (coordinates) => {
    this.setState({ coordinates });
  };

  constructor(props) {
    super(props);

    this.state = {
      regions: [],
      regionTimes: [],
      coordinates: [],
      selectedRegion: null,
    };
  }

  componentDidMount() {
    Api.region.getAll()
      .then(regions => this.setState({ regions }));
  }

  render() {
    const { selectedRegion, name, defaultRate, isValid, regionTimes, coordinates } = this.state;

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
        <Map
          onSelectPolygon={this.onSelectPolygon}
          coordinates={coordinates}/>
        <div className="region__info__table">
          <ReactTable
            data={this.state.regions}
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
          <div className="region__time__location-name">
            <span>Location</span>
            <input type="text" value={name}
                   onChange={this.onLocationNameChange}/>
          </div>
          <div className="region__time__price--default">
            <span>Default Rate</span>
            <input type="text" value={defaultRate}
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
              <input type="time" name="startTime" value={startTime} placeholder="00:00"
                     onChange={({ target }) => this.onRegionTimeChange(target, index)}/>
              <input type="time" name="endTime" value={endTime} placeholder="00:00"
                     onChange={({ target }) => this.onRegionTimeChange(target, index)}/>
              <input type="type" name="rate" value={rate} placeholder="&#163; 0.00"
                     onChange={({ target }) => this.onRegionTimeChange(target, index)}/>
              <RemoveIcon onClick={() => this.onRemoveRegionRow(index)}/>
            </div>
          )}
          <div className="region__add-row">
            <button className="btn" onClick={this.onAddRegionRow}>Add Timeslot</button>
          </div>

          <div className="region__actions">
            <button className="add-time-region-button btn green"
                    onClick={this.onCreateRegion}
                    disabled={!name || !defaultRate || !isValid || !coordinates.length}>Create
            </button>
            <button className="save-time-region-button btn green"
                    onClick={this.onEditRegion}
                    disabled={!selectedRegion || !name || !defaultRate || !isValid}>Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Region;
