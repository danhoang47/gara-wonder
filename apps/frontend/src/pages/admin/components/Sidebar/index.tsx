import { useAppSelector, useModalContext } from "@/core/hooks";
import getUserProfileMenu from "@/layouts/default-layout/ui/user-profile-menu/getUserProfileMenu";
import {
    faBarsProgress,
    faChartLine,
    faEllipsisVertical,
    faTableColumns,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    User,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";

const Sidebar: React.FC = () => {
    const [activePage, setActivePage] = useState("");
    const user = useAppSelector((state) => state.user.value);
    const location = useLocation();
    const [isOpen, setOpen] = useState<boolean>(false);
    const { open } = useModalContext();

    const profileMenuOptions = getUserProfileMenu(
        Boolean(user),
        () => {
            open("signIn");
            setOpen(false);
        },
        user?.garageId,
        user?.supplierId,
        user?.role === 6,
    );

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
                        name={user?.displayName}
                        description="Admin"
                        avatarProps={{
                            src: user?.photoURL,
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
                            {profileMenuOptions.map((section, index) => (
                                <div key={index} className="w-full">
                                    {section.options.map(
                                        ({ component, key, title }) => (
                                            <div
                                                key={key}
                                                aria-label={title}
                                                onClick={() => setOpen(false)}
                                                className="hover:bg-default-100 cursor-pointer min-w-44"
                                            >
                                                {component}
                                            </div>
                                        ),
                                    )}
                                </div>
                            ))}
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
