/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from "react";
import { render } from "@testing-library/react";
import PureModal from "../pure_component/PureModal";

describe("PureModal", () => {
    test("renders header and subheader", () => {
        const {queryByText} = render(<PureModal header={"Header"}
            subHeader={"Subheader"}
            onClick={() => {}}>Child</PureModal>);
        
        const header = queryByText(/Header/);
        const subHeader = queryByText(/Subheader/);
        expect(header).toBeTruthy();
        expect(subHeader).toBeTruthy();
    });

    test("onClick called when close button is clicked", () => {
        const fun = jest.fn();
        const {container} = render(<PureModal header={""}
            subHeader={""}
            onClick={() => fun()}>Child</PureModal>);
        
        const button = container.querySelector("button")?.click();
        expect(fun).toHaveBeenCalledTimes(1);
    });

    test("renders child component", () => {
        const {queryByText} = render(<PureModal header=""
            subHeader=""
            onClick={() => {}}>Children</PureModal>);
        
        expect(queryByText(/Children/)).toBeTruthy();
    });
});