import React, { Component } from "react";
import GlowButton from "../GlowButton";
import { liveImportantLinks } from "../../Defaults";
import { ProfileType } from "../../Profile";

class Links extends Component {
    render() {
        let items = [];
        for (let i = 0; i < liveImportantLinks.length; i++) {
            items.push(
                <GlowButton
                    key={i}
                    href={liveImportantLinks[i].href}
                    icon={liveImportantLinks[i].icon}
                    text={liveImportantLinks[i].title}
                />
            );
        }
        return (
            <div style={{ marginBottom: 10 }}>
                <div style={{ width: "100%", textAlign: "left", paddingTop: 10 }}>
                    <div align="center">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}

Links.propTypes = {
    profile: ProfileType
};

export default Links;
