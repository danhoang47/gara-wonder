import { Input } from "@nextui-org/react";
import { useEffect } from "react";
import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";

import RegistrationSection from "../registration-section";
import { useSupplierRegistrationContext } from "../../hooks";
import { useDebouncedValue } from "@/core/hooks";

const googleMapUri =
    "https://maps.googleapis.com/maps/api/geocode/json?key=" +
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const defaultLatLng = {
    lat: 16.0496424,
    lng: 108.2209876,
};

function Address() {
    const {
        setSupplierRegistrationStateValue,
        supplierRegistrationState,
        supplierRegistrationErrors,
    } = useSupplierRegistrationContext();
    const { address, location } = supplierRegistrationState;
    const debouncedAddress = useDebouncedValue(address, 500);
    const position = location
        ? {
              lat: location.coordinates[1],
              lng: location.coordinates[0],
          }
        : defaultLatLng;

    useEffect(() => {
        let isStale = false;

        const getGeocodingFromAddress = async () => {
            if (debouncedAddress) {
                const url = googleMapUri + `&address=${debouncedAddress}`;
                const data = await fetch(url).then((res) => res.json());

                if (!isStale) {
                    const { lat, lng } = data.results[0].geometry.location;
                    setSupplierRegistrationStateValue("location", {
                        coordinates: [lng, lat],
                    });
                }
            }
        };

        getGeocodingFromAddress();
        return () => {
            isStale = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedAddress]);

    return (
        <RegistrationSection
            header={"Địa chỉ"}
            description={"Đánh dấu lên bản đồ để định vị vị trí của bạn"}
        >
            <div className="flex flex-wrap gap-3">
                <Input
                    variant="bordered"
                    placeholder="Tên đường"
                    label="Đường"
                    isRequired
                    errorMessage={supplierRegistrationErrors.address}
                    isInvalid={Boolean(supplierRegistrationErrors.address)}
                    onValueChange={(v) =>
                        setSupplierRegistrationStateValue("address", v)
                    }
                    value={address}
                />
                <div className="h-80 w-full">
                    <Map
                        mapId={"36cc488b1b7a7759"}
                        defaultCenter={position}
                        defaultZoom={14}
                        mapTypeId={"roadmap"}
                        disableDefaultUI
                        onDrag={(event) => {
                            const latlng = event.map.getCenter();
                            if (latlng) {
                                setSupplierRegistrationStateValue("location", {
                                    coordinates: [latlng.lng(), latlng.lat()],
                                });
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
