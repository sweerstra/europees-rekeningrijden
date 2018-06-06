import React, { Component } from 'react';
import './stolen-vehicle.css';
import Api from '../../api';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Map from '../../components/Map/Map';
import Modal from '../../components/Modal/Modal'
import Navigation from "../../components/Navigation/Navigation";
import { debounce } from '../../utils/debounce';

class StolenVehicle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stolenVehicles: [],
            selectedRow: null,
            isModalOpen: false,
            stolenVehicle: { trackerId: '', licencePlate: '', dateString: '' },
            trackerId: '',
            trackerNotFound: true,
            movement: {
                id: 0
            }
        };
    }

    componentDidMount() {
        Api.stolenCar.getAll()
            .then(stolenVehicles => this.setState({ stolenVehicles }));

        this.licensePlateCallback = debounce(e => {
            const { value } = e.target;
            Api.vehicle.getTrackerbyLicensePlate(value)
                .then(tracker => this.setState({ trackerId: tracker.trackerId, trackerNotFound: false }))
                .catch(() => this.setState({ trackerNotFound: true }));
        }, 600);
    }

    onLicenseChange = (e) => {
        e.persist();
        this.onStolenVehicleChange(e);
        this.licensePlateCallback(e);
    };

    onAddStolenVehicle = () => {
        const { stolenVehicle, trackerId } = this.state;
        const { dateString } = stolenVehicle;

        stolenVehicle.dateString = new Date(dateString).toLocaleString();
        stolenVehicle.trackerId = trackerId;

        console.log(stolenVehicle);

        Api.stolenCar.add(stolenVehicle)
            .then(addedStolenVehicle => this.setState(state => ({
                stolenVehicles: [...state.stolenVehicles, addedStolenVehicle],
                isModalOpen: false
            })));
    };

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    };

    trackStolenVehicle = (trackerId) => {
        Api.vehicle.getLatestMovement(trackerId)
            .then(movement => {
                console.log(movement);
                this.setState({ movement });
            });
    };

    onStolenVehicleChange = (e) => {
        const { name, value } = e.target;
        this.setState(state => ({
            stolenVehicle: {
                ...state.stolenVehicle,
                [name]: value
            }
        }));
    };

    render() {
        const columns = [
            {
                Header: 'Tracker ID',
                accessor: 'trackerId',
            },
            {
                Header: 'License Plate',
                accessor: 'licencePlate'
            },
            {
                Header: 'Reported',
                accessor: 'dateString'
            }
        ];

        const { stolenVehicles, selectedRow, isModalOpen, stolenVehicle, trackerId, trackerNotFound, movement } = this.state;

        return (
            <div>
                <div className={`stolen-vehicles ${isModalOpen ? 'modal-overlay' : ''}`}>
                    <Navigation heading="Traxit Police"/>
                    <div className="stolen-vehicles__table">
                        <h2>Stolen Cars</h2>
                        <ReactTable
                            data={stolenVehicles}
                            columns={columns}
                            getTrProps={(state, rowInfo) => {
                                const isSelected = rowInfo && rowInfo.original.trackerId === selectedRow;

                                return {
                                    onClick: () => {
                                        const { trackerId } = rowInfo.original;
                                        this.setState({ selectedRow: trackerId });
                                        this.trackStolenVehicle(trackerId);
                                    },
                                    style: {
                                        color: isSelected ? 'white' : 'black',
                                        backgroundColor: isSelected ? '#3F51B5' : 'white'
                                    }
                                }
                            }}
                            minRows="5"
                            showPagination={false}
                        />
                        <div className="stolen-vehicles__navigation__buttons">
                            <button className="btn blue" onClick={this.toggleModal}>Report Stolen Vehicle</button>
                        </div>
                    </div>
                    <Map movement={movement}/>
                </div>

                <Modal isOpen={isModalOpen}
                       onModalClose={this.toggleModal}
                       className="stolen-vehicles__add-modal">
                    <h1>Report Stolen Vehicle</h1>
                    <label>
                        License Plate
                        <input type="text" name="licencePlate"
                               className={trackerNotFound ? 'red' : 'green'}
                               onChange={this.onLicenseChange}
                               value={stolenVehicle.licensePlate}
                               placeholder="License Plate"
                        />
                    </label>
                    <label>
                        Tracker ID
                        <input type="text" name="trackerId" value={trackerId} placeholder="Tracker ID"/>
                    </label>
                    <label>
                        Date of Theft
                        <input type="datetime-local" name="dateString"
                               onChange={this.onStolenVehicleChange}
                               value={stolenVehicle.dateString}/>
                    </label>
                    <button className="btn blue" onClick={this.onAddStolenVehicle}>
                        Report
                    </button>
                </Modal>
            </div>
        );
    }
}

export default StolenVehicle;
