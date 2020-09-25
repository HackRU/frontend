import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Section from "./Section";
import Loading from "./Loading";
import About from "./Forms/UserProfileForm/ProfileCards/About";
import Education from "./Forms/UserProfileForm/ProfileCards/Education";
import Documents from "./Forms/UserProfileForm/ProfileCards/Documents";
import Questions from "./Forms/UserProfileForm/ProfileCards/Questions";
import Register from "./Forms/UserProfileForm/ProfileCards/Register";
// import Short from "./Forms/UserProfileForm/ProfileCards/ShortProfileForm";
import Communications from "./Forms/UserProfileForm/ProfileCards/Communications";
import { ProfileType } from "../Profile";
import PropTypes from "prop-types";
// import { theme } from "../../Defaults";


const Profile = (props) => {
    const [loading, setLoading] = useState("Loading your personal dashboard...");
    const [user, setUser] = useState({});
    const [openDetails, setOpenDetails] = useState(false);
    const [profileMSG, setProfileMSG] = useState({});

    useEffect(() => {
        if (props.magic) {
            props.profile.Eat(props.magic, (msg) => {
                if (msg) {
                    console.error(msg);
                    setProfileMSG({ color: "warning", value: msg });
                } else {
                    setProfileMSG({ color: "info", value: "Magic link applied!" });
                }
                props.clearMagic();
            });
        }
        props.profile.Get((msg, data) => {
            if (msg) {
                console.error(msg);
            } else {
                if (data) {
                    delete data.auth;
                    setUser(data);
                    setLoading(false);
                    setOpenDetails((data.registration_status === "unregistered"));
                }
            }
        });
    }, []);

    // const submitUser = (user) => {
    //     setLoading("Saving your information");
    //     setProfileMSG(null);
    //     setUser(user);
    //     props.profile.Set(user, (err) => {
    //         setLoading(false);
    //         setProfileMSG(err ?
    //             { color: "danger", value: err } :
    //             { color: "success", value: "Profile Updated!" });
    //     });
    // };


    if (!props.profile.isLoggedIn) {
        return (<Redirect to="/login"/>);
    }
    if (loading) {
        return (<Loading text={loading} />);
    }
    let set_user = user;
    set_user.phone_number = set_user.phone_number || "";
    set_user.ethnicity = set_user.ethnicity || "";
    set_user.how_you_heard_about_hackru = set_user.how_you_heard_about_hackru || "";
    set_user.reasons = set_user.reasons || "";
    let mobile = props.isMobile;
    if (profileMSG === openDetails) {
        console.log("correct");
    }

    return(
        <Container maxWidth={false} 
            style={{paddingTop: 90 }}>
            <Grid container>
                <Grid item 
                    xs>
                    <Section title="About"
                        subtitle="Introduce yourself, don't be shy!"
                        isOpen={true} /* replaced this.state.openDetails to force true*/>
                        <About mobile={mobile}
                            user={set_user}
                            profile={props.profile}
                        />
                    </Section>
                    <Section title="Education"
                        subtitle="Introduce yourself, don't be shy!"
                        isOpen={true} /* replaced this.state.openDetails to force true*/>
                        <Education mobile={mobile}
                            user={set_user}
                            profile={props.profile}
                        />
                    </Section>
                    
                </Grid>
                <Grid item 
                    xs>
                    <Section title="A Few Questions"
                        subtitle="Introduce yourself, don't be shy!"
                        isOpen={true} /* replaced this.state.openDetails to force true*/>
                        <Questions mobile={mobile}
                            user={set_user}
                            profile={props.profile}
                        />
                    </Section>
                    <Grid item 
                        xs>
                        <Section title="Documents"
                            subtitle="Introduce yourself, don't be shy!"
                            isOpen={true} /* replaced this.state.openDetails to force true*/>
                            <Documents mobile={mobile}
                                user={set_user}
                                profile={props.profile}
                            />
                        </Section>
                    </Grid>
                    <Grid item 
                        xs>
                        <Section title="Communications"
                            subtitle="Introduce yourself, don't be shy!"
                            isOpen={true} /* replaced this.state.openDetails to force true*/>
                            <Communications mobile={mobile}
                                user={set_user}
                                profile={props.profile}
                            />
                        </Section>
                    </Grid>
                </Grid>
                <Grid xs={12}>
                    <Section title="Register"
                        subtitle="Introduce yourself, don't be shy!"
                        isOpen={true} /* replaced this.state.openDetails to force true*/>
                        <Register mobile={mobile}
                            user={set_user}
                            profile={props.profile}
                        />
                    </Section>
                </Grid>
            </Grid>
        </Container>
    );

};


Profile.propTypes = {
    clearMagic: PropTypes.func,
    isMobile: PropTypes.bool,
    magic: PropTypes.string,
    profile: ProfileType,
};

export default Profile;
