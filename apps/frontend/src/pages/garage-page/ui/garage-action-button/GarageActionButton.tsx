import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faFlag } from "@fortawesome/free-solid-svg-icons";

import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { createNewRoom, selectRooms } from "@/features/chat/rooms.slice";
import { FetchStatus, RoomType } from "@/core/types";
import { Button } from "@nextui-org/react";

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
        <div className="flex">
            <Button
                size="md"
                variant="light"
                className={clsx(
                    "cursor-pointer",
                    user.garageId === garageId && "hidden",
                )}
                onPress={async () => {
                    const isExistRoom = rooms.find(
                        (room) => room.entityId === garageId,
                    );
                    if (isExistRoom) {
                        navigate(`/chat/${isExistRoom._id}`);
                        return;
                    }

                    if (fetchingStatus !== FetchStatus.Fetching) {
                        dispatch(
                            createNewRoom({
                                userId: user.value?._id || "",
                                entityId: garageId || "",
                                type: RoomType.WithGarage,
                            }),
                        ).then(({ payload }) => {
                            if (
                                typeof payload === "object" &&
                                payload &&
                                "data" in payload
                            ) {
                                navigate(`/chat/${payload?.data?._id}`);
                            }
                        });
                    }
                }}
                startContent={<FontAwesomeIcon icon={faComment} />}
                isLoading={fetchingStatus === FetchStatus.Fetching}
                spinnerPlacement="end"
            >
                <span className="font-medium">Nhắn tin</span>
            </Button>
            <Button
                size="md"
                variant="light"
                className={clsx(
                    "cursor-pointer",
                    user.garageId === garageId && "hidden",
                )}
                startContent={
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={clsx(
                            "cursor-pointer",
                            isFavorite ? "text-red-500" : "text-black",
                        )}
                    />
                }
                spinnerPlacement="end"
            >
                <span className="font-medium">Yêu thích</span>
            </Button>
            <Button
                size="md"
                variant="light"
                className={clsx(
                    "cursor-pointer",
                    user.garageId === garageId && "hidden",
                )}
                startContent={
                    <FontAwesomeIcon
                        icon={faFlag}
                        className={clsx(
                            "cursor-pointer",
                            isFlag ? "text-primary" : "text-black",
                        )}
                    />
                }
                spinnerPlacement="end"
            >
                <span className="font-medium">Báo cáo</span>
            </Button>
        </div>
    );
}
export default GarageActionButton;
