import React, { useState, useEffect } from "react";
import { Container, Grid, Avatar, Typography, AppBar, Tabs, Tab, Box } from "@material-ui/core";
import Section from "./Section";

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


const TeamViewer = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return(
        <Container maxWidth={false} 
            style={{paddingTop: 90 }}>
            <Grid container>
                <Grid xs={12}>
                    <Section title="Team"
                        subtitle="Introduce yourself, don't be shy!"
                        color="yellow"
                        isOpen={true}>
                            <Grid container direction="column" alignItems="center">
                                <Grid container direction="row" justify="center">
                                    <Grid item style={{"margin-right": "2em"}}>
                                        <Avatar style={{"width": "6em", "height": "6em"}}>E</Avatar>
                                    </Grid>
                                    <Grid item direction="column">
                                        <Grid item>
                                            <Typography variant="h5">Example Example</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h7">Bio</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h7">Skills:</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h7">Interests:</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h7">Prizes:</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item style={{marginTop: "2em"}}>
                                    <AppBar position="static" color="transparent" style={{ background: 'transparent', boxShadow: 'none'}}>
                                        <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="simple tabs example">
                                            <Tab label="My Team" {...a11yProps(0)} />
                                            <Tab label="Edit Team" {...a11yProps(1)} />
                                            <Tab label="Find Teams" {...a11yProps(2)} />
                                        </Tabs>
                                    </AppBar>

                                </Grid>
                            </Grid>
                    </Section>
                </Grid>
            </Grid>
        </Container>

    )
}

export default TeamViewer;
