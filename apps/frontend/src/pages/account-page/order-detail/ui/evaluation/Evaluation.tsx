import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { EvaluationModal, ProgressBar } from "./ui";
import { OrderDetailType } from "@/api/order/getOrderById";
import { getOrderEvaluation } from "@/api";
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

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
                    Xem Đánh giá
                </Button>
                {/* <Button
                    color="default"
                    className="w-[14rem]"
                    onClick={() => setModalOpen()}
                >
                    Tới thanh toán
                </Button> */}
            </div>
        );
    // return (
    //     <div className="p-4 flex flex-col gap-6 items-end">
    //         <Button
    //             color="primary"
    //             className="w-[14rem]"
    //             onClick={() => {
    //                 console.log("toNextStep");
    //             }}
    //         >
    //             Tới bước tiếp theo
    //         </Button>
    //     </div>
    // );
};

function Evaluation({
    status,
    handOverTime,
    services,
}: {
    status?: number;
    handOverTime?: number;
    services?: OrderDetailType["services"];
}) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<string>("");
    const { orderId } = useParams();
    const { data: evaluation } = useSWRImmutable("evaluation", () =>
        getOrderEvaluation(orderId),
    );
    useEffect(() => {
        console.log(evaluation);
    }, [evaluation]);

    const onSubmit = async () => {
        // try {
        //     const result = await handleEvaluation(
        //         garageId,
        //         evaluation as EvaluationInfo,
        //     );
        //     if (result.statusCode === 200) {
        //         const imageUpload = await uploadEvaluationImage(
        //             garageId,
        //             evaluation?.orderId as string,
        //             evaluation?.evaluationImages as File[],
        //         );
        //         if (imageUpload.statusCode === 200) {
        //             dispatch(
        //                 notify({
        //                     type: "success",
        //                     title: "Gửi Đánh Giá Thành Công",
        //                     description:
        //                         "Gửi đánh giá tới khách hàng thành công",
        //                 }),
        //             );
        //         }
        //     }
        // } catch (error) {
        //     dispatch(
        //         notify({
        //             type: "failure",
        //             title: "Gửi Đánh Giá Thất Bại",
        //             description: "Một số lỗi xảy ra khi gửi đánh giá",
        //         }),
        //     );
        // }
    };

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
                        <EvaluationModal
                            handOverTime={handOverTime}
                            services={services}
                            description={evaluation?.description}
                            images={evaluation?.evaluationImgs}
                            estimateTime={evaluation?.estimationDuration}
                        />
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
                            <Button
                                color="danger"
                                onClick={() => {
                                    setConfirmModalOpen(true);
                                    setConfirm("reject");
                                }}
                            >
                                <p className="text-background">Hủy bỏ</p>
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => {
                                    setConfirmModalOpen(true);
                                    setConfirm("confirm");
                                }}
                            >
                                <p className="text-background">Chấp nhận</p>
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isConfirmModalOpen}
                onOpenChange={() => setConfirmModalOpen(false)}
                classNames={{
                    wrapper: "overflow-y-hidden",
                }}
                size="2xl"
            >
                <ModalContent className="max-w-[600px]">
                    <ModalHeader>
                        <p className="text-center text-lg font-bold">
                            Xác nhận
                        </p>
                    </ModalHeader>
                    <Divider />
                    <ModalBody className="pb-4 overflow-auto text-lg">
                        <p className="font-medium">
                            Bạn xác nhận{" "}
                            <span className="font-bold">
                                {confirm === "confirm" ? "chấp nhận" : "hủy bỏ"}
                            </span>{" "}
                            đơn này không ?
                        </p>
                    </ModalBody>

                    <ModalFooter className="flex items-center justify-end">
                        <div className="flex gap-2 justify-end">
                            <Button
                                variant="light"
                                onClick={() => setConfirmModalOpen(false)}
                            >
                                <p className="text-black">Đóng</p>
                            </Button>
                            <Button color="primary" onClick={onSubmit}>
                                <p className="text-background">Có</p>
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Evaluation;
