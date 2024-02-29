import { WithOwnerGarage } from "@/api/garages/getGarages";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useState } from "react";
import GarageCard from "../garage-card";
import clsx from "clsx";

export type GarageMarkerProps = {
    garage: WithOwnerGarage;
};

const CARD_HEIGHT = 247;

function GarageMarker({ garage }: GarageMarkerProps) {
    const { location, price } = garage;
    const [isOpenGarageCard, setOpenGarageCard] = useState<boolean>(false);
    const [shouldShowBottom, setShouldShowBottom] = useState<boolean>(false);

    return (
        <AdvancedMarker
            position={{
                lat: location.coordinates[1],
                lng: location.coordinates[0],
            }}
            className="cursor-pointer relative"
            onClick={(event) => {
                const ev = event.domEvent;

                console.log(ev.target)

                setOpenGarageCard((prev) => !prev)
            }}
        >
            <div
                className={clsx(
                    "inline-block rounded-full px-2 py-1 border",
                    isOpenGarageCard ? "bg-foreground" : "bg-background",
                )}
                ref={(ref) => {
                    if (ref) {
                        const { top } = ref.getBoundingClientRect();
                        setShouldShowBottom(() => {
                            if ((top - 160 - CARD_HEIGHT) > 0) {
                                return false;
                            }

                            return true
                        })
                    }
                }}
            >
                <p
                    className={clsx(
                        "font-semibold text-medium",
                        isOpenGarageCard
                            ? "text-background"
                            : "text-foreground",
                    )}
                >
                    ${price.to}
                </p>
            </div>
            {isOpenGarageCard && (
                <GarageCard
                    garage={garage}
                    carouselType="rectangle"
                    className={clsx("absolute left-1/2 -translate-x-1/2 w-72 p-2", shouldShowBottom ? "top-10" : "bottom-10")}
                />
            )}
        </AdvancedMarker>
    );
}

export default GarageMarker;
