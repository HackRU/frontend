import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import React from "react";

/**
 * About component for the landing page
 */
function Footer() {
    return (
        <div className="text-white flex flex-col items-center py-2">
            <div className="pb-4 flex-col justify-center">
                <div className="ml-1">
                    <a href="mailto:info@hackru.org"
                        className="social-links"
                        target="_blank"
                        style={{ display: "inline-block", marginRight: "1vh" }}
                        rel="noopener noreferrer"><MdEmail size="1.5em" />
                    </a>
                    <a href="https://www.facebook.com/theHackRU/"
                        className="social-links"
                        target="_blank"
                        style={{ display: "inline-block", marginRight: "1vh" }}
                        rel="noopener noreferrer"><FaFacebookF size="1.5em" />
                    </a>
                    <a href="https://www.instagram.com/thehackru/"
                        className="social-links"
                        target="_blank"
                        style={{ display: "inline-block", marginRight: "1vh" }}
                        rel="noopener noreferrer"><FaInstagram size="1.5em" />
                    </a>
                    <a href="https://twitter.com/theHackRU"
                        className="social-links"
                        target="_blank"
                        style={{ display: "inline-block", marginRight: "" }}
                        rel="noopener noreferrer"><FaTwitter size="1.5em" />
                    </a>
                </div>
                <div>
                    <a className="text-subtitles  font-semibold"
                        href="https://linktr.ee/thehackru">linktr.ee/thehackru</a>

                </div>
            </div>
            <div className="text-subtitles glow-subtitles font-semibold">Ⓒ HackRU 2023</div>
        </div>
    );

}
export default Footer;
