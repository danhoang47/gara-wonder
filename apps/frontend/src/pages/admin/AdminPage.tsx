import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import NavAdmin from "./components/NavAdmin";

const AdminLayout = () => {
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
