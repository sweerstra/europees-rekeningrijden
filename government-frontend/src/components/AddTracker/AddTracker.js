import React, { Component } from 'react';
import './AddTracker.css';

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

    this.state = { tracker: {} };
  }

  render() {
    const { tracker } = this.state;
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

        <section className="horizontal">
          <div className="add-tracker__owners">
            <input type="text" placeholder="Search Owner..."/>
            <ul>
              <li>H. Thompson</li>
              <li>D. Jackson</li>
              <li>H. Thompson</li>
              <li>D. Jackson</li>
              <li>H. Thompson</li>
              <li>D. Jackson</li>
            </ul>
          </div>

          <div className="add-tracker__owner">
            <label>
              Name
              <input type="text" className="read-only"
                     readOnly="true" value={"H. Thompson"}/>
            </label>

            <label>
              Address
              <input type="text" className="read-only"
                     readOnly="true" value={"Straatnaam 15, Goirle"}/>
            </label>

            <label>
              Birthdate
              <input type="text" className="read-only"
                     readOnly="true" value={"1980-01-01"}/>
            </label>
          </div>
        </section>

        <section className="add-tracker__save">
          <button className="btn"
                  disabled={saveButtonIsDisabled}>Save
          </button>
        </section>
      </form>
    );
  }
}

export default AddTracker;
