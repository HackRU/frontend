import { Button, withStyles } from "@material-ui/core";

const ColorButton = withStyles(() => ({
    root: {
        color: "white",
        backgroundColor: "#1583d2",
        "&:hover": {
            backgroundColor: "#1583d2",
        },
    },
}))(Button);

export default ColorButton;