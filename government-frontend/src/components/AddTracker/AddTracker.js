import React, { Component } from 'react';
import './AddTracker.css';
import OwnersSelect from '../OwnersSelect/OwnersSelect';
import Api from '../../api';
import { debounce } from '../../utils/debounce';

class AddTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackerId: '',
      owners: [],
      owner: null,
      vehicle: { emissionCategory: null }
    };
  }

  componentDidMount() {
    Api.owner.getAll().then(owners => this.setState({ owners }));

    this.licensePlateCallback = debounce(e => {
      const { value } = e.target;
      Api.vehicle.getByLicensePlate(value)
        .then(vehicle => this.setState({ vehicle }))
        .catch(() => this.setState({ vehicle: { emissionCategory: null } }));
    }, 600);
  }

  onTrackerIdChange = (e) => {
    this.setState({ trackerId: e.target.value });
  };

  onLicenseChange = (e) => {
    e.persist();
    this.licensePlateCallback(e);
  };

  onSave = () => {
    const { owner } = this.state;
    const { vehicle } = this.state;
    vehicle.trackerId = this.state.trackerId;
    this.props.onAdd({ owner, vehicle });
  };

  render() {
    const { owners, owner, trackerId, vehicle: { emissionCategory } } = this.state;
    const saveButtonIsDisabled = !trackerId || !emissionCategory || !owner;

    return (
      <div className="add-tracker">
        <label>
          Tracker ID
          <input type="text"
                 className="add-tracker__tracker-id-input"
                 onChange={this.onTrackerIdChange}
                 name="trackerId"
                 placeholder="Enter ID here"/>
        </label>

        <section className="horizontal">
          <label>
            License Plate
            <input type="text"
                   onChange={this.onLicenseChange}
                   name="licensePlate" placeholder="Enter Plate here"/>
          </label>

          <label>
            Emission Category
            <div className={`read-only ${emissionCategory ? '' : 'not-found'}`}>
              {emissionCategory || 'Not Found'}
            </div>
          </label>
        </section>

        <label>
          Owner
        </label>

        <section className="horizontal">
          <OwnersSelect owners={owners} onSelect={owner => this.setState({ owner })}/>

          {owner && <div className="add-tracker__owner">
            <label>
              Name
              <input type="text" className="read-only"
                     readOnly="true" value={`${owner.firstName} ${owner.lastName}`}/>
            </label>

            <label>
              Address
              <input type="text" className="read-only"
                     readOnly="true" value={owner.address}/>
            </label>

            <label>
              Birthdate
              <input type="text" className="read-only"
                     readOnly="true" value={new Date(owner.dateOfBirth).toLocaleDateString()}/>
            </label>
          </div>}
        </section>

        <section className="add-tracker__save">
          <button className="btn green"
                  onClick={this.onSave}
                  disabled={saveButtonIsDisabled}>Save
          </button>
        </section>
      </div>
    );
  }
}

export default AddTracker;
