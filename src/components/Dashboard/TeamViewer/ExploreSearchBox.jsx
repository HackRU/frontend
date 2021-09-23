import * as React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

function ExploreSearchBox(props) {
    return (
        <Box
            component="form"
            sx={{
                mt: 5,
                mb: 5
            }}
            noValidate
            autoComplete="off"
            onChange={(e) => {
                props.setSearchText(e.target.value);
            }}
            onKeyPress={(e) => { // Prevent page from reloading on Enter
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            }}
        >
            <TextField id="outlined-basic"
                label="Search by team name"
                variant="outlined" />
        </Box>
    );
}

ExploreSearchBox.propTypes = {
    setSearchText: PropTypes.func
};

export default ExploreSearchBox;