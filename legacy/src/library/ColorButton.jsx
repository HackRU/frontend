import { Button, withStyles } from "@material-ui/core";

const ColorButton = withStyles(() => ({
    root: {
        color: "white",
        backgroundColor: "#4fab5f",
        "&:hover": {
            backgroundColor: "#4fab5f",
        },
    },
}))(Button);

export default ColorButton;