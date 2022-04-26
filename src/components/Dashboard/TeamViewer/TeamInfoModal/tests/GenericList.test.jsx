/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from "react";
import { render } from "@testing-library/react";
import GenericList from "../pure_component/GenericList";

describe("GenericList", () => {
    test("should be empty", () => {
        const {container} = render(<GenericList/>);
        const list = container.querySelectorAll("li");
        expect(list.length).toBe(0);
    });
    test("should contains three li's", () => {
        const entries = ["hi", "bye", "yo"];
        const {container} = render(<GenericList entries={entries}/>);
        const list = container.querySelectorAll("li");
        expect(list.length).toBe(3);
    });
    test("should render list with proper text", () => {
        const entries = ["hi", "bye", "yo"];
        const {container} = render(<GenericList entries={entries}/>);
        const list = [...container.querySelectorAll("li")].map((node) => node.innerHTML);
        expect(list).toStrictEqual(entries);
    });
});