import React, { Component } from 'react';
import './AddTracker.css';
import OwnersSelect from '../OwnersSelect/OwnersSelect';
import Api from '../../api';

class AddTracker extends Component {
  onFormChange = (e) => {
    const { name, value } = e.target;

    if (name === 'licensePlate') {
      if (value.match('^[A-Za-z]{2}-[0-9]{2}-[A-Za-z]{3}$')) {
        this.setState({ errors: ['License Plate is not valid.'] });
        return;
      }
    }

    this.setState(state => ({ tracker: { ...state.tracker, [name]: value } }));
  };

  constructor(props) {
    super(props);

    this.state = { tracker: {}, owners: [], selectedOwner: null };
  }

  componentDidMount() {
    Api.owner.getAll()
      .then(owners => this.setState({ owners }));
  }

  render() {
    const { tracker, owners, selectedOwner } = this.state;
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
                   onChange={this.onFormChange}
                   name="licensePlate" placeholder="Enter Plate here"/>
          </label>

          <label>
            Emission Category
            <input type="text" className="read-only"
                   readOnly="true" value={"Euro-1"}/>
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
