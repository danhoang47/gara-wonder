import { Outlet } from "react-router-dom";

const GarageManagePage = () => {
    return (
        <div
            id="garageManagement"
            className="h-[calc(100%-5rem)] overflow-hidden"
        >
            <Outlet />
        </div>
    );
};

export default GarageManagePage;
