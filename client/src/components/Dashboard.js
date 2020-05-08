import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick


// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import * as actions from '../actions/authAction';

class Dashboard extends Component {



    async handleEvents() {
        const token = localStorage.getItem('GTOKEN');
        try {
            if (token) {
                await axios.post('/users/calendar', {
                    access_token: token
                })
                    .then(result => this.props.getEvents(result.data))
                    .catch(err => console.log('error is ', err))
            } else {
                // console.log('access token not set')
            }

        } catch (err) {
            //console.log('error is ', err);
        }
    }

    componentDidMount() {
        this.handleEvents();
    }

    calendarComponentRef = React.createRef();

    state = {
        calendarWeekends: true
    };

    EventDetail = ({ event, el }) => {
        // extendedProps is used to access additional event properties.
        const content = (
            <div>
                <i className="fa fa-space-shuttle"></i> {event.title}
                <div><i className="fa fa-map-marker"></i> {event.extendedProps.location}</div>
            </div>
        );
        ReactDOM.render(content, el);
        return el;
    };


    toggleWeekends = () => {
        this.setState({
            // update a property
            calendarWeekends: !this.state.calendarWeekends
        });
    };

    // gotoPast = () => {
    //     let calendarApi = this.calendarComponentRef.current.getApi();
    //     calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
    // };

    // handleDateClick = arg => {
    //     if (window.confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
    //         this.setState({
    //             // add new event data
    //             calendarEvents: this.state.calendarEvents.concat({
    //                 // creates a new array
    //                 title: "New Event",
    //                 start: arg.date,
    //                 allDay: arg.allDay
    //             })
    //         });
    //     }
    // };


    render() {
        return (
            <div className="demo-app container mt-5 mb-5">
                <div className="demo-app-calendar">
                    <FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        ref={this.calendarComponentRef}
                        weekends={this.state.calendarWeekends}
                        events={this.props.events}
                        eventRender={this.EventDetail}
                        dateClick={this.handleDateClick}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.dash.events,
        errorMessage: state.auth.errorMessage,
        accessTokenG: state.auth.accessTokenG
    }
}

export default connect(mapStateToProps, actions)(Dashboard)