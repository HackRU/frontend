/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { renderHook, cleanup } from "@testing-library/react-hooks";
import { useCancellablePromise, useCancellablePromises, makeCancellablePromise } from "./CancellablePromise";

describe("makeCancellablePromise", () => {
    test("returns wrapping object", () => {
        const p = new Promise((resolve, _reject) => {
            resolve(true);
        });
        const obj = makeCancellablePromise(p, async () => {}, async () => {});
        expect("cancel" in obj && typeof obj.cancel === "function").toBe(true);
        expect(obj.promiseStatus.isCancelled === false && obj.promiseStatus.isFinished === false).toBe(true);
        expect(obj.promise).toBe(p);
    });

    test("runs the successFn", (done) => {
        const p = new Promise((resolve, _reject) => {
            resolve(true);
        });
        const fun = jest.fn();
        const obj = makeCancellablePromise(p, async () => {
            fun();
            expect(fun).toHaveBeenCalledTimes(1);
            done();
        }, async () => {});
    });

    test("runs the failFn", (done) => {
        const p = new Promise((_resolve, reject) => reject(true));
        const fun = jest.fn();
        const obj = makeCancellablePromise(p, async () => {}, async () => {
            fun();
            expect(fun).toHaveBeenCalledTimes(1);
            done();
        });
    });

    test("promiseStatus is cancelled", async () => {
        const p = new Promise((resolve, _reject) => resolve(true));
        const obj = makeCancellablePromise(p, async () => {}, async () => {});
        obj.cancel();
        expect(obj.promiseStatus.isCancelled).toBe(true);
    });

    test("promiseStatus is finished", (done) => {
        const p = new Promise((resolve, _reject) => resolve(true));
        const obj = makeCancellablePromise(p, async () => {
            expect(obj.promiseStatus.isFinished).toBe(true);
            done();
        }, async () => {});
    });
});

describe("useCancellablePromises", () => {
    test("intially empty cancellablePromises list", () => {
        const {result, rerender} = renderHook(() => useCancellablePromises([]));
        expect(result.current.promises.current.length).toBe(0);
    });

    test("pushed three long running promises into the promises list", async () => {
        const {result, rerender} = renderHook(() => useCancellablePromises([]));
        await result.current.cancellablePromises(new Promise((resolve, reject) => setTimeout(() => resolve(true), 10000)), async () => {}, async () => {});
        await result.current.cancellablePromises(new Promise((resolve, reject) => setTimeout(() => resolve(true), 10000)), async () => {}, async () => {});
        await result.current.cancellablePromises(new Promise((resolve, reject) => setTimeout(() => resolve(true), 10000)), async () => {}, async () => {});
        expect(result.current.promises.current.length).toBe(3);
    });

    test("should only have one promise in list because prior 2 finished and filtered out", async () => {
        const {result, rerender} = renderHook(() => useCancellablePromises([]));
        await result.current.cancellablePromises(new Promise((resolve, reject) => resolve(true)), async () => {}, async () => {});
        await result.current.cancellablePromises(new Promise((resolve, reject) => resolve(true)), async () => {}, async () => {});
        await result.current.cancellablePromises(new Promise((resolve, reject) => resolve(true)), async () => {}, async () => {});
        expect(result.current.promises.current.length).toBe(1);
    });

    test("unmounting should cancel all currently expectent promises", async () => {
        const {result, rerender} = renderHook(() => useCancellablePromises([]));
        await result.current.cancellablePromises(new Promise((resolve, reject) => {}), async () => {}, async () => {});
        await result.current.cancellablePromises(new Promise((resolve, reject) => {}), async () => {}, async () => {});
        await result.current.cancellablePromises(new Promise((resolve, reject) => {}), async () => {}, async () => {});
        const promiseList = result.current.promises.current;
        await cleanup();
        expect(promiseList.length === 3 && promiseList.every((p) => p.promiseStatus.isCancelled)).toBe(true);
    });

    test("unmounting should empty the promise list", async () => {
        const {result, rerender} = renderHook(() => useCancellablePromises([]));
        await result.current.cancellablePromises(new Promise((resolve, reject) => {}), async () => {}, async () => {});
        await result.current.cancellablePromises(new Promise((resolve, reject) => {}), async () => {}, async () => {});
        await result.current.cancellablePromises(new Promise((resolve, reject) => {}), async () => {}, async () => {});
        await cleanup();
        expect(result.current.promises.current.length).toBe(0);
    });
});

describe("useCancellablePromise", () => {
    test("runs the successFn", async (done) => {
        const fun = jest.fn();
        const {result, rerender} = renderHook(() => useCancellablePromise([]));
        await result.current.cancellablePromise(new Promise((resolve, _reject) => resolve(true)), async () => {
            fun();
            expect(fun).toHaveBeenCalledTimes(1);
            done();
        }, async () => {});
    });
    test("runs the failFn", async (done) => {
        const fun = jest.fn();
        const {result, rerender} = renderHook(() => useCancellablePromise([]));
        await result.current.cancellablePromise(new Promise((_resolve, reject) => reject(true)), async () => {}, async () => {
            fun();
            expect(fun).toHaveBeenCalledTimes(1);
            done();
        });
    });
    test("calling a new promise while the old one is running replaces the promise ref", async () => {
        const {result, rerender} = renderHook(() => useCancellablePromise([]));
        await result.current.cancellablePromise(new Promise((resolve, reject) => {}), async () => {}, async () => {});
        const promiseA = result.current.lastPromise.current;
        await result.current.cancellablePromise(new Promise((resolve, reject) => {}), async () => {}, async () => {});
        expect(promiseA === result.current.lastPromise.current).toBe(false);
    });
    test("unmounting while the promise is running replaces the promise ref", async () => {
        const {result, rerender} = renderHook(() => useCancellablePromise([]));
        await result.current.cancellablePromise(new Promise((resolve, reject) => {}), async () => {}, async () => {});
        const promiseA = result.current.lastPromise.current;
        await cleanup();
        expect(promiseA === result.current.lastPromise.current).toBe(false);
        expect(result.current.lastPromise.current).toBe(null);
    });
});