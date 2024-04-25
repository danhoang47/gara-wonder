import { useEffect, useMemo, useState } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faFlag } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { createNewRoom, selectRooms } from "@/features/chat/rooms.slice";
import { FetchStatus, Report, RoomType } from "@/core/types";
import { ReportModal } from "@/core/ui";
import { createGarageReport, getReportStatus } from "@/api";

function GarageActionButton({ name = "" }: { name?: string }) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const fetchingStatus = useAppSelector(
        (state) => state.rooms.fetchingStatusCreate,
    );
    const rooms = useAppSelector((state) => selectRooms(state));
    const { garageId } = useParams();
    const [isReportModalOpen, setReportModalOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user.value);
    const shouldHideReportButton = useMemo(() => {
        return !user || Boolean(user.garageId);
    }, [user]);
    const [isReported, setReported] = useState<boolean>(false);

    const onReportModalSubmit = async (report: Partial<Report>) => {
        setLoading(true);
        await createGarageReport(report);
        setLoading(false);
        setReportModalOpen(false);
    };

    useEffect(() => {
        const checkReportStatus = async () => {
            if (user && garageId) {
                const response = (await getReportStatus(garageId)) as boolean;
                setReported(response);
            }
        };

        checkReportStatus();
    }, [user, garageId]);

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
                spinnerPlacement="end"
            >
                <span className="font-medium">Yêu thích</span>
            </Button>
            {(!shouldHideReportButton ||
                !isReported) && (
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
