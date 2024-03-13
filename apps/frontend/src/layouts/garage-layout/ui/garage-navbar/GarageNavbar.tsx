import { Link, useLocation } from "react-router-dom";
import { navList } from "../../constraints";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { useMemo } from "react";
import clsx from "clsx";
function GarageNavbar() {
    const location = useLocation();
    console.log(location.pathname);
    const indicateRoute = useMemo(() => {
        const list = navList.filter((el) => {
            if (location.pathname.includes(el.link) && el.link !== "") {
                return el.title as string;
            }
        });
        if (list[0]?.link) return list[0]?.link;
        return "";
    }, [location]);

    return (
        <div className="flex items-center justify-center gap-6">
            {navList.map((nav, index) => {
                if (!nav.children) {
                    return (
                        <Link
                            className={clsx(
                                "font-medium text-small cursor-pointer hover:text-default-500",
                                indicateRoute !== nav.link && "text-default-400"
                            )}
                            key={index}
                            to={nav.link}
                            relative="path"
                        >
                            {nav.title}
                        </Link>
                    );
                }
                return (
                    <div
                        className="cursor-pointer text-default-400"
                        key={index}
                    >
                        <Dropdown classNames={{ content: "min-w-[7.5rem]" }}>
                            <DropdownTrigger>
                                <div
                                    className="font-medium text-small cursor-pointer text-default-400 hover:text-default-600 "
                                    key={index}
                                >
                                    {nav.title}
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu>
                                {nav.children.map((sub, index) => (
                                    <DropdownItem key={index}>
                                        <Link
                                            className="font-semibold cursor-pointer text-default-400 hover:text-default-600 "
                                            to={nav.link}
                                            relative="path"
                                        >
                                            {sub.title}
                                        </Link>
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            })}
        </div>
    );
}

export default GarageNavbar;
