import {
    addReview,
    cancelOrder,
    confirmEvaluation,
    createPayment,
    getBasicGarageInfo,
    getOrderEvaluation,
} from "@/api";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { Review } from "@/core/types";
import { ReviewModal } from "@/core/ui";
import { notify } from "@/features/toasts/toasts.slice";
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
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import { EvaluationModal, ProgressBar } from "./ui";

const ProgressButton = ({
    status,
    setModalOpen,
    setConfirmModalOpen,
    setConfirm,
    setReviewModal,
    isProvideEvaluation,
    isReviewd: isReviewed,
}: {
    status: number;
    setModalOpen: () => void;
    setConfirmModalOpen: () => void;
    setConfirm: () => void;
    setReviewModal: () => void;
    isProvideEvaluation: boolean;
    isReviewd: boolean;
}) => {
    if (status === 0 && isProvideEvaluation)
        return (
            <>
                <div className="w-full h-1 border-t-2" />
                <div className="p-4 flex flex-col gap-6 items-end">
                    <Button
                        color="primary"
                        className="w-[14rem]"
                        onClick={() => setModalOpen()}
                    >
                        Xem Đánh giá
                    </Button>
                </div>
            </>
        );

    if (status === 3) {
        return (
            <>
                <div className="w-full h-1 border-t-2" />
                <div className="p-4 flex flex-col gap-6 items-end">
                    <Button
                        color="primary"
                        className="w-[14rem]"
                        onClick={() => {
                            setConfirmModalOpen();
                            setConfirm();
                        }}
                    >
                        Thanh toán
                    </Button>
                </div>
            </>
        );
    }
    if (status === 4 && !isReviewed) {
        return (
            <>
                <div className="w-full h-1 border-t-2" />
                <div className="p-4 flex flex-col gap-6 items-end">
                    <Button
                        color="primary"
                        className="w-[14rem]"
                        onClick={() => {
                            setReviewModal();
                        }}
                    >
                        Đánh giá dịch vụ
                    </Button>
                </div>
            </>
        );
    }
};

