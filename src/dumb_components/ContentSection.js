// ContentSection.js
import React from 'react';
import PropTypes from 'prop-types';

const ContentSection = ({ children, registerRoot, sectionID, title }) => (
  <div className="content-section">
    {
      title && <h2 className="content-section-title">
        <span className="u-highlight">
          title
        </span>
      </h2>
    }
    <div className={'content-section-desc' + registerRoot ? 'register-root' : ''} id={sectionID}>
      { children }
    </div>
  </div>
);

ContentSection.propTypes = {
  children: PropTypes.element.isRequired,
  registerRoot: PropTypes.boolean.isOptional,
  sectionID: PropTypes.string.isOptional,
  title: PropTypes.string.isOptional,
};

export default ContentSection;
