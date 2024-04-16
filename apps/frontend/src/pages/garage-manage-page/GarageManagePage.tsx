import { Outlet } from "react-router-dom";

const GarageManagePage = () => {
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
