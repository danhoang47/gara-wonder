import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import clsx from "clsx";

import "./RegionTabs.styles.scss"

const paths = [
    {
        path: "garages",
        title: "Garage sửa xe",
    },
    {
        path: "products",
        title: "Linh kiện ô tô",
    },
];

function RegionTabs() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = useMemo(
        () => location.pathname.split("/")[1],
        [location],
    );

    return (
        <Tabs
            aria-label="Region tabs"
            radius="full"
            color="primary"
            defaultSelectedKey={currentPath}
            onSelectionChange={(path) => {
                if (typeof path === "string") {
                    navigate(path);
                }
            }}
            className="regionTabs"
        >
            {paths.map(({ path, title }) => (
                <Tab
                    key={path}
                    title={
                        <div className="flex items-center justify-center gap-2">
                            <p className="regionTabTitle">{title}</p>
                            <span
                                className={clsx("regionTabIcon",
                                    path === "garages"
                                        ? "material-symbols-outlined"
                                        : "material-symbols-outlined",
                                )}
                            >
                                {path === "garages" ? "garage_home" : "storefront"}
                            </span>
                        </div>
                    }
                    className={clsx(currentPath === path && "shadow")}
                />
            ))}
        </Tabs>
    );
}

export default RegionTabs;
