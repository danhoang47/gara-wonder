import Lottie from "react-lottie";
import animation from "@/assets/car_running.json";
import { createPortal } from "react-dom";
import { useEffect } from "react";

function FullPageLoad() {
    useEffect(() => {
        document.documentElement.classList.add("overflow-hidden");
        return () =>
            document.documentElement.classList.remove("overflow-hidden");
    }, []);

    return (
        <>
            {createPortal(
                <div
                    className="z-50 bg-background backdrop-blur-sm w-screen h-screen fixed inset-0"
                    aria-hidden="true"
                >
                    <div className="absolute inset-1/2 block w-40 h-40 -translate-x-1/2 -translate-y-1/2">
                        <Lottie
                            options={{
                                animationData: animation,
                                loop: true,
                                autoplay: true,
                                rendererSettings: {
                                    preserveAspectRatio: "xMidYMid slice",
                                },
                            }}
                        />
                    </div>
                </div>,
                document.body,
            )}
        </>
    );
}

export default FullPageLoad;
