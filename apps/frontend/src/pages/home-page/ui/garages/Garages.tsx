import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot, faList } from "@fortawesome/free-solid-svg-icons";

import { FetchStatus } from "@/core/types";
import { useModalContext } from "@/core/hooks";
import { useGarages } from "../../hooks";
import MapViewGarages from "./MapViewGarages";
import GridViewGarages from "./GridViewGarages";
import useViewMode from "../../hooks/useViewMode";

import "./Garages.styles.scss";
import { WithOwnerGarage } from "@/api/garages/getGarages";

export type ViewModeGaragesProps = {
    isLoading: boolean;
    isReload: boolean;
    error?: unknown;
    garages?: WithOwnerGarage[];
    onNext: () => void;
    onUpdateGarage: (garage: WithOwnerGarage) => void;
};

function Garages() {
    const [viewMode, onViewModeChange] = useViewMode();
    const { open } = useModalContext();
    const { garages, fetchingStatus, isReload, onNext, onUpdateGarage } =
        useGarages(viewMode);
    const changeViewModeButtonLabel =
        viewMode === "grid" ? "Hiện bản đồ" : "Hiện danh sách";
    const changeViewModeButtonIcon =
        viewMode === "grid" ? faMapLocationDot : faList;

    const requestLocationPermission = () => {
        navigator.permissions.query({ name: "geolocation" }).then((status) => {
            const { state } = status;

            if (state !== "granted") {
                open("location");
                navigator.geolocation.getCurrentPosition((position) => {
                    // TODO: set position to global context
                });
            }
        });
    };

    const renderGarages = () => {
        const props: ViewModeGaragesProps = {
            isLoading: fetchingStatus === FetchStatus.Fetching,
            isReload,
            garages,
            onNext,
            onUpdateGarage,
        };

        switch (viewMode) {
            case "grid":
                return <GridViewGarages {...props} />;
            case "map":
                return <MapViewGarages {...props} />;
            default:
                throw new Error("Invalid View Mode");
        }
    };

    useEffect(() => {
        document.title = "Tìm kiếm garage - Garawonder"
        requestLocationPermission();
    }, []);

    return (
        <div className="garages flex-1 px-10">
            {renderGarages()}
            <Button
                className="changeViewModeButton fixed left-1/2 -translate-x-1/2 bg-black z-10 shadow-sm p-6"
                endContent={
                    <FontAwesomeIcon
                        icon={changeViewModeButtonIcon}
                        className="text-white"
                    />
                }
                onPress={() =>
                    onViewModeChange(viewMode === "grid" ? "map" : "grid")
                }
                variant="solid"
                radius="full"
            >
                <span className="font-medium text-white">
                    {changeViewModeButtonLabel}
                </span>
            </Button>
        </div>
    );
}

export default Garages;
