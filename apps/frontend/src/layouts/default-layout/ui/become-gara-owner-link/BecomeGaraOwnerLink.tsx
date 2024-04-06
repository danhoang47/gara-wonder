import { Link } from "@nextui-org/react";

import { useAppSelector, useModalContext } from "@/core/hooks";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

function BecomeGaraOwnerLink() {
    const user = useAppSelector((state) => state.user.value);
    const { open } = useModalContext();

    const location = useLocation();
    const currentPath = useMemo(
        () => location.pathname.split("/")[1],
        [location],
    );

    return (
        <Link
            href={
                currentPath === "products"
                    ? "/supplier-registration"
                    : "/garage-registration"
            }
            color="foreground"
            underline="hover"
            onClick={(e) => {
                if (!user) {
                    open("signIn");
                    e.preventDefault();
                    return;
                }
            }}
        >
            <p className="font-medium">
                Trở thành{" "}
                {currentPath === "products" ? "nhà cung cấp" : "chủ Garage"}
            </p>
        </Link>
    );
}

export default BecomeGaraOwnerLink;
