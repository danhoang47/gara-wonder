import Sidebar from "./components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import NavAdmin from "./components/NavAdmin";
import { useEffect } from "react";
import { useAppSelector, useAuthLoading, useModalContext } from "@/core/hooks";
import { FetchStatus, Role } from "@/core/types";

const AdminLayout = () => {
    // const navigate = useNavigate();
    // const { open } = useModalContext();
    // const user = useAppSelector((state) => state.user.value);
    // const status = useAppSelector((state) => state.user.status);
    // useAuthLoading("admin");
    // useEffect(() => {
    //     if (status === FetchStatus.Fetching || status === FetchStatus.None)
    //         return;

    //     if (!user || user.role !== Role.Admin) {
    //         navigate("/");
    //     }
    //     if (!user) {
    //         open("signIn");
    //     }
    // }, [navigate, open, user, status]);

    useEffect(() => {
        document.title = "Quản lý Garage";
    }, []);
    return (
        <div style={{ width: "100%", display: "flex" }}>
            <Sidebar />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <NavAdmin />
                <div style={{ padding: "10px 10px 10px 250px" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
