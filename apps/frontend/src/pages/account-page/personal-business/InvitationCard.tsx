import { getBasicGarageInfo } from "@/api";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { FetchStatus, Invitation, InvitationStatus } from "@/core/types";
import { mutationInvitations } from "@/features/user/user.slice";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import moment from "moment";
import { useMemo } from "react";
import useSWRImmutable from "swr/immutable";

export type InvitationCardProps = {
    invitation: Invitation;
    onActionCompleted: () => void;
};

function InvitationCard({ invitation }: InvitationCardProps) {
    const { data: result } = useSWRImmutable(
        invitation.entityId,
        getBasicGarageInfo,
    );
    const garage = result?.data?.length ? result?.data[0] : undefined;
    const updateStatus = useAppSelector((state) => state.user.updateStatus);
    const garageId = useAppSelector((state) => state.user.value?.garageId);
    const dispatch = useAppDispatch();
    const hasAccepted = useMemo(
        () => invitation.status === InvitationStatus.Accepted,
        [invitation.status],
    );

    const onMutateButtonPress = (type: number) => {
        dispatch(mutationInvitations({ invitationId: invitation._id, type }));
    };

    return (
        <div className="p-3 flex gap-4 border-b rounded-large border shadow">
            <img
                src={garage?.backgroundImage.url}
                alt="Entity image"
                className="w-20 h-20 rounded-medium"
            />
            <div className="flex flex-col gap-1">
                <p className="leading-none font-medium">
                    Bạn nhận được một lời mời tham gia làm việc từ{" "}
                    {garage?.name}
                </p>
                <span className="text-small text-default-500">
                    Đã gửi vào{" "}
                    {moment(invitation?.createdAt).format("DD/MM/YYYY")}
                </span>
                {hasAccepted && (
                    <p className="italic text-small text-default-500 mt-auto">
                        Bạn đã chấp nhận lời mời này
                    </p>
                )}
            </div>
            <div className="flex gap-2 items-center">
                {!garageId && (
                    <>
                        <Button
                            size="sm"
                            isIconOnly
                            radius="full"
                            variant="bordered"
                            isLoading={updateStatus === FetchStatus.Fetching}
                            onPress={() => onMutateButtonPress(1)}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>
                        <Button
                            size="sm"
                            isIconOnly
                            radius="full"
                            variant="bordered"
                            isLoading={updateStatus === FetchStatus.Fetching}
                            onPress={() => onMutateButtonPress(0)}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default InvitationCard;
