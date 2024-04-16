import { Tab, Tabs } from "@nextui-org/react";
import clsx from "clsx";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
                    title={title}
                    className={clsx(currentPath === path && "shadow")}
                />
            ))}
        </Tabs>
    );
}

export default RegionTabs;
