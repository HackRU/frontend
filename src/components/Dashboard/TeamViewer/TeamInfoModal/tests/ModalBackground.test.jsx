/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from "react";
import { render } from "@testing-library/react";
import ModalBackground from "../pure_component/ModalBackground";

describe("ModalBackground", () => {
    test("background runs the onClick function on click", () => {
        const fun = jest.fn();
        const {container} = render(<ModalBackground onClick={() => fun()}/>);
        container.querySelector("div").click();
        expect(fun).toHaveBeenCalledTimes(1);
    });
});