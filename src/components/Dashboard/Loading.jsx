import React from "react";
import { Grid } from "@material-ui/core";
import { BounceLoader, PulseLoader } from "react-spinners";
import { theme } from "../../Defaults";
import PropTypes from "prop-types";

/**
 * Render a loading  screen
 * @param {String} Text Loading subtext
 */
const Loading = ({ text }) => (
    <Grid 
        container
        justify="center"
        alignItems="center"
        style={{ width: "100%", minHeight: "100vh", textAlign: "center" }}
        className="d-flex align-items-center ">
        <Grid
            item
            xs={6}
            
            style={{ display: "block",zIndex: 3, borderRadius: "18px", backgroundColor:"black-transparent" , color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)"  }}>
            <div style={{ width: "100%", color: "white"}}
                align="center">
                <div style={{ display: "inline-block" }}>
                    <h1 className="display-1">L</h1>
                </div>
                <div style={{ display: "inline-block" }}>
                    <BounceLoader color={theme.accent[0]} />
                </div>
                <div style={{ display: "inline-block" }}>
                    <h1 className="display-1">ading</h1>
                </div>
                <div style={{ display: "inline-block" }}>
                    <PulseLoader color={theme.accent[0]} />
                </div>
                <p className="lead"> { text } </p>
            </div>
        </Grid>
    </Grid>
);
Loading.propTypes = {
    text: PropTypes.string,
};
export default Loading;
