import { getUser } from "@/api";
import { faCheckCircle, faComment } from "@fortawesome/free-regular-svg-icons";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Avatar,
    Badge,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
} from "@nextui-org/react";
import moment from "moment";
import useSWRImmutable from "swr/immutable";

export type ProfileDialogProps = {
    userId: string;
    isOpen: boolean;
    onClose: () => void;
};

export default function ProfileDialog({
    userId,
    isOpen,
    onClose,
}: ProfileDialogProps) {
    const { isLoading, data: response } = useSWRImmutable(
        ["user", userId],
        (params) => getUser(params[1]),
    );
    const user = response?.data;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalBody className="p-0">
                    <div className="relative px-4">
                        <div className="h-16 bg-primary-50 -mx-4" />
                        <div className="absolute left-4 bottom-0 ">
                            <Badge
                                placement="bottom-right"
                                content={
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="text-primary"
                                    />
                                }
                            >
                                <Avatar
                                    src={user?.photoURL}
                                    className="w-20 h-20"
                                />
                            </Badge>
                        </div>
                        <div className="flex justify-end py-2">
                            <Button
                                startContent={
                                    <FontAwesomeIcon icon={faComment} />
                                }
                                endContent={
                                    user?.isOnline && <FontAwesomeIcon icon={faDotCircle} className="text-success" size="sm"/>
                                }
                                variant="bordered"
                                size="sm"
                                className="border"
                            >
                                <span className="font-medium">Nhắn tin</span>
                            </Button>
                        </div>
                    </div>
                    <div className="px-4 flex flex-col pb-4">
                        <div>
                            <h2 className="font-semibold text-xl">{user?.displayName}</h2>
                            <p className="text-small mt-1">{user?.email}</p>
                        </div>
                        <div className="flex py-4 border-b mt-4">
                            <div className="min-w-40 font-medium text-small">Số điện thoại</div>
                            <Input 
                                isReadOnly
                                classNames={{
                                    inputWrapper: "max-h-10 border"
                                }}
                                size="sm"
                                variant="bordered"
                                value={user?.phoneNumber === "null" ? "Chưa cung cấp" : user?.phoneNumber}
                            />
                        </div>
                        <div className="flex py-4 border-b">
                            <div className="min-w-40 font-medium text-small">Tham gia vào</div>
                            <Input 
                                isReadOnly
                                classNames={{
                                    inputWrapper: "max-h-10 border"
                                }}
                                size="sm"
                                variant="bordered"
                                value={user?.createdAt ? moment(user?.createdAt).format("DD/MM/YYYY") : ""}
                            />
                        </div>
                        <div className="flex py-4">
                            <div className="min-w-40 font-medium text-small">Được xác thực</div>
                            <Input 
                                isReadOnly
                                classNames={{
                                    inputWrapper: "max-h-10 border"
                                }}
                                size="sm"
                                variant="bordered"
                                value={user?.emailVerified ? "Đã xác thực" : "Chưa xác thực"}
                            />
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
