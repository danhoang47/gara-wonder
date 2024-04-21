import { getBasicGarageInfo } from "@/api";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { FetchStatus, Invitation } from "@/core/types";
import { mutationInvitations } from "@/features/user/user.slice";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import moment from "moment";
import useSWRImmutable from "swr/immutable";

export type InvitationCardProps = {
    invitation: Invitation;
};

function InvitationCard({ invitation }: InvitationCardProps) {
    const { data: result } = useSWRImmutable(
        invitation.entityId,
        getBasicGarageInfo,
    );
    const garage = result?.data[0];
    const updateStatus = useAppSelector(state => state.user.updateStatus)
    const dispatch = useAppDispatch()

    const onMutateButtonPress = (type: number) => {
        dispatch(mutationInvitations({ invitationId: invitation._id, type }))
    }

    return (
        <div className="p-4 flex gap-4 border-b rounded-large border shadow">
            <img
                src={garage?.backgroundImage.url}
                alt="Entity image"
                className="w-20 h-20 rounded-medium"
            />
            <div>
                <p className="leading-none font-medium">
                    Bạn nhận được một lời mời tham gia làm việc từ{" "}
                    {garage?.name}
                </p>
                <span className="text-small">
                    Đã gửi vào{" "}
                    {moment(invitation?.createdAt).format("DD/MM/YYYY")}
                </span>
            </div>
            <div className="flex gap-2 items-center">
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
                    onPress={() => onMutateButtonPress(1)}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </Button>
            </div>
        </div>
    );
}

export default InvitationCard;
