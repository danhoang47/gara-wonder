import { useRef } from "react";

export default function usePrevious<T>(value: T) {
    const ref = useRef<Record<"prev" | "value", T | undefined>>({
        prev: undefined,
        value: value
    });

    const current = ref.current.value

    if (value !== current) {
        ref.current = {
            value: value,
            prev: current
        }
    }

    return ref.current.prev
}