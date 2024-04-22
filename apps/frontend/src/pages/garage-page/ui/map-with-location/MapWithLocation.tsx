import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export type MapWithLocationProps = {
    location?: {
        coordinates: [number, number];
    };
};

const DEFAULT_CENTER = {
    lat: 15.9895821,
    lng: 108.2419703,
};

function MapWithLocation({ location }: MapWithLocationProps) {
    const [center, setCenter] = useState<google.maps.LatLngLiteral>(DEFAULT_CENTER)

    useEffect(() => {
        if (location) {
            setCenter({
                lat: location.coordinates[1],
                lng: location.coordinates[0],
            })
        }
    }, [location])

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Vị trí trên bản đồ</h2>
            <div className="h-72">
                <Map
                    key={center.lat+""+center.lng}
                    mapId={"513c015c554b1aac"}
                    defaultCenter={center}
                    defaultZoom={14}
                    mapTypeId={"roadmap"}
                >
                    <AdvancedMarker
                        position={center}
                        className="cursor-pointer"
                    >
                        <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
                            <FontAwesomeIcon
                                icon={faHouse}
                                className="text-background"
                                size="lg"
                            />
                        </div>
                    </AdvancedMarker>
                </Map>
            </div>
        </div>
    );
}

export default MapWithLocation;
