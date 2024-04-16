import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import constants from "./constants";
import "./MobileNavigation.styles.scss";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { Link } from "@nextui-org/react";

function MobileNavigation() {
    const location = useLocation();

    return (
        <nav className="mobileNavigation sticky bottom-0 h-16 border-t bg-background px-10 justify-center gap-6 py-2 z-20">
            {constants.map((item) => (
                <Link
                    className={clsx(
                        "text-default-500 flex flex-col items-center gap-1 justify-center opacity-60 cursor-pointer",
                        location.pathname.includes(item.path) && "opacity-100",
                    )}
                    href={item.path}
                    key={item.key}
                >
                    <div>
                        <FontAwesomeIcon
                            icon={item.icon}
                            className={clsx(
                                location.pathname.includes(item.path) &&
                                    "text-primary",
                            )}
                        />
                    </div>
                    <p
                        className={clsx(
                            "text-xs text-center font-medium",
                            location.pathname.includes(item.path) &&
                                "text-primary",
                        )}
                    >
                        {item.title}
                    </p>
                </Link>
            ))}
        </nav>
    );
}

export default MobileNavigation;
