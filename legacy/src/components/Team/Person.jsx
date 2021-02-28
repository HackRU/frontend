import React from "react";
import { theme } from "../../Defaults";
import PropTypes from "prop-types";

const Person = ({ image, name, title }) => (
    <div style={{marginBottom: 10}}>
        {
            image && <img style={{ borderRadius:80 }}
                src={image}
                alt={name} />
        }
        <h5 style={{marginBottom: 2}}> {name} </h5>
        {title && <span style={{color: theme.secondary[0]}}> {title} </span>}
    </div>
);

Person.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
};

export default Person;
