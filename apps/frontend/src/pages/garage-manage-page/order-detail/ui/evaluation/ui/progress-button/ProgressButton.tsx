import { Button } from "@nextui-org/react";

const ProgressButton = ({
    status,
    setModalOpen,
    setNextModalOpen,
    setProvideOrder,
    evaluationProvided,
    isProvideEvaluation,
    setOnAccept,
    setOnDeleteModal,
}: {
    status: number;
    isProvideEvaluation: boolean;
    evaluationProvided: boolean;
    setModalOpen: () => void;
    setNextModalOpen: () => void;
    setProvideOrder: () => void;
    setOnAccept: (str: string) => void;
    setOnDeleteModal: () => void;
}) => {
    if (status <= -2) return;
    if (status === -1)
        return (
            <div className="p-4 flex flex-col gap-6 items-end">
                <Button
                    color="primary"
                    className="w-[14rem]"
                    isDisabled={evaluationProvided}
                    onClick={() => setOnAccept("accept")}
                >
                    Chấp nhận đơn
                </Button>
                <Button
                    color="default"
                    className="w-[14rem]"
                    onClick={() => setOnDeleteModal()}
                >
                    Từ chối đơn
                </Button>
            </div>
        );
    if (status === 0 && isProvideEvaluation)
        return (
            <div className="p-4 flex flex-col gap-6 items-end">
                <Button
                    color="primary"
                    className="w-[14rem]"
                    isDisabled={evaluationProvided}
                    onClick={() => setModalOpen()}
                >
                    Đánh giá
                </Button>
                <Button
                    color="default"
                    className="w-[14rem]"
                    onClick={() => setOnDeleteModal()}
                >
                    Hủy đơn
                </Button>
            </div>
        );
    if (status === 1 && !isProvideEvaluation)
        return (
            <div className="p-4 flex flex-col gap-6 items-end">
                <Button
                    color="primary"
                    className="w-[14rem]"
                    isDisabled={evaluationProvided}
                    onClick={() => setProvideOrder()}
                >
                    Xác nhận đơn sửa chữa
                </Button>
                <Button
                    color="default"
                    className="w-[14rem]"
                    onClick={() => setOnDeleteModal()}
                >
                    Hủy đơn
                </Button>
            </div>
        );
    if (status < 3)
        return (
            <div className="p-4 flex flex-col gap-6 items-end">
                <Button
                    color="primary"
                    className="w-[14rem]"
                    onClick={() => setNextModalOpen()}
                >
                    Tới bước tiếp theo
                </Button>
                <Button
                    color="default"
                    className="w-[14rem]"
                    onClick={() => setOnDeleteModal()}
                >
                    Hủy đơn
                </Button>
            </div>
        );
};
export default ProgressButton;
