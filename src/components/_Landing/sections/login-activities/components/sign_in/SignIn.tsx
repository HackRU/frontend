import React from "react";
import CardLogReg from "../../../../global_components/CardLogReg";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import ColorButton from "../../../library/ColorButton";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import "./Signin.css";
const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#5A7A96A0;",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#5A7A96A0;",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#5A7A96A0;",
        },
        "&:hover fieldset": {
            borderColor: "#5A7A96A0;",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#5A7A96A0;",
        },
    },
});
function SignIn() {
    return (
        <>

            <div className="w-full h-fit bg-gradient-to-b from-mainBg to-endBg"
                style={{
                    height: "100vh", overflow: "auto"
                }}>
                <CardLogReg width={"50%"}
                    left={"25%"}
                    padding={"30px 30px"}
                    margin={"0px 0px"}>

                    {/* Title */}
                    <div className="title text-4xl text-center mb-8">
                        Sign Up
                    </div>

                    {/* Info Input */}

                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { width: "50%", maxWidth: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="my-4">
                            <CssTextField
                                fullWidth
                                required
                                autoFocus
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{
                                    style: { color: "#fff" },
                                }}
                                id="custom-css-outlined-input"
                                label="first"
                                variant="outlined"
                                defaultValue="" />


                            <CssTextField
                                fullWidth
                                required
                                autoFocus
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{
                                    style: { color: "#fff" },
                                }}
                                id="custom-css-outlined-input"
                                label="last"
                                variant="outlined"
                                defaultValue="" />
                        </div>

                    </Box>

                    <Box
                        component="form"
                        sx={{
                            width: 1400,
                            maxWidth: "100%",
                        }}
                    >

                        <div className="my-4">
                            <CssTextField
                                fullWidth
                                required
                                autoFocus
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{
                                    style: { color: "#fff" },
                                }}
                                id="custom-css-outlined-input"
                                label="email"
                                variant="outlined"
                                defaultValue="" />
                        </div>
                        <div className="my-4">
                            <CssTextField
                                fullWidth
                                required
                                autoFocus
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{
                                    style: { color: "#fff" },
                                }}
                                id="custom-css-outlined-input"
                                label="password"
                                variant="outlined"
                                defaultValue="" />

                        </div>
                        <div className="my-4">
                            <CssTextField
                                fullWidth
                                required
                                autoFocus
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{
                                    style: { color: "#fff" },
                                }}
                                id="custom-css-outlined-input"
                                label="confirm password"
                                variant="outlined"
                                defaultValue="" />

                        </div>

                        <ColorButton
                            size="small"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                            Sign Up
                        </ColorButton>

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

export default SignIn;