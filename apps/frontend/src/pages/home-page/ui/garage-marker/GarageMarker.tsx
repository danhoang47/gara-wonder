import { WithOwnerGarage } from "@/api/garages/getGarages";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useState } from "react";
import GarageCard from "../garage-card";
import clsx from "clsx";
import { addGarageToFavorites } from "@/api";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { notify } from "@/features/toasts/toasts.slice";

export type GarageMarkerProps = {
    garage: WithOwnerGarage;
    onUpdateGarage: (garage: WithOwnerGarage) => void;
    isHovered?: boolean;
};

const CARD_HEIGHT = 247;

function GarageMarker({
    garage,
    onUpdateGarage,
    isHovered = false,
}: GarageMarkerProps) {
    const { location, price } = garage;
    const token = useAppSelector((state) => state.user.token);
    const [isOpenGarageCard, setOpenGarageCard] = useState<boolean>(false);
    const [shouldShowBottom, setShouldShowBottom] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onFavoriteButtonPress = (garage: WithOwnerGarage) => {
        if (!token) {
            open("signIn");
            return;
        }

        addGarageToFavorites(garage._id, token);
        onUpdateGarage({
            ...garage,
            isFavorite: !garage.isFavorite,
        });
        const title = !garage.isFavorite
            ? "Thêm vào danh sách yêu thích"
            : "Xóa khỏi danh sách yêu thích";
        const description = !garage.isFavorite
            ? "Thêm vào danh sách yêu thích thành công"
            : "Xóa khỏi danh sách yêu thích thành công";
        dispatch(notify({ title, description, type: "success", delay: 2000 }));
    };

    return (
        <AdvancedMarker
            position={{
                lat: location.coordinates[1],
                lng: location.coordinates[0],
            }}
            className="cursor-pointer relative"
            onClick={() => setOpenGarageCard((prev) => !prev)}
        >
            <div
                className={clsx(
                    "inline-block rounded-full px-2 py-1 border transition-background",
                    isOpenGarageCard ? "bg-foreground" : "bg-background",
                    isHovered && "bg-foreground",
                )}
                ref={(ref) => {
                    if (ref) {
                        const { top } = ref.getBoundingClientRect();
                        setShouldShowBottom(() => {
                            if (top - 160 - CARD_HEIGHT > 0) {
                                return false;
                            }

                            return true;
                        });
                    }
                }}
            >
                <p
                    className={clsx(
                        "font-semibold text-medium transition-colors",
                        isOpenGarageCard
                            ? "text-background"
                            : "text-foreground",
                        isHovered && "text-[white!important]",
                    )}
                >
                    ${price.to}
                </p>
            </div>
            {isOpenGarageCard && (
                <GarageCard
                    garage={garage}
                    carouselType="rectangle"
                    className={clsx(
                        "absolute left-1/2 -translate-x-1/2 w-72 p-2",
                        shouldShowBottom ? "top-10" : "bottom-10",
                    )}
                    onFavoriteButtonPress={onFavoriteButtonPress}
                />
            )}
        </AdvancedMarker>
    );
}

export default GarageMarker;
