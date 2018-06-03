import React, { Component } from 'react';
import './TrackerModal.css';
import OwnersSelect from '../OwnersSelect/OwnersSelect';
import Api from '../../api';
import { debounce } from '../../utils/debounce';

class TrackerModal extends Component {
  constructor(props) {
    super(props);

    const trackerToEdit = this.props.trackerToEdit || {};

    this.state = {
      id: trackerToEdit.id || 0,
      trackerId: trackerToEdit.trackerId || '',
      owner: {citizenServiceNumber: null},
      vehicle: { emissionCategory: null },
      ownerNotFound: true
    };
  }

  componentDidMount() {
    this.licensePlateCallback = debounce(e => {
      const { value } = e.target;
      Api.vehicle.getByLicensePlate(value)
        .then(vehicle => this.setState({ vehicle }))
        .catch(() => this.setState({ vehicle: { emissionCategory: null } }));
    }, 600);


    this.bsnCallBack = debounce(e => {
      const { value } = e.target;
      Api.owner.getBycitizenServiceNumber(value)
        .then(owner => this.setState({ owner, ownernotfound: false }))
        .catch(() => this.setState({ owner: { citizenServiceNumber: null, ownerNotFound:true } }));
    }, 600);

  }

  onBSNChange = (e) => {
    e.persist();
    this.bsnCallBack(e);
  };

  onTrackerIdChange = (e) => {
    this.setState({ trackerId: e.target.value });
  };

  onLicenseChange = (e) => {
    e.persist();
    this.licensePlateCallback(e);
  };

  onSave = () => {
    const { id, trackerId, owner, vehicle } = this.state;
    this.props.onSave({ id, trackerId, owner, vehicle });
  };

  render() {
    const { owners, owner, ownerNotFound,trackerId, vehicle: { emissionCategory } } = this.state;

    return (
      <div className="tracker-modal">
        <label>
          Tracker ID
          <input type="text"
                 className="tracker-modal__tracker-id-input"
                 value={trackerId}
                 onChange={this.onTrackerIdChange}
                 name="trackerId"
                 placeholder="Enter ID here"
                 disabled={this.props.isEditing}/>
        </label>

        <section className="horizontal">
          <label>
            Citizen Service Number
            <input type="text"
                   className={ownerNotFound ? 'red' : 'green'}
                   onChange={this.onBSNChange}
                   name="BSN" placeholder="Enter BSN here"/>
          </label>
          <label>
            License Plate
            <input type="text"
                   onChange={this.onLicenseChange}
                   name="licensePlate" placeholder="Enter Plate here"/>
          </label>

          <label>
            Emission Category
            <div className={emissionCategory ? 'read-only--found' : 'read-only--not-found'}>
              {emissionCategory || 'Not Found'}
            </div>
          </label>
        </section>

        <label>
          Owner
        </label>

        <section className="horizontal">
          <OwnersSelect owners={owners} onSelect={owner => this.setState({ owner })}/>

          {owner && <div className="tracker-modal__owner">
            <label>
              Name
              <div className="read-only">{`${owner.firstName} ${owner.lastName}`}</div>
            </label>

            <label>
              Address
              <div className="read-only">{owner.address}</div>
            </label>

            <label>
              Birthdate
              <div
                className="read-only">{new Date(owner.dateOfBirth).toLocaleDateString()}</div>
            </label>
          </div>}
        </section>

        <section className="tracker-modal__save">
          <button className="btn green"
                  onClick={this.onSave}
                  disabled={!trackerId}>Save
          </button>
        </section>
      </div>
    );
  }
}

export default TrackerModal;
