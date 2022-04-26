/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from "react";
import { render } from "@testing-library/react";
import ConfirmationModal from "../pure_component/ConfirmationModal";

describe("ConfirmationModal", () => {
    test("Confirm button should call onConfirm", () => {
        const fun = jest.fn();
        const {queryByText} = render(<ConfirmationModal onConfirm={() => fun()}
            onCancel={() => {}}/>);
        const confirmationBtn = queryByText(/Confirm/);
        confirmationBtn.click();
        expect(fun).toHaveBeenCalledTimes(1);
    });

    test("Cancel button should call onCancel", () => {
        const fun = jest.fn();
        const {queryByText} = render(<ConfirmationModal onConfirm={() => {}}
            onCancel={() => fun()}/>);
        const cancelBtn = queryByText(/Cancel/);
        cancelBtn.click();
        expect(fun).toHaveBeenCalledTimes(1);
    });

    test("message is rendered", () => {
        const msg = "This is the example message!";
        const {queryByText} = render(<ConfirmationModal onCancel={() => {}}
            onConfirm={() => {}}
            message={msg}/>);
        expect(queryByText(/This is the example message!/)).toBeTruthy();
    });
});