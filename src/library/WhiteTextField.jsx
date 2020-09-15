import { TextField, withStyles } from "@material-ui/core";

const WhiteTextField = withStyles({
    root: {
        "--input-color": "white",
        "& labl.Mui-focused": {
            color: "white",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "white",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "white",
                color: "white",
            },
            "&:hover fieldset": {
                borderColor: "white",
            },
            "&.Mui-focused fieldset": {
                borderColor: "white",
            },
        },
       
    },

})(TextField);

export default WhiteTextField;