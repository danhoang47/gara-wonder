import { Link, useLocation, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
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
                                indicateRoute !== nav.link &&
                                    "text-default-400",
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
                        <Dropdown
                            classNames={{ content: "min-w-[7.5rem] p-0 py-1" }}
                        >
                            <DropdownTrigger>
                                <div
                                    className="font-medium text-small cursor-pointer text-default-400 hover:text-default-600 "
                                    key={index}
                                >
                                    {nav.title}
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu
                                classNames={{
                                    base: "px-0 ",
                                    list: "p-0 !rounded-none",
                                    emptyContent: "rounded-none",
                                }}
                                itemClasses={{
                                    base: "rounded-none hover:bg-default-100",
                                    wrapper: "hover:bg-default-100"
                                }}
                            >
                                {nav.children.map((sub, index) => (
                                    <DropdownItem
                                        key={index}
                                        onClick={() =>
                                            navigate(`./${sub.link}`)
                                        }
                                    >
                                        <p className="py-1 px-2 text-small cursor-pointer hover:text-default-600 min-w-40">
                                            {sub.title}
                                        </p>
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
