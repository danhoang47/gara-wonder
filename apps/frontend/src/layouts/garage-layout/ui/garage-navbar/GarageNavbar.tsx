import { Link, useLocation } from "react-router-dom";
import { navList } from "../../constraints";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
function GarageNavbar() {
    const location = useLocation();
    console.log(location);

    return (
        <div className="flex items-center justify-between min-w-[40rem]">
            {navList.map((nav, index) => {
                if (!nav.children) {
                    return (
                        <Link
                            className="font-semibold cursor-pointer text-default-400 hover:text-default-500 "
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
                        className="font-semibold cursor-pointer text-default-400"
                        key={index}
                    >
                        <Dropdown classNames={{ content: "min-w-[7.5rem]" }}>
                            <DropdownTrigger>
                                <div
                                    className="font-semibold cursor-pointer text-default-400 hover:text-default-600 "
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
