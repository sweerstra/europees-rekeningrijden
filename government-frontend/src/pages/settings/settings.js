import React, { Component } from 'react';
import './settings.css';
import Api from '../../api';
import Navigation from '../../components/Navigation/Navigation';

class Settings extends Component {
  state = {
    rate: {
      rate: 0
    },
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

    Api.rate.getRate()
      .then(defaultRates => {
        if (!defaultRates || defaultRates.length === 0) return;

        const defaultRate = defaultRates[defaultRates.length - 1];
        this.setState({ defaultRate: rate });
      });
  }

  onSave = () => {
    const { emissions } = this.state;

    console.log(emissions);
    Api.emissions.addEmissions(emissions);
  };

  onSaveDefaultRate = () => {
    const { rate } = this.state.rate;

    if (rate) {
      Api.rate.add(parseFloat(rate));
    }
  };

  onEmissionChange = (e, index) => {
    const { value } = e.target;

    this.setState(state => {
      const { emissions } = state;

      emissions[index].rate = parseFloat(value);

      return ({ emissions });
    });
  };

  onDefaultRateChange = (e) => {
    const { target } = e;
    this.setState({ rate: target.value });
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
              <label className="settings__emission" key={index}>
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
