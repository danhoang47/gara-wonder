import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";

function FavoriteFilterButton() {
    const [urlSearchParams, setURLSearchParams] = useSearchParams();
    const isFilteredByFavorite = urlSearchParams.get("isFavorite");

    return (
        <Button
            disableRipple
            variant="bordered"
            className={clsx(
                "border-danger-100 border",
                isFilteredByFavorite && "border-danger-300",
            )}
            startContent={
                <FontAwesomeIcon icon={faHeart} className="text-danger" />
            }
            onPress={() => {
                if (isFilteredByFavorite) {
                    urlSearchParams.delete("isFavorite");
                    setURLSearchParams(urlSearchParams)
                } else {
                    setURLSearchParams((prev) => {
                        prev.set("isFavorite", "true");
                        return prev;
                    });
                }
            }}
        >
            <span className="text-danger">Yêu thích</span>
        </Button>
    );
}

export default FavoriteFilterButton;
