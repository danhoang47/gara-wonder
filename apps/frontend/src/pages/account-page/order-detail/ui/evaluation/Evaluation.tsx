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
import {
    CreatePayment,
    addReview,
    confirmEvaluation,
    getBasicGarageInfo,
    getOrderEvaluation,
} from "@/api";
import useSWRImmutable from "swr/immutable";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { notify } from "@/features/toasts/toasts.slice";
import { useParams } from "react-router-dom";
import { ReviewModal } from "@/core/ui";
import { Review, Service } from "@/core/types";

const ProgressButton = ({
    status,
    setModalOpen,
    setConfirmModalOpen,
    setConfirm,
    setReviewModal,
}: {
    status: number;
    setModalOpen: () => void;
    setConfirmModalOpen: () => void;
    setConfirm: () => void;
    setReviewModal: () => void;
}) => {
    if (status === 0)
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

    if (status === 4) {
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
}: {
    status?: number;
    handOverTime?: number;
    refetch: () => void;
    evaluationId?: string;
    garageId?: string;
}) {
    const { orderId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const user = useAppSelector((state) => state.user);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
    const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<string>("");
    const { data: evaluation } = useSWRImmutable("evaluation", () =>
        getOrderEvaluation(evaluationId),
    );
    const { data: garage } = useSWRImmutable("garage", () =>
        getBasicGarageInfo(garageId as string),
    );
    const dispatch = useAppDispatch();

    const onSubmit = async () => {
        if (confirm === "confirm" || confirm === "reject") {
            try {
                const result = await confirmEvaluation(
                    {
                        evaluationId: evaluation?._id,
                        type: confirm === "reject" ? 0 : 1,
                    },
                    user.token,
                );
                if (result.statusCode === 200) {
                    refetch();
                    dispatch(
                        notify({
                            type: "success",
                            title: `Đã xác nhận ${
                                confirm === "confirm" ? "chấp nhận" : "hủy bỏ"
                            } đơn hàng`,
                            description: `Đã xác nhận ${
                                confirm === "confirm" ? "chấp nhận" : "hủy bỏ"
                            } đơn khách hàng thành công`,
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
                const result = await CreatePayment(
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
    };
    const onSentReview = async (service: Partial<Service>) => {
        try {
            const result = await addReview(service, garageId, user.token);

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
    };
    return (
        <div className="border-2 rounded-lg">
            <ProgressBar status={status || 0} />
            {(status as number) < 4 ||
                ((status as number) > 0 && (
                    <div className="w-full h-1 border-t-2" />
                ))}
            <ProgressButton
                status={status || 0}
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
                            // TODO- change typo when backend update
                            // @ts-expect-error typo from backend
                            estimateTime={evaluation?.estimationDuration}
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
