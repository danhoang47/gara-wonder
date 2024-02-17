import { createPortal } from "react-dom";
import { useAppSelector } from "@/core/hooks";
import Toast from "./toast";
import { useLayoutEffect, useState } from "react";

export default function Toasts() {
    const toasts = useAppSelector((state) => state.toasts);
    const [renderedToasts, setRenderedToasts] = useState<typeof toasts>([]);

    useLayoutEffect(() => {
        const { height: viewportHeight } =
            document.documentElement.getBoundingClientRect();
        const TOAST_HEIGHT = 68;
        const toastsContainerViewableHeight = viewportHeight - 200; // header + filter (optional) + bottom offset
        const numberOfViewableToasts = Math.floor(
            toastsContainerViewableHeight / TOAST_HEIGHT,
        );
        console.log(numberOfViewableToasts);
        setRenderedToasts(toasts.slice(0, numberOfViewableToasts));
    }, [toasts]);

    return (
        <>
            {createPortal(
                <div
                    id="toasts"
                    className="absolute bottom-10 right-10 flex flex-col-reverse gap-2"
                >
                    {renderedToasts.map((toast) => (
                        <Toast key={toast.id} item={toast} />
                    ))}
                </div>,
                document.body,
            )}
        </>
    );
}
