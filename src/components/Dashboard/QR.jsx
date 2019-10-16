import React from "react";
import QRCode from "qrcode.react";
import PropTypes from "prop-types";

const QR = ({ email }) => (
    <QRCode size={document.getElementsByClassName("container")[0].clientWidth - 70}
        value={email} />
);

QR.propTypes = {
    email: PropTypes.string
};

export default QR;
