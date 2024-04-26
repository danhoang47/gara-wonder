import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    User,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBarsProgress,
    faChartLine,
    faEllipsisVertical,
    faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/core/hooks";

const Sidebar: React.FC = () => {
    const [activePage, setActivePage] = useState("");
    const user = useAppSelector((state) => state.user);
    const location = useLocation();
    const [isOpen, setOpen] = useState<boolean>(false);

    useEffect(() => {
        setActivePage(location.pathname);
    }, [location.pathname]);

    return (
        <div className="sidebar">
            <div className="sidebar_logo cursor-pointer">
                <Link to="/">
                    <p>GarageWonder</p>
                </Link>
            </div>

            <div className="sidebar_box">
                <div className="sidebar_element">
                    <Link
                        to="/admin/dashboard"
                        className={
                            activePage === "/admin/dashboard" ? "active" : ""
                        }
                        onClick={() => setActivePage("dashboard")}
                    >
                        <FontAwesomeIcon icon={faTableColumns} /> Tổng quát
                    </Link>
                    <Link
                        to="/admin/garage-management"
                        className={
                            activePage === "/admin/garage-management"
                                ? "active"
                                : ""
                        }
                        onClick={() => setActivePage("garage-management")}
                    >
                        <FontAwesomeIcon icon={faBarsProgress} /> Quản lí garage
                    </Link>
                    <Link
                        to="/admin/report"
                        className={
                            activePage === "/admin/report" ? "active" : ""
                        }
                        onClick={() => setActivePage("report")}
                    >
                        <FontAwesomeIcon icon={faChartLine} /> Báo cáo từ người
                        dùng
                    </Link>
                </div>

                <div className=" border-2 flex items-center  justify-between p-3 rounded-lg">
                    <User
                        name={user.value?.displayName}
                        description="Admin"
                        avatarProps={{
                            src: user.value?.photoURL,
                        }}
                    />
                    <Popover
                        disableAnimation
                        placement="bottom-end"
                        triggerType="menu"
                        isOpen={isOpen}
                        onOpenChange={(open) => setOpen(open)}
                    >
                        <PopoverTrigger>
                            <FontAwesomeIcon
                                icon={faEllipsisVertical}
                                size="lg"
                                className="cursor-pointer text-default-400"
                            />
                        </PopoverTrigger>
                        <PopoverContent
                            aria-label="User menu"
                            className="px-0 py-3"
                        >
                            <div>Đăng xuất</div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
