import { Input } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";

import RegistrationSection from "../registration-section";
import { useGarageRegistrationContext } from "../../hooks";
import { useDebouncedValue } from "@/core/hooks";
import { getPlaceSuggestions } from "@/api/garages";
import { PlacePrediction } from "@/api/garages/getPlaceSuggestions";
import SuggestionAddress from "./SuggestionAddress";

const googleMapUri =
    "https://maps.googleapis.com/maps/api/geocode/json?key=" +
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const defaultLatLng = {
    lat: 16.0496424,
    lng: 108.2209876,
};

function Address() {
    const {
        garageRegistrationState,
        garageRegistrationErrors,
        setGarageRegistrationStateValue,
    } = useGarageRegistrationContext();
    const { address, location } = garageRegistrationState;
    const debouncedAddress = useDebouncedValue(address, 1000);
    const [center, setCenter] = useState<google.maps.LatLng>();
    const [placePredictions, setPlacePredictions] = useState<PlacePrediction[]>(
        [],
    );
    const [hasFocus, setFocus] = useState<boolean>(true);
    const [hasVisit, setVisit] = useState<boolean>(false);
    const hasShowPredictions = useMemo(() => {
        return hasVisit && debouncedAddress && hasFocus && placePredictions.length !== 0;
    }, [placePredictions.length, hasFocus, debouncedAddress, hasVisit]);
    const position = location
        ? {
              lat: location.coordinates[1],
              lng: location.coordinates[0],
          }
        : defaultLatLng;

    useEffect(() => {
        setGarageRegistrationStateValue("address", address || "");
    }, []);

    useEffect(() => {
        let isStale = false;

        const getGeocodingFromAddress = async () => {
            if (debouncedAddress) {
                const url = googleMapUri + `&address=${debouncedAddress}`;
                const data = await fetch(url).then((res) => res.json());

                if (!isStale) {
                    const { lat, lng } = data.results[0].geometry.location;
                    setGarageRegistrationStateValue("location", {
                        coordinates: [lng, lat],
                    });
                    setCenter(
                        new google.maps.LatLng({
                            lat,
                            lng,
                        }),
                    );
                }
            }
        };
        const getPlaceSuggestionsFromAddress = async () => {
            if (debouncedAddress) {
                const predictions = await getPlaceSuggestions(debouncedAddress);

                if (!isStale) {
                    setPlacePredictions(predictions);
                }
            }
        };

        getPlaceSuggestionsFromAddress();
        getGeocodingFromAddress();
        return () => {
            isStale = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedAddress]);

    console.log(hasFocus)
    return (
        <RegistrationSection
            header={"Địa chỉ"}
            description={
                "Nhập địa chỉ và di chuyển con trỏ trên bản đồ tới vị trí bạn mong muốn"
            }
        >
            <div className="flex flex-wrap gap-3">
                <div
                    className="grow relative z-10"
                    tabIndex={0}
                    onBlur={() => {
                        setFocus(false)
                    }}
                    onFocusCapture={() => {
                        setFocus(true)
                    }}
                >
                    <Input
                        variant="bordered"
                        placeholder="Nhập vào địa chỉ cụ thể..."
                        label="Địa chỉ cụ thể"
                        isRequired
                        errorMessage={
                            !hasFocus && garageRegistrationErrors.address
                        }
                        isInvalid={
                            !hasFocus &&
                            Boolean(garageRegistrationErrors.address)
                        }
                        onValueChange={(v) =>
                            setGarageRegistrationStateValue("address", v)
                        }
                        value={address}
                        onMouseDown={() => setVisit(true)}
                    />
                    {hasShowPredictions && (
                        <div
                            className="absolute top-[56px] w-full bg-background shadow rounded-b-lg"
                            role="list"
                        >
                            {placePredictions.map((placePrediction) => (
                                <SuggestionAddress
                                    key={placePrediction.placeId}
                                    placePrediction={placePrediction}
                                    onPress={(place) =>
                                        setGarageRegistrationStateValue(
                                            "address",
                                            place.text.text,
                                        )
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="h-80 w-full">
                    <Map
                        mapId={"36cc488b1b7a7759"}
                        defaultCenter={position}
                        center={center}
                        defaultZoom={14}
                        mapTypeId={"roadmap"}
                        disableDefaultUI
                        onDrag={(event) => {
                            const latlng = event.map.getCenter();
                            if (latlng) {
                                setGarageRegistrationStateValue("location", {
                                    coordinates: [latlng.lng(), latlng.lat()],
                                });
                            }
                        }}
                        onDragstart={() => {
                            setCenter(undefined);
                        }}
                        onDragend={(event) => {
                            const latlng = event.map.getCenter();
                            if (latlng) {
                                setGarageRegistrationStateValue("location", {
                                    coordinates: [latlng.lng(), latlng.lat()],
                                });
                                setCenter(latlng);
                            }
                        }}
                    >
                        <AdvancedMarker position={position} />
                    </Map>
                </div>
            </div>
        </RegistrationSection>
    );
}

export default Address;
