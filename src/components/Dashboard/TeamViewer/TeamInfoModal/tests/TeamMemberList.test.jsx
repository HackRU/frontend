/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from "react";
import { render } from "@testing-library/react";
import TeamMemberList from "../pure_component/TeamMemberList";

describe("TeamMemberList", () => {
    test("should render unordered list containing 6 list elements", () => {
        const consoleErr = console.error;
        console.error = jest.fn();
        const members = Array(6).fill(0).map((it) => {
            return {
                user_id : "John Doe",
                seriousness : 5,
                bio : "example biography",
            };
        });
        const {container} = render(<TeamMemberList members={members}/>);
        expect(container.querySelector("ul")).toBeTruthy();
        expect(container.querySelector("ul").querySelectorAll("li").length).toBe(6);
        console.error = consoleErr;
    });
});