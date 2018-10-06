import React from 'react';

const Detail = ({ iconClass, text }) => (
  <div className="col-12 col-md-4 offset-0 offset-md-2 col-lg-2 offset-lg-1 text-center">
    <h1>
      <i className={`${iconClass} theme-red blue`} aria-hidden="true" />
    </h1>
    <h6 className="about-icon-desc text-uppercase bold-text">
      { text }
    </h6>
  </div>
);

const DetailLinks = () => (
  <div className="row min-full-height color-two">
    <div className="row-content-box col-12 theme-purple blue">
      <div className="row" style={{color: 'red'}}>
        <Detail iconClass="fa fa-file" text="Waiver" />
        <Detail iconClass="fa fa-code" text="DevPost" />
        <Detail iconClass="fab fa-slack-hash" text="Slack" />
        <Detail iconClass="fa fa-question" text="HelpQ" />
        <Detail iconClass="fa fa-utensils" text="Food Menu" />
      </div>
    </div>
  </div>
);

export default DetailLinks;
