/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from "react";
import { render } from "@testing-library/react";
import TeamMemberCard from "../pure_component/TeamMemberCard";

describe("TeamMemberCard", () => {

    test("renders bio, seriousness and user_id", () => {
        const user = {
            user_id : "John Doe",
            seriousness : 5,
            bio : "example biography",
        };
        const {queryByText} = render(<TeamMemberCard member={user}/>);
        expect(queryByText(/John Doe/)).toBeTruthy();
        expect(queryByText(/Seriousness : 5/)).toBeTruthy();
        expect(queryByText(/example biography/)).toBeTruthy();
    });
});