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

