
import React, { Component } from "react";

/**
 * Schedule component for the landing page
 */
class Schedule extends Component {
    render() {
        return (
            <div>

                <div className="row">
                    <div className="col-12">
                        <h1 className="display-4 theme-font">Schedule</h1>
                    </div>
                </div>
                <hr />
                <div className="row row-content-box">
                    <div className="col-12 col-lg-6">
                        <h3 className="text-center mb-2">Saturday <small>3/9/19</small></h3>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Time</th>
                                    <th scope="col" >Event</th>
                                    <th scope="col">Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">10:00 AM</th>
                                    <td>Check-in</td>
                                    <td>Main Lobby</td>
                                </tr>
                                <tr>
                                    <th scope="row">11:00 AM</th>
                                    <td>Lunch</td>
                                    <td>Food Table</td>
                                </tr>
                                <tr>
                                    <th scope="row">11:30 AM</th>
                                    <td>Opening Ceremonies</td>
                                    <td>Main Stage</td>
                                </tr>
                                <tr>
                                    <th scope="row">1:00 PM</th>
                                    <td>Hacking Begins</td>
                                    <td>Hacking Stations</td>
                                </tr>
                                <tr>
                                    <th scope="row">6:00 PM</th>
                                    <td>Dinner</td>
                                    <td>Food Table</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 mt-5 mt-lg-0 col-lg-6">
                        <h3 className="text-center mb-2">Sunday <small>3/10/19</small></h3>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Time</th>
                                    <th scope="col">Event</th>
                                    <th scope="col">Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">12:00 AM</th>
                                    <td>Midnight Surprise</td>
                                    <td>(it's a surprise)</td>
                                </tr>
                                <tr>
                                    <th scope="row">2:00 AM</th>
                                    <td>Midnight Snack</td>
                                    <td>Food Table</td>
                                </tr>
                                <tr>
                                    <th scope="row">7:30 AM</th>
                                    <td>Breakfast</td>
                                    <td>Food Table</td>
                                </tr>
                                <tr>
                                    <th scope="row">11:30 AM</th>
                                    <td>Hacking Ends</td>
                                    <td>Hacking Stations</td>
                                </tr>
                                <tr>
                                    <th scope="row">11:30 AM</th>
                                    <td>Lunch</td>
                                    <td>Food Table</td>
                                </tr>
                                <tr>
                                    <th scope="row">12:00 PM</th>
                                    <td>Demos Begin</td>
                                    <td>Hacking Area</td>
                                </tr>
                                <tr>
                                    <th scope="row">2:00 PM</th>
                                    <td>Closing Ceremonies</td>
                                    <td>Main Stage</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Schedule;
