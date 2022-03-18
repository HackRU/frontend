import Lottie from "lottie-react";
import React from "react";
import PropTypes from "prop-types";

const LottieFile = (props) => {
    return (
        <React.Fragment>
            <Lottie 
                animationData={props.data}
                style={props.style}
                interactivity={props.interactivity}
                loop="true"
            />
        </React.Fragment>
    );
};

LottieFile.propTypes = {
    data: PropTypes.object.isRequired,
    style: PropTypes.object,
    interactivity: PropTypes.object,
};

export default LottieFile;
