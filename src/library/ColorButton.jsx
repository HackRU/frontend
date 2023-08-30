import { Button, withStyles } from "@material-ui/core";

const ColorButton = withStyles(() => ({
    root: {
        color: "white",
        backgroundColor: "#8db67e",
        "&:hover": {
            backgroundColor: "#8db67e",
        },
    },
}))(Button);

export default ColorButton;