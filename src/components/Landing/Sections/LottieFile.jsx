import Lottie from "lottie-react";
import React from "react";
import PropTypes from "prop-types";

const LottieFile = (props) => {
    return (
        <React.Fragment>
            <Lottie 
                animationData={props.data}
                loop="true"
            />
        </React.Fragment>
    );
};

LottieFile.propTypes = {
    data: PropTypes.object.isRequired,
};

export default LottieFile;
