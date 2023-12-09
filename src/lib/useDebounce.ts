import React from "react";

/*
    * useDebounce hook
    *
    * Usage:
    *    const debouncedValue = useDebounce(value, 500);
    *
    *    useEffect(() => {
    *      console.log(debouncedValue);
    *    }, [debouncedValue]);
    * 
    * @param {string} value: value to be debounced
    * @param {number} delay: delay in milliseconds
*/
export function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;

}