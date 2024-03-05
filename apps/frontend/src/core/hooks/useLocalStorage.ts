import { useEffect } from "react";

export default function useLocalStorage<T>(
    key: string, 
    value: T,
    onLoad: (item: T | undefined) => void,
) {
    useEffect(() => {
        const item = localStorage.getItem(key)

        onLoad(item ? JSON.parse(item) : undefined)
    }, [key])

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])
}