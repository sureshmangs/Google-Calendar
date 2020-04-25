import React, { Component } from 'react';


class HomePage extends Component {
    render() {
        return (
            <div>
                <div className="pb-5">
                    <div className="container-fluid pt-5 ">
                        <div className="text-center">
                            <h2 style={homeHead}>Manage your Calendar</h2>
                            <img src={require('../images/calendar.png')} className=" mx-auto mt-5 mb-5 img-fluid d-block" style={{ width: "700px", height: "400px" }} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const homeHead = {
    color: "#007bff",
    fontSize: "50px",
    fontWeight: "800"
}
export default HomePage;