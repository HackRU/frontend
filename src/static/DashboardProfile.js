//DashboardProfile.js
import React from 'react';

import { logoURL, wheelURL } from 'resources/resURLS';


const DashboardProfile = () => (	
  <div className="col-xs-12 col-md-2" id="dashboard-profile">
    <div className="row">
      <div className="col-12 text-center">
        <a href="http://hackru.org/"><img id="profile-logo" src={logoURL}/></a>
      </div>
      <div className="col-10 offset-1 text-center mt-4 mb-5" style="display:none;" id="qr-border">
        <img className="image-divider" id="profile-qr" src={wheelURL}/>
      </div>
      <div className="col-10 offset-1 text-left mb-5" id="register-sidebar">
      </div>
    </div>
  </div>
  );

export default DashboardProfile;
