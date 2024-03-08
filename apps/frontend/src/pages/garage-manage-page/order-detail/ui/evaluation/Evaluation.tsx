import {
    faLayerGroup,
    faFileLines,
    faGear,
    faMoneyBills,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, ModalContent } from "@nextui-org/react";
import { useState } from "react";
import { EvaluationModal } from "./ui";

const ProgressBar = () => {
    return (
        <div className=" flex  items-center justify-center px-auto py-5 pb-10 ">
            <div className="relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3 text-white border-primary bg-primary">
                <FontAwesomeIcon icon={faFileLines} size="2xl" />
                <p className="absolute  -bottom-7 text-sm font-semibold text-primary-500  whitespace-nowrap">
                    Đánh giá
                </p>
            </div>

            <div className="min-w-32 h-1 bg-primary" />
            <div className="relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3 text-primary-500 border-primary-500">
                <FontAwesomeIcon icon={faLayerGroup} size="2xl" />
                <p className="absolute  -bottom-7 text-sm font-semibold text-primary-500  whitespace-nowrap">
                    Chuẩn bị
                </p>
            </div>
            <div className="min-w-32 h-1 bg-default-500" />
            <div className="relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3 text-default-500 border-default-500">
                <FontAwesomeIcon icon={faGear} size="2xl" />
                <p className="absolute  -bottom-7 text-sm font-semibold text-default-500  whitespace-nowrap">
                    Chỉnh sửa
                </p>
            </div>
            <div className="min-w-32 h-1 bg-default-500" />
            <div className="relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3 text-default-500 border-default-500">
                <FontAwesomeIcon icon={faMoneyBills} size="2xl" />
                <p className="absolute  -bottom-7 text-sm font-semibold text-default-500  whitespace-nowrap">
                    Thanh toán
                </p>
            </div>
        </div>
    );
};

function Evalutation() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return (
        <div className="border-2 rounded-lg">
            <ProgressBar />
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
                hideCloseButton
                size="2xl"
            >
                <ModalContent>
                    <EvaluationModal
                        closeModal={() => {
                            setIsModalOpen(false);
                        }}
                    />
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Evalutation;
