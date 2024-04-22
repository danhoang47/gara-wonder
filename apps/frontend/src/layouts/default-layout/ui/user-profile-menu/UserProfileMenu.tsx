import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import getUserProfileMenu from "./getUserProfileMenu";
import { useAppSelector, useModalContext } from "@/core/hooks";

function UserProfileMenu() {
    const [isOpen, setOpen] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user.value);
    const { open } = useModalContext();

    const profileMenuOptions = getUserProfileMenu(
        Boolean(user),
        () => {
            open("signIn");
            setOpen(false);
        },
        user?.garageId,
        user?.supplierId,
    );

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
                    {user ? (
                        <div className="w-[28px] h-[28px] rounded-full overflow-hidden">
                            <img
                                src={user.photoURL}
                                className="w-full h-full"
                                alt="User's profile picture"
                            />
                        </div>
                    ) : (
                        <FontAwesomeIcon icon={faCircleUser} size="2x" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent aria-label="User menu" className="px-0 py-3">
                {profileMenuOptions.map((section, index) => (
                    <div key={index} className="w-full">
                        {section.options.map(({ component, key, title }) => (
                            <div
                                key={key}
                                aria-label={title}
                                onClick={() => setOpen(false)}
                                className="hover:bg-default-100 cursor-pointer min-w-44"
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
