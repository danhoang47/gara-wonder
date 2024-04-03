import { Map, MapEvent } from "@vis.gl/react-google-maps";
import { ViewModeGaragesProps } from "./Garages";
import GarageMarker from "../garage-marker/GarageMarker";
import { useSearchParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import GridViewGarages from "./GridViewGarages";
import { debounce } from "@/utils";

type Position = {
    lat?: string | null;
    lng?: string | null;
};

const DEFAULT_CENTER = {
    lat: 15.9895821,
    lng: 108.2419703,
};

export default function MapViewGarages(props: ViewModeGaragesProps) {
    const { garages, onUpdateGarage } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpenGridView, setOpenGridView] = useState<boolean>(false);
    const [hoveredGarageId, setHoveredGarageId] = useState<string>();
    const center: Position = {
        lat: searchParams.get("lat"),
        lng: searchParams.get("lng"),
    };
    const onCenterChange = debounce(
        (lat: number | undefined, lng: number | undefined) => {
            if (!lat || !lng) return;

            setSearchParams((prev) => {
                prev.set("lat", lat.toString());
                prev.set("lng", lng.toString());

                return prev;
            });
        }, 500
    );

    const onHoverGarageCard = (garageId: string) => {
        setHoveredGarageId(garageId);
    };

    const onHoverOutGarageCard = () => {
        setHoveredGarageId(undefined);
    };

    return (
        <div className="h-[calc(100vh-177px)] -mx-10 flex relative overflow-y-hidden">
            {isOpenGridView && (
                <div className="flex-grow basis-0 px-10 pt-10 overflow-auto">
                    <GridViewGarages
                        {...props}
                        onHoverGarageCard={onHoverGarageCard}
                        onHoverOutGarageCard={onHoverOutGarageCard}
                    />
                </div>
            )}
            <div className="flex-grow h-full sticky basis-0">
                <Button
                    className="absolute bg-default-50 left-2 top-2 z-10"
                    onPress={() => setOpenGridView((prev) => !prev)}
                    endContent={
                        <FontAwesomeIcon
                            icon={isOpenGridView ? faArrowLeft : faArrowRight}
                            size="lg"
                        />
                    }
                    isIconOnly={isOpenGridView}
                >
                    {!isOpenGridView && <span>Hiển thị danh sách</span>}
                </Button>
                <Map
                    mapId={"513c015c554b1aac"}
                    defaultCenter={{
                        lat: center.lat
                            ? Number.parseFloat(center.lat)
                            : DEFAULT_CENTER.lat,
                        lng: center.lng
                            ? Number.parseFloat(center.lng)
                            : DEFAULT_CENTER.lng,
                    }}
                    defaultZoom={8}
                    mapTypeId={"roadmap"}
                    disableDefaultUI
                    onZoomChanged={(event) => {
                        const { lat, lng } = event.detail.center;
                        onCenterChange(lat, lng);
                    }}
                    onDragend={(event: MapEvent) => {
                        const latlng = event.map.getCenter();
                        onCenterChange(latlng?.lat(), latlng?.lng());
                    }}
                >
                    {garages?.map((garage) => (
                        <GarageMarker
                            key={garage._id}
                            garage={garage}
                            onUpdateGarage={onUpdateGarage}
                            isHovered={hoveredGarageId === garage._id}
                        />
                    ))}
                </Map>
            </div>
        </div>
    );
}
