import React, { Component } from 'react';
import './settings.css';
import Api from '../../api';
import Navigation from '../../components/Navigation/Navigation';

class Settings extends Component {
  state = {
    defaultRate: 0,
    emissions: [
      {
        name: 'Euro1',
        defaultRate: 0.2
      },
      {
        name: 'Euro2',
        defaultRate: 0.2
      },
      {
        name: 'Euro3',
        defaultRate: 0.3
      },
      {
        name: 'Euro4',
        defaultRate: 0.3
      },
      {
        name: 'Euro5',
        defaultRate: 0.4
      },
      {
        name: 'Euro6',
        defaultRate: 0.4
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
    const { emissions } = this.state;

    console.log(emissions);
    Api.emissions.addEmissions(emissions);
  };

  onSaveDefaultRate = () => {
    const { defaultRate } = this.state;

    Api.defaultRate.add(defaultRate);
  };

  onEmissionChange = (e, index) => {
    const { value } = e.target;

    this.setState(state => {
      const { emissions } = state;

      emissions[index].defaultRate = value;

      return ({ emissions });
    });
  };

  onDefaultRateChange = (e) => {
    const { target } = e;
    this.setState({ defaultRate: target.value });
  };

  render() {
    const { defaultRate } = this.state;

    return (
      <div>
        <Navigation heading="Traxit Trackers"
                    onLogout={this.props.onLogout}/>

        <div className="settings">
          <div className="settings__emissions">
            <h2>Emission Category</h2>
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

          <div className="settings__rate">
            <h2>Global England rate</h2>
            <label>England Rate</label>
            <input type="text" value={defaultRate.rate} onChange={this.onDefaultRateChange}/>
            <button onClick={this.onSaveDefaultRate} className="settings__rate__btn btn blue">
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
