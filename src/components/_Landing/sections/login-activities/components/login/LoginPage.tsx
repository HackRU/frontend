import React from 'react'
import CardLogReg from '../../../../global_components/CardLogReg'
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import ColorButton from "../../../library/ColorButton";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import './LoginPage.css'
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#5A7A96A0;',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#5A7A96A0;',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#5A7A96A0;',
    },
    '&:hover fieldset': {
      borderColor: '#5A7A96A0;',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#5A7A96A0;',
    },
  },
});

function Login() {
  
  return (
    <>

      <div className="w-full h-fit bg-gradient-to-b from-mainBg to-endBg" style={{
        height: "100vh", overflow: "auto"
      }}>
        <CardLogReg width={"50%"} left={"25%"} padding={"40px 30px"}>
          {/* T itle */}
          <div className="title text-center mb-8 ">
            Log In
          </div>

          {/* email/Password Input */}
          <Box
            component="form"
            sx={{
              width: 1800,
              maxWidth: '100%',

            }}
          >
            <div>
              <div className="my-4">
                <CssTextField 
                  fullWidth
                  required
                  autoFocus
                  inputProps={{ style: { color: "white" } }}
                  InputLabelProps={{
                    style: { color: '#fff' },
                  }}
                  label="email"
                  variant="outlined" id="custom-css-outlined-input" />
              </div>

              <div className="my-4">
                 <CssTextField                 
                  required
                  fullWidth
                  InputLabelProps={{
                    style: { color: '#fff' },
                  }}
                  inputProps={{ style: { color: "white" } }}
                  label="password"
                  variant="outlined"
                  id="custom-css-outlined-input" />
              </div>

              <ColorButton
                size="small"
                type="submit"
                fullWidth
                variant="contained"
                color="primary">
                Log In
              </ColorButton>
            </div>
          </Box>



          {/* Misc. Links */}
          <div className="text-center  my-2">
            <div>
              <Link to="/sign-in"
                style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                Not a member? Create an Account!
              </Link>
            </div>
            <div>
              <Link to="/forgotpassword"
                style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                Forgot your password?
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
  )
}

export default Login