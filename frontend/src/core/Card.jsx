import React from "react";
import PropTypes from "prop-types";

// import { theme } from "../../../Defaults";

function Card(props){

    return (
        <div style={{ backgroundColor: props.backgroundColor, color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: 50 }}>

            {props.sideBar ? <div style={{ position: "absolute", left: "calc(15px)", top: 0, height: "100%", backgroundColor: props.sideBar, width: 10 }}></div> : ""}
            {props.children}
        </div>
    );
}
Card.propTypes = {
    backgroundColor: PropTypes.any,
    sideBar: PropTypes.any,
    children: PropTypes.element
};
export default Card;