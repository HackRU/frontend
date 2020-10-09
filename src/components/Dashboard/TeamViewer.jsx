import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import Section from "./Section";

const TeamViewer = (props) => {
    return(
        <Container maxWidth={false} 
            style={{paddingTop: 90 }}>
            <Grid container>
                <Grid xs={12}>
                    <Section title="Team"
                        subtitle="Introduce yourself, don't be shy!"
                        color="yellow"
                        isOpen={true}>
                    </Section>
                </Grid>
                <Grid item
                    xs={12}
                    sm={12}
                    md={6}>
                        
                </Grid>
            </Grid>
        </Container>

    )
}

export default TeamViewer;
