/**
 * @author Shivan Modha
 * @description Landing Page: Schedule Component 
 * @version 0.0.1
 * Created 12/10/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
/***************************************************************IMPORTS***************************************************************/

/***************************************************************SCHEDULE**************************************************************/
/**
 * Schedule component for the landing page
 */
class Schedule extends Component {
    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-12">
                        <h1 class="display-4 theme-font" id="schedule">Schedule</h1>
                    </div>
                </div>
            

            <div class="row row-content-box">
                <div class="col-12 col-lg-6">
                    <h3 class="text-center mb-2">Saturday</h3>
                    <table class="table table-hover">
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

                <div class="col-12 mt-5 mt-lg-0 col-lg-6">
                    <h3 class="text-center mb-2">Sunday</h3>
                    <table class="table table-hover">
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
/***************************************************************SCHEDULE**************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default Schedule;
/***************************************************************EXPORTS***************************************************************/