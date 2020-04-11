import React, { useState } from "react";
import { FormGroup, Label, Button, Col } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import selectorOptions from "./selectorOptions.json";
import { Creatable } from "react-select";
import request from "request";



export default function TeamBuilderProfileForm({
    mobile = false,
    ...props
}) {

    const [user, setUser] = useState(props.user);
    const [skills, setSkills] = useState(props.user.skills);
    const [prizes, setPrizes] = useState(props.user.prizes);
    const [edit, setEdit] = useState(false)


    if (edit) {
        return (
            <div>
                <AvForm
                    //impossible to submit invaid form
                    onValidSubmit={() => {
                        //Update Profile
                    }}
                    onInvalidSubmit={() => {
                        //Not sure if this case is even possible
                    }}>
                    <h4>About You</h4>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label for="skills">What are your skills</Label>
                            <div className="forcestyle">
                                <Creatable isMulti
                                    id="skills"
                                    //not sure how they/where they will be stored/ retrieved, so may need to change currently they are stored with commas in the API
                                    value={(skills.length > 0) ? (skills.split(";").map(((val) => { return { value: val, label: val }; }))) : ([])}
                                    onChange={(e) => { let skills = ""; for (let i = 0; i < e.length; i++) { skills += ";" + e[i].value; } skills = skills.substring(1); user.skills = skills; setUser(user); }}
                                    options={selectorOptions["skills"]} />
                            </div>
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label for="prizes">What prizes do you want to compete for</Label>
                            <div className="forcestyle">
                                <Creatable isMulti
                                    id="prizes"
                                    value={(prizes.length > 0) ? (prizes.split(";").map(((val) => { return { value: val, label: val }; }))) : ([])}
                                    onChange={(e) => { let prizes = ""; for (let i = 0; i < e.length; i++) { prizes += ";" + e[i].value; } prizes = prizes.substring(1); user.prizes = prizes; setUser(user); }}
                                    options={selectorOptions["prizes"]} />
                            </div>
                        </Col>
                    </FormGroup>
                    <div style={{width: "100%"}}
                        align="right">
                        <Button className="pill-butn"
                            color = "success"
                            type="submit">Update</Button>
                    </div>
                </AvForm>
            </div>
    
        );
    
    } else {
        let pStyle = {
            color: theme.disabled[0], padding: 5, minHeight: 35
        };
        let field = (text) => {
            return <p style={pStyle}>{(text) ? text : <i>unanswered</i>}</p>;
        };

        return (
            <div>
                <h4>
                    About you
                    <Button color="primary"
                            className="pill-btn"
                            style={{ position: "absolute", right: 40 }}
                            onClick={() => { setEdit(true); }} ><Icon name="edit" /></Button>
                </h4>
                <FormGroup row>
                    <Col xs={(mobile) ? 12 : 6}>
                        <Label>What are your skills</Label>
                        {field(user.skills)}
                    </Col>
                    <Col xs={(mobile) ? 12 : 6}>
                        <Label>What prizes do you want to compete for</Label>
                        {field(user.prizes)}
                    </Col>
                </FormGroup>
            </div>
        );
    }

    
}
