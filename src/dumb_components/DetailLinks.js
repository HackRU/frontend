import React from 'react';
import resURLS from 'resources/resURLS';

const Detail = ({ iconClass, link, text }) => (
  <div className="col-xs-1 col-md-2 text-center ">
    <a href={link} target="_blank" rel="noopener noreferrer">
      <h1>
        <i className={`${iconClass} theme-red blue`} aria-hidden="true" />
      </h1>
      <h6 className="about-icon-desc text-uppercase bold-text blue">
        { text }
      </h6>
    </a>
  </div>
);

const DetailLinks = () => (

  <div className="row offset-sm-0 offset-md-1" style={{color: 'red'}}>
    <Detail iconClass="fa fa-file" link={resURLS.waiver} text="Waiver" />
    <Detail iconClass="fa fa-code" link={resURLS.devpost} text="DevPost" />
    <Detail iconClass="fab fa-slack-hash" link={resURLS.slack} text="Slack" />
    <Detail iconClass="fa fa-question" link={resURLS.helpq} text="HelpQ" />
    <Detail iconClass="fa fa-utensils" link={resURLS.menu} text="Food Menu" />
  </div>

);

export default DetailLinks;
