import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot, faList } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

import { Garage } from "@/core/types";
import { useModalContext } from "@/core/hooks";
import { useGarages } from "../../hooks";
import MapViewGarages from "./MapViewGarages";
import GridViewGarages from "./GridViewGarages";
import useViewMode from "../../hooks/useViewMode";

export type ViewModeGaragesProps = {
    isLoading: boolean;
    error?: any;
    garages?: Garage[]
}

function Garages() {
    const [viewMode, onViewModeChange] = useViewMode();
    const { open } = useModalContext();
    const { isLoading, error, garages } = useGarages();
    const changeViewModeButtonLabel = viewMode === "grid" ? "Map view" : "List view"
    const changeViewModeButtonIcon = viewMode === "grid" ?  faMapLocationDot : faList;

    const requestLocationPermission = () => {
        navigator.permissions.query({ name: "geolocation" }).then(status => {
            const { state } = status;

            if (state !== "granted") {
                open("location")
                navigator.geolocation.getCurrentPosition(position => {
                    // TODO: set position to global context
                })
            }
        })
    }

    const renderGarages = () => {
        const props: ViewModeGaragesProps = {
            isLoading,
            error,
            garages
        }

        switch(viewMode) {
            case "grid": return <GridViewGarages {...props}/>
            case "map": return <MapViewGarages {...props}/>
            default: 
                throw new Error("Invalid View Mode")
        }
    }

    useEffect(() => {
        requestLocationPermission()
    }, [])

    return (
        <div className={clsx(viewMode === "grid" ? "grid grid-cols-4 gap-3" : "-mx-10", "grow")}>
            {renderGarages()}
            <Button 
                className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black"
                endContent={<FontAwesomeIcon icon={changeViewModeButtonIcon} className="text-white"/>}
                onPress={() => onViewModeChange(viewMode === "grid" ? "map" : "grid")}
                disableAnimation
            >
                <span className="font-medium text-white">{changeViewModeButtonLabel}</span>
            </Button>
        </div>
    );
}

export default Garages;