function Evaluation({
    status,
    handOverTime,
    refetch,
    evaluationId,
    garageId,
    reviewId,
}: {
    status?: number;
    handOverTime?: number;
    refetch: () => void;
    evaluationId?: string;
    garageId?: string;
    reviewId: boolean;
}) {
    const { orderId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
    const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<string>("");
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const { data: evaluation } = useSWRImmutable(
        evaluationId ? evaluationId : null,
        () => getOrderEvaluation(evaluationId),
    );
    const { data: garage } = useSWRImmutable(garageId ? "garage" : null, () =>
        getBasicGarageInfo(garageId as string),
    );
    const dispatch = useAppDispatch();

    const onSubmit = async () => {
        setIsButtonLoading(true);
        if (confirm === "confirm") {
            try {
                const result = await confirmEvaluation(
                    {
                        evaluationId: evaluation?._id,
                        type: 1,
                    },
                    user.token,
                );
                if (result.statusCode === 200) {
                    refetch();
                    dispatch(
                        notify({
                            type: "success",
                            title: `Đã xác nhận chấp nhận đơn hàng`,
                            description: `Đã xác nhận chấp nhận đơn khách hàng thành công`,
                            delay: 4000,
                        }),
                    );
                    setConfirmModalOpen(false);
                    setIsModalOpen(false);
                }
            } catch (error) {
                dispatch(
                    notify({
                        type: "failure",
                        title: "Xác nhận thất bại",
                        description: "Một số lỗi xảy ra khi xác nhận",
                        delay: 4000,
                    }),
                );
                setConfirmModalOpen(false);
            }
        } else if (confirm === "reject") {
            try {
                const result = await cancelOrder(garageId, orderId);
                if (result.statusCode === 200) {
                    refetch();
                    dispatch(
                        notify({
                            type: "success",
                            title: `Đã xác nhận chấp nhận đơn hàng`,
                            description: `Đã xác nhận chấp nhận đơn khách hàng thành công`,
                            delay: 4000,
                        }),
                    );
                    setConfirmModalOpen(false);
                    setIsModalOpen(false);
                }
            } catch (error) {
                dispatch(
                    notify({
                        type: "failure",
                        title: "Xác nhận thất bại",
                        description: "Một số lỗi xảy ra khi xác nhận",
                        delay: 4000,
                    }),
                );
                setConfirmModalOpen(false);
            }
        } else {
            try {
                const result = await createPayment(
                    {
                        garageId: garageId,
                        orderId: orderId,
                    },
                    user.token,
                );
                if (result.statusCode === 200) {
                    window.open(
                        result.data.paymentUrl.vnpUrl as string,
                        "_blank",
                    );
                    setConfirmModalOpen(false);
                }
            } catch (error) {
                dispatch(
                    notify({
                        type: "failure",
                        title: "Xác nhận thất bại",
                        description: "Một số lỗi xảy ra khi xác nhận",
                        delay: 4000,
                    }),
                );
                setConfirmModalOpen(false);
            }
        }
        setIsButtonLoading(false);
    };
    const onSentReview = async (review: Partial<Review>) => {
        setIsButtonLoading(false);

        try {
            const result = await addReview(
                { ...review, orderId: orderId },
                garageId,
                user.token,
            );

            if (result.statusCode === 200) {
                dispatch(
                    notify({
                        type: "success",
                        title: `Đã xác nhận đánh giá garage`,
                        description: `Đã xác nhận đánh giá garage`,
                        delay: 4000,
                    }),
                );
                setIsReviewOpen(false);
                refetch();
            }
        } catch (error) {
            dispatch(
                notify({
                    type: "failure",
                    title: "Gửi đánh giá thất bại",
                    description: "Một số lỗi xảy ra khi xác nhận",
                    delay: 4000,
                }),
            );
        }
        setIsButtonLoading(false);
    };
    return (
        <div className="border-2 rounded-lg">
            <ProgressBar status={status || 0} />
            <ProgressButton
                status={status || 0}
                isProvideEvaluation={evaluationId !== undefined}
                setConfirmModalOpen={() => {
                    setConfirmModalOpen(true);
                }}
                setConfirm={() => {
                    setConfirm("payment");
                }}
                setModalOpen={() => {
                    setIsModalOpen(true);
                }}
                setReviewModal={() => setIsReviewOpen(true)}
                isReviewd={reviewId}
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
                            services={evaluation?.services}
                            description={evaluation?.description}
                            images={evaluation?.evaluationImgs}
                            estimateTime={evaluation?.estimateDuration}
                        />
                    </ModalBody>
                    <Divider />
                    <ModalFooter className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <p>Tổng cộng:</p>
                            <p className="font-bold text-black text-2xl">
                                VND{" "}
                                {evaluation?.services?.reduce(
                                    (prev, next) => prev + next.price,
                                    0,
                                )}
                            </p>
                        </div>
                        <div className="flex gap-2 py-2 justify-end ">
                            <Button
                                isLoading={isButtonLoading}
                                variant="light"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <p className="text-black">Đóng</p>
                            </Button>
                            <Button
                                isLoading={isButtonLoading}
                                color="danger"
                                onClick={() => {
                                    setConfirmModalOpen(true);
                                    setConfirm("reject");
                                }}
                            >
                                <p className="text-background">Hủy bỏ</p>
                            </Button>
                            <Button
                                isLoading={isButtonLoading}
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
                                {confirm === "confirm" && "chấp nhận"}
                                {confirm === "reject" && "hủy bỏ"}
                                {confirm === "payment" && "thanh toán"}
                            </span>{" "}
                            đơn này không ?
                        </p>
                    </ModalBody>

                    <ModalFooter className="flex items-center justify-end">
                        <div className="flex gap-2 justify-end">
                            <Button
                                variant="light"
                                isLoading={isButtonLoading}
                                onClick={() => setConfirmModalOpen(false)}
                            >
                                <p className="text-black">Đóng</p>
                            </Button>
                            <Button
                                color="primary"
                                isLoading={isButtonLoading}
                                onClick={onSubmit}
                            >
                                <p className="text-background">Có</p>
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ReviewModal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                onSave={(review: Partial<Review>) => onSentReview(review)}
                entityId={garageId as string}
                entityName={garage?.data[0].name as string}
                isLoading={false}
            />
        </div>
    );
}

export default Evaluation;
