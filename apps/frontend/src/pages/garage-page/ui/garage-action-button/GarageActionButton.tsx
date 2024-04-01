import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faFlag } from "@fortawesome/free-solid-svg-icons";

import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { createNewRoom, selectRooms } from "@/features/chat/rooms.slice";
import { FetchStatus } from "@/core/types";

function GarageActionButton() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    const fetchingStatus = useAppSelector(
        (state) => state.rooms.fetchingStatus,
    );
    const [isFavorite, setIsFavorite] = useState<boolean>(true);
    const [isFlag, setIsFlag] = useState<boolean>(true);
    const { garageId } = useParams();

    const rooms = useAppSelector((state) => selectRooms(state));

    return (
        <div className="flex gap-4">
            <FontAwesomeIcon
                icon={faComment}
                className={clsx(
                    "cursor-pointer",
                    user.garageId === garageId && "hidden",
                )}
                onClick={async () => {
                    const isExistRoom = rooms.find(
                        (room) => room.garageId === garageId,
                    );
                    if (isExistRoom) {
                        navigate(`/chat/${isExistRoom._id}`);
                        return;
                    }

                    if (fetchingStatus !== FetchStatus.Fetching) {
                        const { data: room } = await dispatch(
                            createNewRoom({
                                userId: user.value?._id || "",
                                garageId: garageId || "",
                            }),
                        ).unwrap();
                        navigate(`/chat/${room._id}`);
                    }
                }}
            />
            <FontAwesomeIcon
                icon={faHeart}
                className={clsx(
                    "cursor-pointer",
                    isFavorite ? "text-red-500" : "text-black",
                )}
                onClick={() => setIsFavorite(!isFavorite)}
            />
            <FontAwesomeIcon
                icon={faFlag}
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
