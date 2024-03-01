import { Map, MapEvent } from "@vis.gl/react-google-maps";
import { ViewModeGaragesProps } from "./Garages";
import GarageMarker from "../garage-marker/GarageMarker";
import { useSearchParams } from "react-router-dom";

type Position = {
    lat?: string | null,
    lng?: string | null 
}

const DEFAULT_CENTER = {
    lat: 15.9895821,
    lng: 108.2419703,
};

export default function MapViewGarages({ garages }: ViewModeGaragesProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const center: Position = {
        lat: searchParams.get("lat"),
        lng: searchParams.get("lng"),
    };

    const onCenterChange = (lat: number | undefined, lng: number | undefined) => {
        if (!lat || !lng) return

        setSearchParams((prev) => {
            prev.set("lat", lat.toString());
            prev.set("lng", lng.toString());

            return prev;
        });
    };

    return (
        <div className="h-full -mx-10">
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
                    const { lat, lng } = event.detail.center
                    onCenterChange(lat, lng)
                }}
                onDragend={(event: MapEvent) => {
                   const latlng = event.map.getCenter()
                   onCenterChange(latlng?.lat(), latlng?.lng())
                }}
            >
                {garages?.map((garage) => (
                    <GarageMarker key={garage._id} garage={garage} />
                ))}
            </Map>
        </div>
    );
}
