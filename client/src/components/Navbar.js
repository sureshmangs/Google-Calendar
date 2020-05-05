import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import * as actions from '../actions/authAction';

export class Navbar extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    async logout(res) {
        this.props.signOut();
    }

    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <Link className="navbar-brand" to='/'>GOOGLE CALENDAR</Link>

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>


                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav ml-auto mr-3 mt-1 mb-1">
                            {/*  User is not Authenticatrd */}
                            {!this.props.isAuth ?
                                [<li className="nav-item" key={1}>
                                    <Link className="nav-link" to='/signup'>Sign Up</Link>
                                </li>] : null}
                            {this.props.isAuth ?
                                <GoogleLogout
                                    clientId="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                                    buttonText="Logout"
                                    onLogoutSuccess={this.logout}
                                >
                                </GoogleLogout> : null}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, actions)(Navbar);
