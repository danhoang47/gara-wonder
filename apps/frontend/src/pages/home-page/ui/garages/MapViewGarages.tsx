import { Map } from "@vis.gl/react-google-maps";
import { ViewModeGaragesProps } from "./Garages";
import GarageMarker from "../garage-marker/GarageMarker";

export default function MapViewGarages({
    garages,
    isLoading,
    error,
}: ViewModeGaragesProps) {
    return (
        <div className="h-full -mx-10">
            <Map
                mapId={"513c015c554b1aac"}
                defaultCenter={{
                    lat: 15.9895821,
                    lng: 108.2419703,
                }}
                defaultZoom={8}
                mapTypeId={"roadmap"}
                disableDefaultUI
            >
                {garages?.map(garage => <GarageMarker key={garage._id} garage={garage}/>)}
            </Map>
        </div>
    );
}
