import { useRef, useEffect } from "react";

/**
 * @param {any[]} dependencies optional list of dependencies that should trigger a promise cancellation
 */
const useCancellablePromise = (dependencies = []) => {

    const lastPromise = useRef(null);

    useEffect(() => {
        return () => {
            lastPromise.current = null;
        };
    }, dependencies);

    /**
     * @param {Promise} curPromise the promise that may take some time to resolve/reject
     * @param {(res: any) => Promise<void>} successFn the function to utilize when the promise has successfully resolved
     * @param {(err: any) => Promise<void>} failFn the function to utilize when the promise has been rejected
     * @return {Promise<void>}
     */
    const cancellablePromise = async (curPromise, successFn, failFn) => {
        lastPromise.current = curPromise;
        curPromise
            .then(async (res) => {
                lastPromise.current === curPromise && successFn(res);
            })
            .catch(async (err) => {
                lastPromise.current === curPromise && failFn(err);
            });
    };
    return {
        lastPromise,
        cancellablePromise,
    };
};

/**
 * 
 * @param {Promise} p the promise that may take some time to resolve/reject
 * @param {(res: any) => Promise<void>} successFn the function to utilize when the promise has successfully resolved
 * @param {(err: any) => Promise<void>} failFn the function to utilize when the promise has been rejected
 * @returns {{
 *  cancel: () => void,
 *  promiseStatus : {
 *      isCancelled: boolean,
 *      isFinished: boolean, 
 *  },
 *  promise: Promise
 * }} an object containing the cancel function to cancel the promise as well as the status of the promise and the promise itself
 */
const makeCancellablePromise = (p, successFn, failFn) => {
    
    const promiseStatus = {
        isCancelled: false,
        isFinished: false,
    };

    p
        .then(async (res) => {
            if (!promiseStatus.isCancelled) {
                promiseStatus.isFinished = true;
                successFn(res);
            }
        })
        .catch(async (err) => {
            if (!promiseStatus.isCancelled) {
                promiseStatus.isFinished = true;
                failFn(err);
            }
        });

    return {
        cancel : () => {
            promiseStatus.isCancelled = true;
        },
        promiseStatus,
        promise : p,
    };
};

/**
 * 
 * @param {any[]} dependencies optional list of dependencies that should trigger all promises to cancel
 */
const useCancellablePromises = (dependencies = []) => {

    const promises = useRef([]);

    useEffect(() => {
        return () => {
            promises.current.forEach((promiseObj) => promiseObj.cancel());
            promises.current = [];
        };
    }, dependencies);

    /**
     * Will push the promise into a list of promises to be resolved/rejected
     * 
     * @param {Promise<any>} curPromise the promise that may take some time to resolve/reject
     * @param {(res: any) => Promise<void>} successFn the function to utilize when the promise resolves
     * @param {(err: any) => Promise<void>} failFn the function to utilize when the promise rejects
     * 
     * @returns {Promise<void>}
     */
    const cancellablePromises = async (curPromise, successFn, failFn) => {
        promises.current = promises.current.filter( entry => !entry.promiseStatus.isCancelled && !entry.promiseStatus.isFinished);
        promises.current.push(makeCancellablePromise(curPromise, successFn, failFn));
    };

    return {
        promises,
        cancellablePromises,
    };
};

export {useCancellablePromise, useCancellablePromises, makeCancellablePromise};