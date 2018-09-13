//InfoSection.js
import React from 'react';



const InfoSection = () => (	
  <div className="content-section" id="info-div">
    <h2 className="content-section-title">
      <span className="u-highlight">{'Event Info:'}</span></h2>
    <div className="content-section-desc" id="info-list">

      <h5 className="content-title">{'Date'}</h5>
      <p className="content-desc">
        {'October 6th-7th'}
      </p>
      <h5 className="content-title">{'Location'}</h5>
      <span className="font-weight-bold blue"><a className="blue" href="https://goo.gl/maps/SLPeZQ4PCfH2" target="_blank"  >{'College Ave Student Center'}</a></span>
      <p className="content-desc">
        {'126 College Ave'}<br />{'New Brunswick, '}<br />{'NJ 08901'}
      </p>
      {/*
      <h5 className="content-title">{'Devpost'}</h5>
      <p className="content-desc">
        {'Click '}<a href="https://hackru-s18.devpost.com/">{'here'}</a>{' to view the devpost'}
      </p>
      <h5 className="content-title">{'Want to mentor?'}</h5>
      <p className="content-desc">
        {'Click '}<a href="https://docs.google.com/forms/d/e/1FAIpQLSdGuoY6ATqMlOxOqoiP8FPyzgWMGg60gVzryvUrQBjV6T8h-w/viewform">{'here'}</a>{' to sign up'}
      </p>
      */}
      <h5 className="content-title">{'Questions?'}</h5>
      <p className="content-desc">
        {'Email us at '}<a href="mailto:info@hackru.org">{'info@hackru.org'}</a>
      </p>
      <h5 className="content-title">{'Emergency Contact'}</h5>
      <p className="content-desc">
        <span className="font-weight-bold">{'RUPD'}</span><br />{'732-932-7211'}<br />
      </p>


    </div>
  </div>
);

export default InfoSection;
