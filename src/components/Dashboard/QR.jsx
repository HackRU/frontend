import React from "react";
import QRCode from "qrcode.react";

const QR = ({ email }) => (
    <QRCode size={document.getElementsByClassName("container")[0].clientWidth - 70} value="email" />
);

export default QR;
