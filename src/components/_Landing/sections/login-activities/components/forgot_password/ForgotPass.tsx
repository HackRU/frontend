import React from "react";
import CardLogReg from "../../../../global_components/CardLogReg";
import { Link } from "react-router-dom";
import ColorButton from "../../../library/ColorButton";
import "./ForgotPass.css";
import Box from "@mui/material/Box";

function ForgotPass() {
    return (
        <>
            <div className="w-full h-fit bg-gradient-to-b from-mainBg to-endBg"
                style={{
                    height: "100vh", overflow: "auto"
                }}>
                <CardLogReg width={"50%"}
                    left={"27%"}
                    padding={"30px 30px"}
                    margin={"0px 0px"}>

                    {/* Title */}
                    <div className="title text-center font-bold subpixel-antialiased	tracking-wide">
                        Forgot Password
                    </div>


                    <div className="subtext text-center">
                        Please reach out to rnd@hackru.org to reset password
                    </div>

                    {/* Info Input */}
                    <Box
                        component="form"
                        sx={{
                            width: 1600,
                            maxWidth: "100%",
                        }}
                    >
                        <a href="mailto:rnd@hackru.org?subject=[HackRU Password Reset]"
                            target="_blank"
                            rel="noopener noreferrer">
                            <ColorButton
                                size="small"
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary">
                                Email Us
                            </ColorButton>
                        </a>

                    </Box>


                    {/* Misc. Links */}
                    <div className="text-center  my-2">
                        <div>
                            <Link to="/login"
                                style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                                Already a member? Login!
                            </Link>
                        </div>
                        <div>
                            <Link to="/"
                                style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                                Return Home
                            </Link>
                        </div>
                    </div>

                </CardLogReg>
            </div>

        </>
    );
}

export default ForgotPass;