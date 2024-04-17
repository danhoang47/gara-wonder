import React, { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import NavAdmin from "../components/NavAdmin";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
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
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
