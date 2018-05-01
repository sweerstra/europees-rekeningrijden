import React, { Component } from 'react';
import './settings.css';
import Api from '../../api';

class Settings extends Component {
  state = {
    emissions: [
      {
        name: 'Euro1',
        rate: 0.2
      },
      {
        name: 'Euro2',
        rate: 0.2
      },
      {
        name: 'Euro3',
        rate: 0.3
      },
      {
        name: 'Euro4',
        rate: 0.3
      },
      {
        name: 'Euro5',
        rate: 0.4
      },
      {
        name: 'Euro6',
        rate: 0.4
      }
    ]
  };

  componentDidMount() {
    Api.emissions.getEmissions()
      .then(emissions => {
        if (emissions.length > 0) {
          this.setState({ emissions });
        }
      });
  }

  onSave = (e) => {
    // TODO: save emissions
    const { emissions } = this.state;

    console.log(emissions);
    Api.emissions.addEmissions(emissions);
  };

  onEmissionChange = (e, index) => {
    const { value } = e.target;

    this.setState(state => {
      const { emissions } = state;

      emissions[index].rate = value;

      return ({ emissions });
    });
  };

  render() {
    return (
      <div className="settings">
        <h1>Emission Category</h1>
        <div className="settings__emissions">
          {this.state.emissions.map(({ name, rate }, index) =>
            <label className="settings__emission">
              {name}
              <input type="text" value={rate} onChange={e => this.onEmissionChange(e, index)}/>
            </label>
          )}
          <button onClick={this.onSave} className="settings__emission__btn btn green">
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default Settings;
