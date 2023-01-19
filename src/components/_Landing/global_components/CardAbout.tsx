import React from "react";
import PropTypes from "prop-types";
import useAboutConfig from "../sections/about/hooks/useConfigAbout";
import "./CardAbout.css";

const getVisiblity = (visibility: boolean) => {
    return visibility ? "visible" : "hidden";
};

function Card(props: any) {
    const { mainComponent } = useAboutConfig();
    const {
        sidebarVisible,
        useSplitCards,
    } = mainComponent;

    if (useSplitCards) {
        return (
            <div className="cardStyleSplitCard transparent-black-background"
                style={{
                    position: "relative", borderRadius: "18px",
                    color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: 20,
                }}>
                {props.children}
            </div>
        );
    } else {
        return (

            <div className="cardStyle"
                style={{
                    position: "relative", backgroundColor: props.backgroundColor,
                    color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: 30
                }}>

                {props.sideBar ?
                    <div className={`${getVisiblity(sidebarVisible)}`}
                        style={{ position: "absolute", top: 0, left: 0, height: "100%", backgroundColor: props.sideBar, width: 22 }}></div> : ""}
                {props.children}
            </div>
        );
    }

}
Card.propTypes = {
    backgroundColor: PropTypes.any,
    sideBar: PropTypes.any,
    children: PropTypes.element
};
export default Card;