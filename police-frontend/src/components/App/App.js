import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from '../../pages/login/login';
import StolenVehicle from '../../pages/stolen-car/stolen-vehicle';

class App extends Component {
    state = {
        isAuthenticated: false
    };

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/login" render={() =>
                        this.state.isAuthenticated
                            ? <StolenVehicle/>
                            : <Login onAuthenticate={this.onAuthenticate}/>
                    }/>
                    <Route path="/stolencar" component={StolenVehicle}/>
                    <Redirect to="/login"/>
                </Switch>

            </div>
        );
    }

    onAuthenticate = (token) => {
        this.setState({isAuthenticated: true});
    };
}

export default App;
