import { useEffect, useRef } from "react";


export default function usePrevious<T>(value: T) {
    const prevRef = useRef<T>();

    useEffect(() => {

        return () => {
            prevRef.current = value
        }
    }, [value])

    return prevRef.current
}