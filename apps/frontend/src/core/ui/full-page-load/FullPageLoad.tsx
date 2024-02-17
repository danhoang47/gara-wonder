import { CircularProgress } from "@nextui-org/react";
import { createPortal } from "react-dom";

function FullPageLoad() {
    return (
        <>
            {createPortal(
                <div
                    className="z-50 bg-overlay/50 backdrop-blur-sm w-screen h-screen fixed inset-0"
                    aria-hidden="true"
                >
                    <CircularProgress 
                        classNames={{
                            base: "absolute inset-1/2",
                            track: "stroke-default"
                        }}
                    />
                </div>,
                document.body,
            )}
        </>
    );
}

export default FullPageLoad;
