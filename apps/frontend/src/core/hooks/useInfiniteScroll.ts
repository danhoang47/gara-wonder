import { useEffect, useRef } from "react";

export default function useInfiniteScroll(cb: () => void, options: IntersectionObserverInit = {}) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ref?.current) return;

        const { current: element } = ref

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cb()
                }
            })
        }

        const observer = new IntersectionObserver(handleIntersect, options)
        observer.observe(element)

        return () => observer.unobserve(element)
    }, [ref, cb, options])

    return ref
}