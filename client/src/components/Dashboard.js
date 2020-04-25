import React, { Component } from 'react'
import axios from 'axios';

//import ReactTable from "react-table";
import { connect } from 'react-redux';

import * as actions from '../actions/authAction';

const Cal = props => (
    <div className="col-md-6 col-md-4 mr-auto ml-auto mb-3">
        <div className="card pt-4 pb-4">
            <table className="text-center">
                <thead></thead>
                <tbody>
                    <tr>
                        <td><span className="badge badge-success">Location</span></td>
                        <td><p className="card-text">{props.event.location} </p></td>
                    </tr>
                    <tr>
                        <td><span className="badge badge-primary">Description</span></td>
                        <td><p className="card-text">{props.event.summary}</p></td>
                    </tr>
                    <tr>
                        <td><span className="badge badge-danger">Date</span></td>
                        <td><p className="card-text"> {props.event.date} </p></td>
                    </tr>
                    <tr>
                        <td><span className="badge badge-warning">Time</span> </td>
                        <td> <p className="card-text">{props.event.start} - {props.event.end}</p></td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
)

export class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
        this.handleEvents = this.handleEvents.bind(this);
    }


    async handleEvents() {
        const token = this.props.accessTokenG;
        try {
            if (token) {
                await axios.post('/users/calendar', {
                    access_token: token
                })
                    .then(result => this.props.getEvents(result.data))
                    .catch(err => console.log('error is ', err))
            } else console.log('access token not set')

        } catch (err) {
            console.log('error is ', err);
        }
    }

    componentDidMount() {
        this.handleEvents();
    }

    calanderEvents = () => {
        return this.props.events.map((element, index) => {
            return <Cal event={element} key={index} />
        })
    }


    render() {
        return (
            <div className="pt-5 pb-5" style={{ backgroundColor: "rgba(0, 0, 0, 0.56)" }}>
                <div className="container">
                    <h2 style={homeHead} className="text-center mb-5">Upcoming Events</h2>
                    < div className="row" >
                        {this.calanderEvents()}
                    </div >
                </div>
            </div>
        )
    }
}

const homeHead = {
    color: "rgb(156, 158, 160)",
    fontSize: "50px",
    fontWeight: "800"
}


function mapStateToProps(state) {
    return {
        events: state.dash.events,
        errorMessage: state.auth.errorMessage,
        accessTokenG: state.auth.accessTokenG
    }
}

export default connect(mapStateToProps, actions)(Dashboard)