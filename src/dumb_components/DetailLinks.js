import React from 'react';

const Detail = ({ iconClass, text }) => (
  <div className="col-xs-1 col-md-2 text-center ">
    <h1>
      <i className={`${iconClass} theme-red blue`} aria-hidden="true" />
    </h1>
    <h6 className="about-icon-desc text-uppercase bold-text blue">
      { text }
    </h6>
  </div>
);

const DetailLinks = () => (

  <div className="row offset-sm-0 offset-md-1" style={{color: 'red'}}>
    <Detail iconClass="fa fa-file" text="Waiver" />
    <Detail iconClass="fa fa-code" text="DevPost" />
    <Detail iconClass="fab fa-slack-hash" text="Slack" />
    <Detail iconClass="fa fa-question" text="HelpQ" />
    <Detail iconClass="fa fa-utensils" text="Food Menu" />
  </div>

);

export default DetailLinks;
