/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from "react";
import { render } from "@testing-library/react";
import PureSection from "../pure_component/PureSection";

describe("PureSection", () => {
    
    test("renders section header", () => {
        const {queryByText} = render(<PureSection sectionHeader={"Section Header"}>Child</PureSection>);
        const sectionHeader = queryByText(/Section Header/i);
        expect(sectionHeader.innerHTML).toBe("Section Header");
    });

    test("renders child component", () => {
        const child = <div id="child-component">Child Component</div>;
        const {queryByText} = render(<PureSection sectionHeader={"header"}>{child}</PureSection>);
        const childComponent = queryByText(/Child Component/i);
        expect(childComponent).toBeTruthy();
    });
});