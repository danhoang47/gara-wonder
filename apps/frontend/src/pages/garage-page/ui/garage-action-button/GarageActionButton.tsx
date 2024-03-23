import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import * as regular from "@fortawesome/free-regular-svg-icons";

import clsx from "clsx";

function GarageActionButton() {
    const [isFavorite, setIsFavorite] = useState<boolean>(true);
    const [isFlag, setIsFlag] = useState<boolean>(true);

    return (
        <div className="flex gap-4">
            <FontAwesomeIcon
                icon={isFavorite ? solid.faHeart : regular.faHeart}
                className={clsx(
                    "cursor-pointer",
                    isFavorite ? "text-red-500" : "text-black",
                )}
                onClick={() => setIsFavorite(!isFavorite)}
            />
            <FontAwesomeIcon
                icon={isFlag ? solid.faFlag : regular.faFontAwesome}
                className={clsx(
                    "cursor-pointer",
                    isFlag ? "text-primary" : "text-black",
                )}
                onClick={() => setIsFlag(!isFlag)}
            />
        </div>
    );
}
export default GarageActionButton;
