/**
 * Returns a value after a specified delay.
 * Useful for deblaying fast-changing values like search inputs to avoid spammijg the database.
 *
 * @param value - The input value.
 * @param delay - Delay in milliseconds.
 * @returns The delayed value.
 * 
 * @author Isak Thörnqvist
 * @version 1.0.0
 */
import { useEffect, useState } from "react"

export function useDelay<T>(value: T, delay: number) {
    const [delayValue, setDelayValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }

    }, [ value, delay ])

    return delayValue
}

