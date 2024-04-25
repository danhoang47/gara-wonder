import React from "react";
import TrackSale from "../components/TrackSale";
import Statistical from "../components/Statistical";
import GarageList from "../components/GarageList";

const DashBoard: React.FC = () => {
    return (
        <>
            <Statistical />
            <div className="pt-10">
                <h2 className="text-2xl font-semibold">Theo dõi doanh số</h2>
                <div style={{}}>
                    <TrackSale />
                </div>
            </div>
            <div className="">
                <h2 className="text-2xl font-semibold">
                    Danh sách Garage đang chờ chấp nhận
                </h2>
                <GarageList />
            </div>
        </>
    );
};

export default DashBoard;
