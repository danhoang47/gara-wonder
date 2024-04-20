import React from "react";
import TrackSale from "../components/TrackSale";
import Statistical from "../components/Statistical";
import GarageList from "../components/GarageList";

const DashBoard: React.FC = () => {
    return (
        <>
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
        </>
    );
};

export default DashBoard;
