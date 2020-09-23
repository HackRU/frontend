import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Section from "./Section";
import Loading from "./Loading";
import ShortProfileForm from "./Forms/UserProfileForm/ShortProfileForm";
import DocumentForm from "./Forms/UserProfileForm/DocumentForm";
import CommunicationsForm from "./Forms/UserProfileForm/CommunicationsForm";
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

    const submitUser = (user) => {
        setLoading("Saving your information");
        setProfileMSG(null);
        setUser(user);
        props.profile.Set(user, (err) => {
            setLoading(false);
            setProfileMSG(err ?
                { color: "danger", value: err } :
                { color: "success", value: "Profile Updated!" });
        });
    };


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
    if (profileMSG == openDetails) {
        console.log("correct");
    }

    return(
        <Container style={{ width: "100%", minHeight: "100vh", paddingTop: 90 }}>
            <Grid container>
                <Grid item 
                    xs>
                    <Section title="Profile"
                        subtitle="Introduce yourself, don't be shy!"
                        isOpen={true} /* replaced this.state.openDetails to force true*/>
                        <ShortProfileForm mobile={mobile}
                            user={set_user}
                            onChange={(set_user) => {
                                setUser(set_user);
                            }}
                            onSubmit={(set_user) => {
                                set_user.registration_status = "registered";
                                console.log(set_user.want_bus);
                                submitUser(set_user);
                            }}
                            profile={props.profile}
                        />
                    </Section>
                </Grid>
                <Grid item 
                    xs>
                    <Grid item 
                        xs>
                        <Section title="Documents"
                            subtitle="Introduce yourself, don't be shy!"
                            isOpen={true} /* replaced this.state.openDetails to force true*/>
                            <DocumentForm mobile={mobile}
                                user={set_user}
                                onChange={(set_user) => {
                                    setUser(set_user);
                                }}
                                onSubmit={(set_user) => {
                                    set_user.registration_status = "registered";
                                    console.log(set_user.want_bus);
                                    submitUser(set_user);
                                }}
                                profile={props.profile}
                            />
                        </Section>
                    </Grid>
                    <Grid item 
                        xs>
                        <Section title="Communications"
                            subtitle="Introduce yourself, don't be shy!"
                            isOpen={true} /* replaced this.state.openDetails to force true*/>
                            <CommunicationsForm mobile={mobile}
                                user={set_user}
                                onChange={(set_user) => {
                                    setUser(set_user);
                                }}
                                onSubmit={(set_user) => {
                                    set_user.registration_status = "registered";
                                    console.log(set_user.want_bus);
                                    submitUser(set_user);
                                }}
                                profile={props.profile}
                            />
                        </Section>
                    </Grid>
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
