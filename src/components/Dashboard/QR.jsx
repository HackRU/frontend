import React from "react";
import QRCode from "qrcode.react";
import PropTypes from "prop-types";

const QR = ({ email }) => (
    <QRCode className="qr" 
        size="250" 
        value={email} />
);

QR.propTypes = {
    email: PropTypes.string
};

export default QR;
