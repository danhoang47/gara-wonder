import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import { User } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBarsProgress,
    faChartLine,
    faTableColumns,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC = () => {
    const [activePage, setActivePage] = useState("");

    const location = useLocation();

    useEffect(() => {
        setActivePage(location.pathname);
    }, [location.pathname]);

    return (
        <div className="sidebar">
            <div className="sidebar_logo">
                <p>GaraWonder</p>
            </div>

            <div className="sidebar_box">
                <div className="sidebar_element">
                    <Link
                        to="/admin/dashboard"
                        className={activePage === "/admin/dashboard" ? "active" : ""}
                        onClick={() => setActivePage("dashboard")}
                    >
                        <FontAwesomeIcon icon={faTableColumns} /> General
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/garage-management"
                        className={
                            activePage === "/admin/garage-management" ? "active" : ""
                        }
                        onClick={() => setActivePage("garage-management")}
                    >
                        <FontAwesomeIcon icon={faBarsProgress} /> Garage
                        Management
                    </Link>
                    <Link
                        to="/admin/report"
                        className={activePage === "/admin/report" ? "active" : ""}
                        onClick={() => setActivePage("report")}
                    >
                        <FontAwesomeIcon icon={faChartLine} /> Customer Report
                    </Link>
                </div>

                <div className="sidebar_user">
                    <User
                        name="Duck"
                        description="Admin"
                        avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
