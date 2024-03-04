import { Outlet } from "react-router-dom";

const GarageManagePage = () => {
    return (
        <div className="container mx-auto pb-10">
            <Outlet />
        </div>
    );
};

export default GarageManagePage;
