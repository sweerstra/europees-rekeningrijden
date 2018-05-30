import React, { Component } from 'react';
import ReactTable from 'react-table';
import './vehicles.css';
import Api from '../../api';
import Navigation from '../../components/Navigation/Navigation';
import { ShareIcon } from '../../icons';
import Modal from '../../components/Modal/Modal';
import { ClipboardIcon } from '../../icons/index';
import { textToClipboard } from '../../utils/text-to-clipboard';

class Vehicles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: [],
      selectedVehicle: {},
      email: 'user@mail.com',
      firstName: 'First',
      lastName: 'Last',
      isModalOpen: false,
      generatedCode: '',
      isVerifiedSignOverDetails: null,
      isWrongPassword: false,
      isCodeCopied: false
    };
  }

  componentDidMount() {
    Api.vehicle.getCurrentTrackersWithVehicleByOwner(1)
      .then(vehicles => {
        this.setState({ vehicles: vehicles.map(({ trackerId, vehicle }) => ({ trackerId, ...vehicle })) });
      });
  }

  render() {
    const columns = [
      {
        Header: 'License Plate',
        accessor: 'licensePlate'
      },
      {
        Header: 'Emission Category',
        accessor: 'emissionCategory'
      },
      {
        Header: 'Tracker ID',
        accessor: 'trackerId'
      },
      {
        Header: 'Sign Over Vehicle',
        id: 'signOver',
        accessor: d => <ShareIcon/>
      }
    ];

    const {
      vehicles, selectedVehicle,
      email, firstName, lastName,
      isVerifiedSignOverDetails,
      password, isWrongPassword,
      isModalOpen, generatedCode, isCodeCopied
    } = this.state;

    const isEmptySignOverDetails = !email || !firstName || !lastName;

    return (
      <div>
        <div className={`vehicles ${isModalOpen ? 'modal-overlay' : ''}`}>
          <Navigation heading="Traxit Driver Vehicles"/>
          <div className="vehicles__table">
            <div className="vehicles__table__sign-over-link">
              <a href="/vehicles/sign-over" className="btn blue">Enter Sign Over Token</a>
            </div>
            <ReactTable
              data={vehicles}
              getTrProps={(state, rowInfo) => {
                const id = rowInfo ? rowInfo.original.id : null;
                const isSelected = id === selectedVehicle.id;

                return {
                  onClick: () => {
                    if (id) {
                      this.setState({ selectedVehicle: rowInfo.original });
                    }
                  },
                  className: isSelected ? 'active' : '',
                  style: {
                    color: isSelected ? 'white' : 'black',
                    backgroundColor: isSelected ? '#3F51B5' : 'white'
                  }
                }
              }}
              columns={columns}
              minRows="0"
              showPagination={false}
            />
          </div>
          {selectedVehicle.id && <div className="vehicles__sign-over">
            <fieldset disabled={isVerifiedSignOverDetails}>
              <h2>Vehicle Receiver Details</h2>

              <section>
                <label>
                  Email address
                  <input type="email"
                         value={email}
                         onChange={this.onSignOverChange}
                         required
                         name="email" placeholder="Email"/>
                </label>
              </section>
              <section className="vehicles__sign-over__user-details">
                <label>
                  Name
                  <input type="text"
                         value={firstName}
                         onChange={this.onSignOverChange}
                         required
                         name="firstName" placeholder="First name"/>
                </label>
                <label>
                  &nbsp;
                  <input type="text"
                         value={lastName}
                         onChange={this.onSignOverChange}
                         required
                         name="lastName" placeholder="Last name"/>
                </label>
              </section>
              <button className={`btn ${isVerifiedSignOverDetails === false ? 'red' : 'blue'}`}
                      disabled={isEmptySignOverDetails}
                      onClick={this.onVerifyUserDetails}>Verify Receiver
              </button>
            </fieldset>

            <fieldset disabled={!isVerifiedSignOverDetails}>
              <section>
                <label>
                  Confirm Your Password
                  <input type="password"
                         className={isWrongPassword ? 'red' : ''}
                         onChange={this.onSignOverChange}
                         required
                         name="password" placeholder="Password"/>
                </label>
              </section>
              {isVerifiedSignOverDetails && <section className="vehicles__sign-over__warning">
              <span>
                Please make sure this is the vehicle you want to sign over to&nbsp;
                <b>{`${firstName} ${lastName}`}</b>.
              </span>
              </section>}
              <section className="vehicles__sign-over__confirmation">
                <input type="text" className="red" value={selectedVehicle.licensePlate} readOnly="true"/>
                <button className="btn red" disabled={!password}
                        onClick={this.onConfirmSignOver}>Confirm Sign Over
                </button>
              </section>
            </fieldset>
          </div>}
        </div>
        <Modal isOpen={isModalOpen}
               onModalClose={() => this.setState({ isModalOpen: false })}>
          <div className="sign-over__code">
            <h2>Sign Over Code</h2>
            <p>Share this code with <b>{`${firstName} ${lastName}`}</b> to confirm the Sign Over.</p>
            <div className="sign-over__code__input">
              <input type="text"
                     className="blue"
                     value={generatedCode}
                     readOnly="true"/>
              <ClipboardIcon onClick={this.setCodeToCopied}/>
            </div>
            {isCodeCopied && <span className="sign-over__code__input__copied">Copied</span>}
          </div>
        </Modal>
      </div>
    );
  }

  onVerifyUserDetails = () => {
    const { email, firstName, lastName } = this.state;

    Api.user.verifyUserDetails({ email, firstName, lastName })
      .then(isVerifiedSignOverDetails => this.setState({ isVerifiedSignOverDetails: true }))
      .catch(() => this.setState({ isVerifiedSignOverDetails: false }));
  };

  onConfirmSignOver = () => {
    const { selectedVehicle, email: receiverEmail, password } = this.state;
    const senderEmail = localStorage.getItem('user');

    const details = {
      licensePlate: selectedVehicle.licensePlate,
      receiver: { email: receiverEmail },
      sender: { email: senderEmail },
      password
    };

    console.log(details);

    Api.signOver.createRequest(details)
      .then(signOver => this.setState({ isWrongPassword: false, isModalOpen: true, generatedCode: signOver.token }))
      .catch(err => this.setState({ isWrongPassword: true }));
  };

  onSignOverChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  setCodeToCopied = () => {
    textToClipboard(this.state.generatedCode);

    this.setState({ isCodeCopied: true });

    setTimeout(() => {
      this.setState({ isCodeCopied: false });
    }, 3000);
  };
}

export default Vehicles;
