import React, { Component } from 'react';
import './AddTracker.css';
import OwnersSelect from '../OwnersSelect/OwnersSelect';
import Api from '../../api';
import { debounce } from '../../utils/debounce';

class AddTracker extends Component {
  onFormChange = (e) => {
    const { name, value } = e.target;

    this.setState(state => ({ tracker: { ...state.tracker, [name]: value } }));
  };

  constructor(props) {
    super(props);

    this.state = {
      tracker: {},
      owners: [],
      selectedOwner: null,
      emissionCategory: ''
    };
  }

  componentDidMount() {
    Api.owner.getAll().then(owners => this.setState({ owners }));

    this.licensePlateCallback = debounce(e => {
      const { value } = e.target;
      Api.vehicle.getByLicensePlate(value)
        .then(({ emissionCategory }) => this.setState({ emissionCategory }))
        .catch(err => this.setState({ emissionCategory: 'No found' }))
    }, 600);
  }

  onLicenseChange = (e) => {
    e.persist();
    this.licensePlateCallback(e);
  };

  render() {
    const { tracker, owners, selectedOwner, emissionCategory } = this.state;
    const saveButtonIsDisabled = !tracker.trackerId || !tracker.licensePlate;
    const { onAddTracker } = this.props;

    return (
      <form className="add-tracker" onSubmit={onAddTracker}>
        <label>
          Tracker ID
          <input type="text"
                 className="add-tracker__tracker-id-input"
                 onChange={this.onFormChange}
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
            <input type="text" className="read-only"
                   readOnly="true" value={emissionCategory}/>
          </label>
        </section>

        <label>
          Owner
        </label>

        <section className="horizontal">
          <OwnersSelect owners={owners} onSelect={selectedOwner => this.setState({ selectedOwner })}/>

          {selectedOwner && <div className="add-tracker__owner">
            <label>
              Name
              <input type="text" className="read-only"
                     readOnly="true" value={`${selectedOwner.firstName} ${selectedOwner.lastName}`}/>
            </label>

            <label>
              Address
              <input type="text" className="read-only"
                     readOnly="true" value={selectedOwner.address}/>
            </label>

            <label>
              Birthdate
              <input type="text" className="read-only"
                     readOnly="true" value={new Date(selectedOwner.dateOfBirth).toLocaleDateString()}/>
            </label>
          </div>}
        </section>

        <section className="add-tracker__save">
          <button className="btn green"
                  disabled={saveButtonIsDisabled}>Save
          </button>
        </section>
      </form>
    );
  }
}

export default AddTracker;
