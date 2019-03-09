import React from 'react';

const QR = ({ data, status }) => (
    (status === 'confirmed' || status === 'waitlist' || status ==='coming' || status ==='registered') && data && data.body && <div>
        <img src={data.body} className="qr" alt="User QR Code" />
    </div>
)

export default QR
