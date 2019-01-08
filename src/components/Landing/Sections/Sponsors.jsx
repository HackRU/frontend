/**
 * @author Shivan Modha
 * @description Landing Page: Sponsors Component
 * @version 0.0.1
 * Created 12/10/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
/***************************************************************IMPORTS***************************************************************/

/***************************************************************SPONSORS**************************************************************/
/**
 * Sponsors component for the landing page
 */
class Sponsors extends Component {
    render() {
        return (
            <div class="row min-half-height theme-white">
                <div class="col-10 offset-1">
                    <div class="row row-title-box">
                        <div class="col-12">
                            <h2 class="row-title" id="sponsors">Sponsors</h2>
                        </div>
                    </div>

                    <div class="row row-content-box">
                        <div class="col-12">


                            <h4 class="spons-level my-5 gold">Gold</h4> 
                            <div class="row text-center">
                                <div class="col-10 offset-1 col-md-5 offset-md-1 col-xl-4 offset-xl-2 ">
                                    <img class="splogo" src="./assets/splogos/gold/800bnymellon.png" alt="BNY Mellon"/>
                                    <h6 class="splogo-text">BNY Mellon</h6>
                                </div>
                                <div class="col-10 offset-1 col-md-5 offset-md-0 col-xl-4 offset-xl-0 ">
                                    <img class="splogo" src="./assets/splogos/gold/800td.png" alt="TD Bank"/>
                                    <h6 class="splogo-text">TD Bank</h6>
                                </div>
                            </div>
                    
                            <h4 class="spons-level my-5 silver">Silver</h4> 
                    
                            <div class="row text-center">
                                <div class="col hidden-sm-down"></div>
                                <div class="col-md-3 col-8 offset-2 offset-md-0">
                                    <img class="splogo" src="./assets/splogos/silver/800bloomberg.png" alt="Bloomberg"/>
                                    <h6 class="splogo-text">Bloomberg</h6>
                                </div>
                                <div class="col-md-3 col-8 offset-2 offset-md-0">
                                    <img class="splogo" src="./assets/splogos/silver/800icims.png" alt="iCims"/>
                                    <h6 class="splogo-text">iCims</h6>
                                </div>
                                <div class="col-md-3 col-8 offset-2 offset-md-0">
                                    <img class="splogo" src="./assets/splogos/silver/800jpmorgan.png" alt="JP Morgan"/>
                                    <h6 class="splogo-text">JP Morgan</h6>
                                </div>
                                <div class="col hidden-sm-down"></div>
                            </div>
                            <div class="row text-center">
                                <div class="col hidden-sm-down"></div>
                                <div class="col-md-3 col-8 offset-2 offset-md-0">
                                    <img class="splogo" src="./assets/splogos/silver/800optum.png" alt="Optum"/>
                                    <h6 class="splogo-text">Optum</h6>
                                </div>
                                <div class="col-md-3 col-8 offset-2 offset-md-0">
                                    <img class="splogo" src="./assets/splogos/silver/800siemens.png" alt="Siemens"/>
                                    <h6 class="splogo-text">Siemens</h6>
                                </div>
                                <div class="col-md-3 col-8 offset-2 offset-md-0">
                                    <img class="splogo" src="./assets/splogos/silver/800twilio.png" alt="Twilio"/>
                                    <h6 class="splogo-text">Twilio</h6>
                                </div>
                                <div class="col hidden-sm-down"></div>
                            </div>
                 
                            <h4 class="spons-level my-5 bronze">Bronze</h4>
                    
                            <div class="row text-center">
                                <div class="col-6 col-md-2 offset-md-2">
                                    <img class="splogo" src="./assets/splogos/bronze/800att.png" alt="AT&T"/>
                                    <h6 class="splogo-text">AT&T</h6>
                            
                                </div>
                       
                                <div class="col-6 col-md-2 ">
                                    <img class="splogo" src="./assets/splogos/bronze/800capitalone.png" alt="Capital One"/>
                                    <h6 class="splogo-text">Capital One</h6>
                                </div>
                    
                                <div class="col-6 col-md-2 ">
                                    <img class="splogo" src="./assets/splogos/bronze/800citi.png" alt="Citi"/>
                                    <h6 class="splogo-text">Citi</h6>
                           
                                </div>
                                <div class="col-6 col-md-2">
                                        <img class="splogo" src="./assets/splogos/bronze/800dropbox.png" alt="Dropbox"/>
                                        <h6 class="splogo-text">Dropbox</h6>
                                </div>
                                <div class="col-6 col-md-2 offset-md-2">
                                        <img class="splogo" src="./assets/splogos/bronze/800facebook.png" alt="Facebook"/>
                                        <h6 class="splogo-text">Facebook</h6>
                                </div>
                                <div class="col-6 col-md-2">
                                    <img class="splogo" src="./assets/splogos/bronze/800gartner.png" alt="Gartner"/>
                                    <h6 class="splogo-text">Gartner</h6>
                                </div>
                                <div class="col-6 col-md-2">
                                        <img class="splogo" src="./assets/splogos/bronze/800linode.png" alt="Linode"/>
                                        <h6 class="splogo-text">Linode</h6>
                            
                                </div>
                                <div class="col-6 col-md-2">
                                        <img class="splogo" src="./assets/splogos/bronze/800prudential.png" alt="Prudential"/>
                                        <h6 class="splogo-text">Prudential</h6>
                                </div>
                            </div>

                



                            <p class="mt-5 text-center">
                                Looking to sponsor us?
                                <br/>
                                Visit <a class="theme-red" href="./sponsorship.html">sponsorship.hackru.org</a> or email us at sponsorship@hackru.org!
                            </p>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
/***************************************************************SPONSORS**************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default Sponsors;
/***************************************************************EXPORTS***************************************************************/