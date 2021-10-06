/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { renderHook, cleanup } from "@testing-library/react-hooks";
import useDebounce from "./usDebounce";

describe("useDebounce", () => {
    let fun = () => {};
    beforeEach(() => {
        jest.useFakeTimers();
        fun = jest.fn();
    });
    afterEach(() => {
        fun = () => {};
    });
    test("deBouncedFn immediate = true runs function immediately", () => {
        const {result, rerender} = renderHook(() => useDebounce(fun, 100));
        const deBouncedFn = result.current.deBouncedFn;
        deBouncedFn();
        expect(fun).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(101);
        expect(fun).toHaveBeenCalledTimes(1);
    });
    test("deBouncedFn immediate = false runs function later", () => {
        const {result, rerender} = renderHook(() => useDebounce(fun, 100, false));
        const deBouncedFn = result.current.deBouncedFn;
        deBouncedFn();
        expect(fun).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(101);
        expect(fun).toHaveBeenCalledTimes(1);
    });
    test("both immediate = true and immediate = false ensure timer null upon run of internal function later()", () => {
        const {result : immediateResult} = renderHook(() => useDebounce(fun, 100));
        const {result : laterResult} = renderHook(() => useDebounce(fun, 100, false));
        immediateResult.current.deBouncedFn();
        laterResult.current.deBouncedFn();
        expect(immediateResult.current.timer.current).toBeTruthy();
        expect(laterResult.current.timer.current).toBeTruthy();
        jest.advanceTimersByTime(101);
        expect(immediateResult.current.timer.current).toBeFalsy();
        expect(laterResult.current.timer.current).toBeFalsy();
    });
    test("deBouncedFn called only once since lenient = false", () => {
        const {result, rerender} = renderHook(() => useDebounce(fun, 100));
        const deBouncedFn = result.current.deBouncedFn;
        deBouncedFn();
        expect(fun).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(50);
        deBouncedFn();
        expect(fun).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(50);
        deBouncedFn();
        expect(fun).toHaveBeenCalledTimes(1);
    });
    test("deBouncedFn called three times for lenient = true, i.e. does not penalize repeated calls and only throttles to ensure distance between last function run and current function run", () => {
        const {result, rerender} = renderHook(() => useDebounce(fun, 100, true, true));
        const deBouncedFn = result.current.deBouncedFn;
        deBouncedFn();
        expect(fun).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(51);
        deBouncedFn();
        expect(fun).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(51);
        deBouncedFn();
        expect(fun).toHaveBeenCalledTimes(2);
        jest.advanceTimersByTime(51);
        deBouncedFn();
        expect(fun).toHaveBeenCalledTimes(2);
        jest.advanceTimersByTime(51);
        deBouncedFn();
        expect(fun).toHaveBeenCalledTimes(3);
    });
});