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
import { EvaluationModal, ProgressBar } from "./ui";

const ProgressButton = ({
    status,
    setModalOpen,
}: {
    status: number;
    setModalOpen: () => void;
}) => {
    if (status === 0)
        return (
            <div className="p-4 flex flex-col gap-6 items-end">
                <Button
                    color="primary"
                    className="w-[14rem]"
                    onClick={() => setModalOpen()}
                >
                    Đánh giá
                </Button>
                <Button
                    color="default"
                    className="w-[14rem]"
                    onClick={() => setModalOpen()}
                >
                    Tới thanh toán
                </Button>
            </div>
        );
    return (
        <div className="p-4 flex flex-col gap-6 items-end">
            <Button
                color="primary"
                className="w-[14rem]"
                onClick={() => {
                    console.log("toNextStep");
                }}
            >
                Tới bước tiếp theo
            </Button>
        </div>
    );
};

function Evaluation({
    status,
    handOverTime,
}: {
    status?: number;
    handOverTime?: number;
}) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return (
        <div className="border-2 rounded-lg">
            <ProgressBar status={status || 0} />
            <div className="w-full h-1 border-t-2" />
            <ProgressButton
                status={status || 0}
                setModalOpen={() => {
                    setIsModalOpen(true);
                }}
            />
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
                        <EvaluationModal handOverTime={handOverTime} />
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

export default Evaluation;
