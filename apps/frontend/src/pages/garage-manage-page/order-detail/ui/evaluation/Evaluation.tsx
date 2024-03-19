import {
    faLayerGroup,
    faFileLines,
    faGear,
    faMoneyBills,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { EvaluationModal } from "./ui";
import clsx from "clsx";

const ProgressBar = ({ status }: { status: number }) => {
    const checkProgress = (stat: number) => {
        if (status === stat) return `text-primary-500 border-primary-500 `;
        if (status > stat) return `text-white border-primary bg-primary`;
        if (status < stat) return `text-default-500 border-default-500`;
    };
    const checkProgressLine = (stat: number) => {
        if (status > stat) return `bg-primary text-primary`;
        if (status <= stat) return `bg-default-500`;
    };
    const checkProgressText = (stat: number) => {
        if (status >= stat) return `text-primary`;
        if (status < stat) return `text-default-500`;
    };
    return (
        <div className=" flex  items-center justify-center px-auto py-5 pb-10 ">
            <div
                className={clsx(
                    "relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3",
                    checkProgress(-1),
                )}
            >
                <FontAwesomeIcon icon={faFileLines} size="2xl" />
                <p
                    className={clsx(
                        "absolute -bottom-7 text-sm font-semibold whitespace-nowrap",
                        checkProgressText(0),
                    )}
                >
                    Đánh giá
                </p>
            </div>

            <div className={clsx("min-w-32 h-1", checkProgressLine(0))} />
            <div
                className={clsx(
                    "relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3",
                    checkProgress(1),
                )}
            >
                <FontAwesomeIcon icon={faLayerGroup} size="2xl" />
                <p
                    className={clsx(
                        "absolute -bottom-7 text-sm font-semibold whitespace-nowrap",
                        checkProgressText(1),
                    )}
                >
                    Chuẩn bị
                </p>
            </div>
            <div className={clsx("min-w-32 h-1", checkProgressLine(1))} />
            <div
                className={clsx(
                    "relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3",
                    checkProgress(2),
                )}
            >
                <FontAwesomeIcon icon={faGear} size="2xl" />
                <p
                    className={clsx(
                        "absolute -bottom-7 text-sm font-semibold whitespace-nowrap",
                        checkProgressText(2),
                    )}
                >
                    Chỉnh sửa
                </p>
            </div>
            <div className={clsx("min-w-32 h-1", checkProgressLine(2))} />
            <div
                className={clsx(
                    "relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3",
                    checkProgress(3),
                )}
            >
                <FontAwesomeIcon icon={faMoneyBills} size="2xl" />
                <p
                    className={clsx(
                        "absolute -bottom-7 text-sm font-semibold whitespace-nowrap",
                        checkProgressText(3),
                    )}
                >
                    Thanh toán
                </p>
            </div>
        </div>
    );
};

function Evalutation({ status }: { status?: number }) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return (
        <div className="border-2 rounded-lg">
            <ProgressBar status={status || 0} />
            <div className="w-full h-1 border-t-2" />
            <div className="p-4 flex flex-col gap-6 items-end">
                <Button
                    color="primary"
                    className="w-[14rem]"
                    onClick={() => setIsModalOpen(true)}
                >
                    Đánh giá
                </Button>
                <Button
                    color="default"
                    className="w-[14rem]"
                    onClick={() => setIsModalOpen(true)}
                >
                    Tới thanh toán
                </Button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onOpenChange={() => setIsModalOpen(false)}
                classNames={{
                    wrapper: "overflow-y-hidden",
                }}
                size="2xl"
            >
                <ModalContent className="max-h-[90%] min-h-[70%]">
                    <ModalHeader>
                        <p className="text-center text-lg font-bold">
                            Đánh giá
                        </p>
                    </ModalHeader>
                    <Divider />
                    <ModalBody className="pb-4 overflow-auto">
                        <EvaluationModal />
                    </ModalBody>
                    <Divider />
                    <ModalFooter className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <p>Tổng cộng:</p>
                            <p className="font-bold text-black text-2xl">
                                USD 280
                            </p>
                        </div>
                        <div className="flex gap-2 py-2 justify-end ">
                            <Button
                                variant="light"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <p className="text-black">Đóng</p>
                            </Button>
                            <Button color="primary">
                                <p className="text-background">
                                    Gửi tới khách hàng
                                </p>
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Evalutation;
