/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-max-props-per-line */
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
function SocialMediaComponent() {

    return (
        <div className="m-auto mt-5 h-6 bg-gray-900 p-6 w-36">

            <a href = "https://www.instagram.com/thehackru/" target="_blank" >< FaInstagram style ={{marginTop: "-11px", marginLeft: "-8px"}}  size = "25px"  color = "white"/></a>
            <a href = "https://twitter.com/theHackRU" target="_blank" >< FaTwitter style ={{marginTop: "-24px", marginLeft: "41px"}}  size = "22px"  color = "white"/></a>
            <a href = "https://www.facebook.com/theHackRU/" target="_blank" >< FaFacebookF style ={{marginTop: "-24px", marginLeft: "82px"}}  size = "23px" color = "white"/></a>

        </div>
    );
}

 
export default SocialMediaComponent;
