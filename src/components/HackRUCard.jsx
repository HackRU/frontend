import React from "react";
import PropTypes from "prop-types";
// import Card from "@material-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

// import { theme } from "../../../Defaults";

function HackRUCard(props){

    return (
        <Card sx={{minWidth: 400 }} style={{ backgroundColor: props.backgroundColor, color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)"}}>
            {props.sideBar ? <div style={{ position: "absolute", left: "calc(15px)", top: 0, height: "100%", backgroundColor: props.sideBar, width: 10 }}></div> : ""}
            <CardContent>
                {props.children}
            </CardContent>
        </Card>
    );
}
HackRUCard.propTypes = {
    backgroundColor: PropTypes.any,
    sideBar: PropTypes.any,
    children: PropTypes.element
};
export default HackRUCard;