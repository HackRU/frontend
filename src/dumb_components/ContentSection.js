// ContentSection.js
import React from 'react';
import PropTypes from 'prop-types';

const ContentSection = ({ children, bodyClasses, headerClasses, sectionID, title }) => (
  <div className="content-section">
    {
      title && <h2 className={'content-section-title ' + (headerClasses || '')}>
        <span className="u-highlight">
          { title }
        </span>
      </h2>
    }
    <div className={'content-section-desc ' + (bodyClasses || '')} id={sectionID}>
      { children }
    </div>
  </div>
);

ContentSection.propTypes = {
  children: PropTypes.element.isRequired,
  bodyClasses: PropTypes.string,
  headerClasses: PropTypes.string,
  sectionID: PropTypes.string,
  title: PropTypes.string,
};

export default ContentSection;
