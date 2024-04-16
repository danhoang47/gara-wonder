import { Map, MapEvent } from "@vis.gl/react-google-maps";
import { ViewModeGaragesProps } from "./Garages";
import GarageMarker from "../garage-marker/GarageMarker";
import { useSearchParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import GridViewGarages from "./GridViewGarages";
import { debounce } from "@/utils";

const DEFAULT_CENTER = {
    lat: 16.02963,
    lng: 108.238675,
};

export default function MapViewGarages(props: ViewModeGaragesProps) {
    const { garages, onUpdateGarage } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpenGridView, setOpenGridView] = useState<boolean>(false);
    const [hoveredGarageId, setHoveredGarageId] = useState<string>();
    const [defaultCenter, setDefaultCenter] =
        useState<google.maps.LatLngLiteral>();

    const onCenterChange = debounce(
        (lat: number | undefined, lng: number | undefined) => {
            if (!lat || !lng) return;

            setSearchParams((prev) => {
                prev.set("lat", lat.toString());
                prev.set("lng", lng.toString());

                return prev;
            });
        },
        1000,
    );

    const onHoverGarageCard = (garageId: string) => {
        setHoveredGarageId(garageId);
    };

    const onHoverOutGarageCard = () => {
        setHoveredGarageId(undefined);
    };

    useEffect(() => {
        const lat = searchParams.get("lat");
        const lng = searchParams.get("lng");

        if (lat && lng) {
            setDefaultCenter({
                lat: Number.parseFloat(lat),
                lng: Number.parseFloat(lng),
            });
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { coords } = position;
                    const { latitude, longitude } = coords;
                    console.log(latitude, longitude)

                    setDefaultCenter({
                        lat: latitude,
                        lng: longitude,
                    });
                },
                () => {
                    setDefaultCenter({
                        lat: DEFAULT_CENTER.lat,
                        lng: DEFAULT_CENTER.lng,
                    });
                },
            );
        }
    }, []);

    return (
        <div className="h-[calc(100vh-177px)] -mx-10 flex relative overflow-y-hidden">
            {isOpenGridView && (
                <div className="flex-grow basis-0 px-10 overflow-auto">
                    <GridViewGarages
                        {...props}
                        onHoverGarageCard={onHoverGarageCard}
                        onHoverOutGarageCard={onHoverOutGarageCard}
                    />
                </div>
            )}
            <div className="flex-grow h-full sticky basis-0">
                <Button
                    className="absolute bg-default-50 left-10 top-10 z-10"
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
                    key={defaultCenter?.lat + "" + defaultCenter?.lng}
                    mapId={"513c015c554b1aac"}
                    defaultCenter={defaultCenter || {
                        lat: DEFAULT_CENTER.lat,
                        lng: DEFAULT_CENTER.lng,
                    }}
                    defaultZoom={12}
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
