import React from "react";
import { Grid } from "@material-ui/core";
import { theme } from "../../../Defaults";
import { Icon } from "react-fa";
import CountUp from "react-countup";
import PropTypes from "prop-types";
import Card from "../../Card";

function Stats(){
    return(
        <div>
            <Grid container spacing={3} className="d-flex align-items-center"
                style={{ textAlign: "center" }}>
                <Grid item xs>
                    <Stat back={theme.primary[1]}
                        accent={theme.accent[0]}
                        text="Hackers"
                        decoration=""
                        number={600}
                        icon="users" />
                </Grid>
                <Grid item xs>
                    <Stat back={theme.primary[1]}
                        accent={theme.accent[0]}
                        text="In Prizes"
                        decoration="$"
                        number={14000}
                        icon="trophy" />
                </Grid>
                <Grid item xs>
                    <Stat back={theme.primary[1]}
                        accent={theme.accent[0]}
                        text="Projects"
                        decoration=""
                        number={50}
                        icon="terminal" />
                </Grid>
            </Grid>
        </div>
    );

}

const Stat = ({ number, text, back, accent, icon, decoration }) => (
    <Card backgroundColor={back}>
        {/* <div style={{ position: "absolute", left: "calc(15px)", top: 25, height: "calc(100% - 25px)", backgroundColor: accent, width: 10 }}></div> */}

        <div>
            <h1 className="stat-number">
                {decoration}
                <CountUp
                    end={number}
                    duration={5} />
                +
            </h1>
            <h1>{text}</h1>
        </div>
        <Icon name={icon}
            style={{ fontSize: "10vh", marginRight: 10, color: accent }} />

    </Card>
);

Stat.propTypes = {
    number: PropTypes.string,
    text: PropTypes.string,
    back: PropTypes.string,
    accent: PropTypes.string,
    icon: PropTypes.string,
    decoration: PropTypes.string
};

export default Stats;
