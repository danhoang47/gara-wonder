import { useAppSelector, useModalContext } from "@/core/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FetchStatus } from "@/core/types";

export default function AccountPage() {
    const navigate = useNavigate();
    const { open } = useModalContext();
    const user = useAppSelector((state) => state.user.value);
    const status = useAppSelector((state) => state.user.status);

    useEffect(() => {
        if (status === FetchStatus.Fetching || status === FetchStatus.None)
            return;

        if (!user) {
            navigate("/");
            open("signIn");
        }
    }, [navigate, open, user, status]);
    return (
        <div className="relative">
            <Outlet />
        </div>
    );
}
