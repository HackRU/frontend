import React from "react";
import {Col } from "reactstrap";
import Person from "./Person.jsx";
import PropTypes from "prop-types";

const TeamNames = ({ people, teamName }) => (
    <Col>
        <h4> {teamName} </h4>
        {people.map((person) =>
            <Person key={person.id}
                name={person.name}
                title={person.title} />
        )}
    </Col>
);

TeamNames.propTypes = {
    people: PropTypes.string,
    teamName: PropTypes.string,
};

export default TeamNames;
