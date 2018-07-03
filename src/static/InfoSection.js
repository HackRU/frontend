//InfoSection.js
import React from 'react';



const DashboardProfile = () => (	
  <div class="content-section" id="info-div">
  <h2 class="content-section-title"><i class="fas fa-info-circle fa-fw"></i> <span class="u-highlight">Info</span></h2>
    <div class="content-section-desc" id="info-list">

      <h5 class="content-title">Date</h5>
      <p class="content-desc">
        April 21st-22nd
      </p>
      <h5 class="content-title">Location</h5>
      <span class="font-weight-bold blue"><a class="blue" href="https://goo.gl/maps/a6gNk22V6px">Rutgers Athletic Center</a></span>
      <p class="content-desc">
        83 Rockafeller Rd, <br>Piscataway Township, </br>NJ 08854
      </p>
      <h5 class="content-title">Devpost</h5>
      <p class="content-desc">
        Click <a href="https://hackru-s18.devpost.com/">here</a> to view the devpost
      </p>
      <h5 class="content-title">Want to mentor?</h5>
      <p class="content-desc">
        Click <a href="https://docs.google.com/forms/d/e/1FAIpQLSdGuoY6ATqMlOxOqoiP8FPyzgWMGg60gVzryvUrQBjV6T8h-w/viewform">here</a> to sign up
      </p>
      <h5 class="content-title">Questions?</h5>
      <p class="content-desc">
      Email us at <a href="mailto:info@hackru.org">info@hackru.org</a>
      </p>
      <h5 class="content-title">Emergency Contact</h5>
      <p class="content-desc">
        <span class="font-weight-bold">RUPD</span><br>732-932-7211</br>
      </p>


    </div><span title=".info-list" HIDDEN/>
  </div><span title=".info-div" HIDDEN/>
  );

export default DashboardProfile;
