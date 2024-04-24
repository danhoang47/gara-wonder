import { getInvitationsByGarageId, getUser } from "@/api";
import { Invitation } from "@/core/types";
import {
    Avatar,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
} from "@nextui-org/react";
import moment from "moment";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

export type SentInvitationsProps = {
    isOpen: boolean;
    onClose: () => void;
};

function InvitationCard({ invitation }: { invitation: Invitation }) {
    const { data: result } = useSWRImmutable(invitation.userId, getUser);
    const user = result?.data;

    return (
        <div className="py-4 flex gap-4 border-b last:border-none">
            <Avatar src={user?.photoURL} />
            <div>
                <p className="leading-none font-medium">
                    {user?.displayName || user?.email || user?.phoneNumber}
                </p>
                <span className="text-small">
                    Đã gửi vào{" "}
                    {moment(invitation?.createdAt).format("DD/MM/YYYY")}
                </span>
            </div>
        </div>
    );
}

function SentInvitations({ isOpen, onClose }: SentInvitationsProps) {
    const { garageId } = useParams();
    const { isLoading, data: invitations } = useSWR(
        ["invitations", garageId],
        (params) => getInvitationsByGarageId(params[1]!),
        {
            keepPreviousData: false,
            revalidateOnFocus: true,
            refreshWhenHidden: true,
        },
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>
                    <span>Lời mời đã gửi</span>
                </ModalHeader>
                <ModalBody>
                    {invitations?.map((invitation) => (
                        <InvitationCard
                            invitation={invitation}
                            key={invitation._id}
                        />
                    ))}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default SentInvitations;
