import { useAppSelector, useModalContext } from "@/core/hooks";
import { FetchStatus, Role } from "@/core/types";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const GarageManagePage = () => {
    const navigate = useNavigate();
    const { open } = useModalContext();
    const user = useAppSelector((state) => state.user.value);
    const status = useAppSelector((state) => state.user.status);

    useEffect(() => {
        if (status === FetchStatus.Fetching || status === FetchStatus.None)
            return;

        if (
            !user ||
            (user.role !== Role.GarageOwner && user.role !== Role.Staff)
        ) {
            navigate("/");
        }

        if (!user) {
            open("signIn");
        }
    }, [navigate, open, user, status]);

    useEffect(() => {
        document.title = "Quản lý Garage"
    }, [])

    return (
        <div
            id="garageManagement"
            className="h-[calc(100%-5rem)] overflow-auto"
        >
            <Outlet />
        </div>
    );
};

export default GarageManagePage;
