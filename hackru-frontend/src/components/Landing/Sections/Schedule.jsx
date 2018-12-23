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
                            <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
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
                            <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
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