import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from '../../pages/login/login';
import StolenCar from '../../pages/stolen-car/stolen-car';

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
                            ? <StolenCar/>
                            : <Login onAuthenticate={this.onAuthenticate}/>
                    }/>
                    <Route path="/stolencar" component={StolenCar}/>
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
