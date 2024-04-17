import GarageList from "@/admin/components/GarageList";
import Statistical from "@/admin/components/Statistical";
import TrackSale from "@/admin/components/TrackSale";
import AdminLayout from "@/admin/layout";
import React from "react";

const DashBoard: React.FC = () => {
    return (
        <AdminLayout>
            <Statistical />
            <div>
                <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
                    Theo dõi doanh số
                </h2>
                <div style={{ display: "flex", gap: "10px" }}>
                    <TrackSale />
                    <TrackSale />
                </div>
            </div>
            <div className="">
                <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
                    Danh sách Garage
                </h2>
                <GarageList />
            </div>
        </AdminLayout>
    );
};

export default DashBoard;
