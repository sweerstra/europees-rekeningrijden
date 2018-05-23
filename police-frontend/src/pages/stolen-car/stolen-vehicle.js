import React, {Component} from 'react';
import './stolen-vehicle.css';
import Api from '../../api';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Map from '../../components/Map/Map';
import Modal from '../../components/Modal/Modal'
import Navigation from "../../components/Navigation/Navigation";

class StolenVehicle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stolenVehicles: [],
            selectedRow: null,
            isModalOpen: false
        };
    }

    componentDidMount() {
        // Api.stolenCar.getAll()
        //     .then(stolenVehicles => this.setState({stolenVehicles}));
    }

    onAddStolencar = (stolencar) => {
        Api.ownership.add(stolencar);
    };

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    };

    // trackStolenVehicle() {
    //     Api.vehicle.getLatestMovement(this.state.selectedRow)
    //         .then(vehicle => this.setState({ vehicle }))
    // }


    render() {
        const columns = [
            {
                Header: 'Tracker ID',
                accessor: 'trackerId',
            },
            {
                Header: 'License Plate',
                accessor: 'licensePlate'
            },
            {
                Header: 'Reported',
                accessor: 'dateOfTheft'
            }
        ];

        const {stolenVehicles, selectedRow, isModalOpen} = this.state;

        return (
            <div>
                <div className={`stolen-vehicles ${isModalOpen ? 'modal-overlay' : ''}`}>
                    <Navigation heading="Police Stolen Cars"/>
                    <div className="stolen-vehicles__table">
                        <ReactTable
                            data={stolenVehicles}
                            columns={columns}
                            getTrProps={(state, rowInfo) => {
                                const isSelected = rowInfo && rowInfo.original.trackerId === selectedRow;

                                return {
                                    onClick: () => {
                                        const {trackerId} = rowInfo.original;
                                        this.setState({selectedRow: trackerId});
                                        // this.trackStolenVehicle();
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
                            <button className="btn green" onClick={this.toggleModal}>Report stolen car</button>
                        </div>
                    </div>
                    <Map/>
                </div>

                <Modal isOpen={isModalOpen}
                       onModalClose={this.toggleModal}>
                    <h1>Report stolen Vehicle</h1>
                    <label>
                        Tracker identification number
                        <input type="text" name="name"/>
                    </label>
                    <label>
                        Licenseplate
                        <input type="text" name="name"/>
                    </label>
                    <label>
                        Date of theft
                        <input type="date" name="name"/>
                    </label>
                    <button className="btn blue" onClick={this.onAddStolencar}>
                        Report
                    </button>
                </Modal>
            </div>

        );
    }
}

export default StolenVehicle;
