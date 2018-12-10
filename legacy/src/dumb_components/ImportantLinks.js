//ImportantLinks.js
import React from 'react';



const ImportantLinks = () => (	
  <div className="row">
    <div className="col-3 text-center">
      <h5>
        <a href="https://www.facebook.com/theHackRU/" 
          className="color-two" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-square fa-fw" />
        </a>
      </h5>
    </div>
    <div className="col-3 text-center">
      <h5>
        <a href="https://www.instagram.com/thehackru/" 
          className="color-two" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram fa-fw" />
        </a>
      </h5>
    </div>
    <div className="col-3 text-center">
      <h5>
        <a href="https://medium.com/the-hackru" 
          className="color-two" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-medium fa-fw" />
        </a>
      </h5>
    </div>
    <div className="col-3 text-center">
      <h5>
        <a href="https://twitter.com/theHackRU" 
          className="color-two" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter-square fa-fw" /></a>
      </h5>
    </div>
    <div className="col-12 text-center mt-3">
      <p>
        <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" 
          className="color-two" 
          target="_blank"
          rel="noopener noreferrer"
        >
          {'MLH\'s Code of Conduct'}
        </a>
      </p>
      <p>
        <a href="mailto:info@hackru.org" 
          className="color-two" 
          target="_blank" 
          rel="noopener noreferrer"
          data-email="info@hackru.org"
        >
          {'info@hackru.org'}
        </a>
      </p>
    </div>
  </div>
);

export default ImportantLinks;
