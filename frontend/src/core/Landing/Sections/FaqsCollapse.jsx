import React, { useState } from "react";
import { Collapse } from "@material-ui/core";
import { Icon } from "react-fa";
import PropTypes from "prop-types";

function FaqsCollapse(props) {
    const [collapse, setCollapse] = useState(false);

    let cat = props.cat;

    return (
        <div style={{ cursor: "pointer" }}>
            <h5 onClick={() => setCollapse(!collapse)}>
                {cat.title}{" "}
                <Icon
                    className="faq-hover pull-right"
                    name={collapse ? "chevron-up" : "chevron-down"}
                />
            </h5>
            <hr className="faq-hover" />
            <Collapse in={collapse}>
                {cat.text}
                <div style={{ minHeight: 25 }} />
            </Collapse>
        </div>
    );
}

FaqsCollapse.propTypes = {
    cat: PropTypes.object,
};

export default FaqsCollapse;
