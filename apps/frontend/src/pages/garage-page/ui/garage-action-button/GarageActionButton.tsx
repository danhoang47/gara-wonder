import { useEffect, useMemo, useState } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faFlag } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

import { useAppDispatch, useAppSelector, useModalContext } from "@/core/hooks";
import { createNewRoom, selectRooms } from "@/features/chat/rooms.slice";
import { FetchStatus, Report, RoomType } from "@/core/types";
import { ReportModal } from "@/core/ui";
import { addGarageToFavorites, createGarageReport } from "@/api";
import { auth } from "@/components/firebase";

function GarageActionButton({ name = "" }: { name?: string }) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.value);
    const fetchingStatus = useAppSelector(
        (state) => state.rooms.fetchingStatusCreate,
    );
    const rooms = useAppSelector((state) => selectRooms(state));
    const { garageId } = useParams();
    const [isReportModalOpen, setReportModalOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const shouldHideReportButton = useMemo(() => {
        return !user || user.garageId;
    }, [user]);
    const [disabledReportButton, setDisabledReportButton] =
        useState<boolean>(false);
    const { open } = useModalContext();
    const hasFavoriteThisGarage = useMemo(() => {
        if (!user) {
            return false;
        }

        return user.favoriteGarageIds?.includes(garageId || "");
    }, [user]);
    const [hasFavorite, setFavorite] = useState<boolean>();

    const onReportModalSubmit = async (report: Partial<Report>) => {
        setLoading(true);
        await createGarageReport(report);
        setLoading(false);
        setReportModalOpen(true);
        setDisabledReportButton(true);
    };

    const onFavoriteButtonPress = async () => {
        if (!user) {
            open("signIn");
            return;
        }

        const token = await auth.currentUser?.getIdToken(true);
        await addGarageToFavorites(garageId || "", token || "");
        setFavorite((prev) => !prev);
    };

    useEffect(() => {
        setFavorite(hasFavoriteThisGarage);
    }, [hasFavoriteThisGarage]);

    return (
        <div className="flex gap-4 actionButtons">
            <Button
                size="md"
                variant="light"
                className={clsx(
                    "cursor-pointer px-0 data-[hover=true]:bg-transparent",
                    user?.garageId === garageId && "hidden",
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
                                userId: user?._id || "",
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
                    "cursor-pointer px-0 data-[hover=true]:bg-transparent",
                    user?.garageId === garageId && "hidden",
                )}
                startContent={
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={clsx("cursor-pointer, text-danger")}
                    />
                }
                radius="full"
                spinnerPlacement="end"
                onPress={onFavoriteButtonPress}
            >
                <span
                    className={clsx(
                        "font-medium",
                        hasFavorite && "text-danger",
                    )}
                >
                    Yêu thích
                </span>
            </Button>
            {(!shouldHideReportButton || disabledReportButton) && (
                <Button
                    size="md"
                    variant="light"
                    className={clsx(
                        "cursor-pointer px-0 data-[hover=true]:bg-transparent",
                        user?.garageId === garageId && "hidden",
                    )}
                    startContent={
                        <FontAwesomeIcon
                            icon={faFlag}
                            className={clsx("cursor-pointer, text-primary")}
                        />
                    }
                    onPress={() => setReportModalOpen(true)}
                    spinnerPlacement="end"
                >
                    <span className="font-medium">Báo cáo</span>
                </Button>
            )}
            <ReportModal
                isOpen={isReportModalOpen}
                entityId={garageId || ""}
                entityName={name}
                isLoading={isLoading}
                onClose={() => setReportModalOpen(false)}
                onSave={onReportModalSubmit}
            />
        </div>
    );
}
export default GarageActionButton;
