import React from "react";
import "./CardLogReg.css";

function CardLogReg(props: any) {
    return (
        <div className="logreg transparent-black-background"
            style={{
                left: props.left, padding: props.padding, margin: props.margin,
                width: props.width, position: "relative", borderRadius: "18px", backgroundColor: props.backgroundColor,
                color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)"
            }}>
            {props.children}
        </div>
    );
}

export default CardLogReg;