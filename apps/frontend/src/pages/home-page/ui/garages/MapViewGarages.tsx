import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { ViewModeGaragesProps } from "./Garages";

export default function MapViewGarages({
    garages,
    isLoading,
    error,
}: ViewModeGaragesProps) {
    return (
        <Map
            mapId={"513c015c554b1aac"}
            defaultCenter={{
                lat: 15.9895821,
                lng: 108.2419703,
            }}
            defaultZoom={14}
            mapTypeId={"roadmap"}
            disableDefaultUI
        >
            <AdvancedMarker
                position={{
                    lat: 15.9895821,
                    lng: 108.2419703,
                }}
                className="cursor-pointer"
            >
                <div className="inline-block rounded-full bg-white px-2 py-1 border">
                    <p className="font-semibold text-medium">$120</p>
                </div>
            </AdvancedMarker>
        </Map>
    );
}
