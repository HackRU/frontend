import {useEffect, useRef} from "react";

/**
 * returns a debounced version of fn which is throttled based on @param wait
 * 
 * @param {Function} fn the function to be debounced
 * @param {number} wait amount of time in milliseconds to wait before can call function again
 * @param {boolean} immediate whether to immediately call fn when triggered (true), or to wait to call fn (false)
 * @param {boolean} lenient default is false
 * @param {any[]} dependencies optional list of dependencies that, when changed, will
 */
const useDebounce = (fn, wait, immediate = true, lenient = false, dependencies = []) => {
    let timer = useRef(null);
    useEffect(() => {
        return () => {
            timer.current && clearTimeout(timer.current);
            timer.current = null;
        };
    }, dependencies);
    /**
     * A throttled version of the function passed in from useDebounce
     * 
     * @param  {...any} args the variable amount of arguments that will be passed to the debounced function once it is run
     */
    const deBouncedFn = (...args) => {
        const runNow = !timer.current && immediate;
        const later = () => {
            timer.current = null;
            !runNow && fn(...args);
        };
        if (!lenient) {
            timer.current && clearTimeout(timer.current);
            timer.current = setTimeout(later, wait);
        } else {
            !timer.current && (timer.current = setTimeout(later, wait));
        }
        runNow && fn(...args);
    };

    return {
        timer,
        deBouncedFn,
    };
};

export default useDebounce;