import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import userProfileMenuSections from "./constant";

function UserProfileMenu() {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <Popover
            disableAnimation
            placement="bottom-end"
            triggerType="menu"
            isOpen={isOpen}
            onOpenChange={(open) => setOpen(open)}
        >
            <PopoverTrigger>
                <Button
                    radius="full"
                    variant="bordered"
                    className="px-1 min-w-0 border"
                    disableAnimation
                >
                    <FontAwesomeIcon icon={faBars} className="px-2" />
                    <FontAwesomeIcon icon={faCircleUser} size="2x" />
                </Button>
            </PopoverTrigger>
            <PopoverContent aria-label="User menu" className="px-0 py-3">
                {userProfileMenuSections.map((section, index) => (
                    <div key={index} className="w-full">
                        {section.options.map(({ component, key, title }) => (
                            <div
                                key={key}
                                aria-label={title}
                                className="py-2 px-3 hover:bg-default-300 cursor-pointer"
                                onClick={() => setOpen(false)}
                            >
                                {component}
                            </div>
                        ))}
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    );
}

export default UserProfileMenu;
