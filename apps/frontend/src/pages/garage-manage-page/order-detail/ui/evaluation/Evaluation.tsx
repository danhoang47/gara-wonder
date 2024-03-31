import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { useContext, useMemo, useState } from "react";
import { EvaluationModal, ProgressBar } from "./ui";
import { OrderDetailType } from "@/api/order/getOrderById";
import { handleEvaluation, moveNextStep, uploadEvaluationImage } from "@/api";
import {
    EvaluationContext,
    EvaluationInfo,
} from "@/pages/garage-manage-page/contexts/EvaluationContext";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/core/hooks";
import { notify } from "@/features/toasts/toasts.slice";

const ProgressButton = ({
    status,
    setModalOpen,
    setNextModalOpen,
}: {
    status: number;
    setModalOpen: () => void;
    setNextModalOpen: () => void;
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
    if (status === -1) {
        return (
            <div className="p-4 flex flex-col gap-6 items-end">
                <Button
                    color="primary"
                    className="w-[14rem]"
                    onClick={() => setNextModalOpen()}
                >
                    Tới thanh toán
                </Button>
            </div>
        );
    }
    return (
        <div className="p-4 flex flex-col gap-6 items-end">
            <Button
                color="primary"
                className="w-[14rem]"
                onClick={() => setNextModalOpen()}
            >
                Tới bước tiếp theo
            </Button>
        </div>
    );
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
    const [isEvaluationModalOpen, setIsEvaluationModalOpen] =
        useState<boolean>(false);
    const [isNextModalOpen, setIsNextModalOpen] = useState<boolean>(false);
    const { garageId, orderId } = useParams();
    const { evaluation } = useContext(EvaluationContext);
    const dispatch = useAppDispatch();

    const evaluationValidate: boolean = useMemo(() => {
        const keys: string[] = Object.keys(evaluation as object);
        const filledKeys =
            keys.includes("services") &&
            keys.includes("description") &&
            keys.includes("estimateDuration");
        return filledKeys;
    }, [evaluation]);
    
    const priceValidate: boolean = useMemo(() => {
        const servicesLength: boolean =
            evaluation?.services?.length === services?.length;
        const correctServices = evaluation?.services?.filter((service) => {
            return (
                services?.filter((s) => {
                    if (s._id === service.serviceId) {
                        if (
                            service.price < Number(s?.highestPrice) &&
                            service.price > 0
                        ) {
                            return s;
                        }
                    }
                }).length !== 0
            );
        });

        return servicesLength && correctServices?.length === services?.length;
    }, [evaluation, services]);

    const isHaveEvaluation: boolean = useMemo(() => {
        const list = services?.filter((e) => {
            if (e.isProvidedEvaluation) return true;
        });
        return list?.length !== 0;
    }, [services]);

    const onSubmit = async () => {
        if (evaluationValidate && priceValidate) {
            try {
                const result = await handleEvaluation(
                    garageId,
                    evaluation as EvaluationInfo,
                );
                if (result.statusCode === 200) {
                    const imageUpload = await uploadEvaluationImage(
                        garageId,
                        evaluation?.orderId as string,
                        evaluation?.evaluationImages as File[],
                    );
                    if (imageUpload.statusCode === 200) {
                        setIsEvaluationModalOpen(false);
                        dispatch(
                            notify({
                                type: "success",
                                title: "Gửi Đánh Giá Thành Công",
                                description:
                                    "Gửi đánh giá tới khách hàng thành công",
                                delay: 2000,
                            }),
                        );
                    }
                }
            } catch (error) {
                dispatch(
                    notify({
                        type: "failure",
                        title: "Gửi Đánh Giá Thất Bại",
                        description: "Một số lỗi xảy ra khi gửi đánh giá",
                        delay: 2000,
                    }),
                );
            }
        } else if (!evaluationValidate) {
            dispatch(
                notify({
                    type: "failure",
                    title: "Thiếu một số trường",
                    description: "Vui lòng nhập đầy đủ bảng đánh giá",
                    delay: 3000,
                }),
            );
        } else if (!priceValidate) {
            dispatch(
                notify({
                    type: "failure",
                    title: "Nhập sai giá tiền",
                    description: "Vui lòng nhập đúng giá tiền ",
                    delay: 3000,
                }),
            );
        }
    };

    const onMoveNext = async () => {
        try {
            const result = await moveNextStep(garageId, { orderId: orderId });
            if (result.statusCode === 200) {
                setIsNextModalOpen(false);
                dispatch(
                    notify({
                        type: "success",
                        title: "Di chuyển tới bước tiếp theo thành công",
                        description: "Di chuyển tới bước tiếp theo thành công",
                        delay: 2000,
                    }),
                );
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            dispatch(
                notify({
                    type: "failure",
                    title: "Lỗi",
                    description: "Di chuyển tới bước tiếp theo thất bại",
                    delay: 2000,
                }),
            );
        }
    };

    return (
        <div className="border-2 rounded-lg">
            <ProgressBar
                status={status || 0}
                isProvideEvaluation={isHaveEvaluation}
            />
            <div className="w-full h-1 border-t-2" />
            <ProgressButton
                status={status || 0}
                setModalOpen={() => {
                    setIsEvaluationModalOpen(true);
                }}
                setNextModalOpen={() => {
                    setIsNextModalOpen(true);
                }}
            />
            <Modal
                isOpen={isEvaluationModalOpen}
                onOpenChange={() => setIsEvaluationModalOpen(false)}
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
                                onClick={() => {
                                    setIsEvaluationModalOpen(false);
                                }}
                            >
                                <p className="text-black">Đóng</p>
                            </Button>
                            <Button color="primary" onClick={onSubmit}>
                                <p className="text-background">
                                    Gửi tới khách hàng
                                </p>
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isNextModalOpen}
                onOpenChange={() => setIsNextModalOpen(false)}
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
                            Bạn có muốn di chuyển tới bước tiếp theo ?
                        </p>
                    </ModalBody>

                    <ModalFooter className="flex items-center justify-end">
                        <div className="flex gap-2 justify-end">
                            <Button
                                variant="light"
                                onClick={() => setIsNextModalOpen(false)}
                            >
                                <p className="text-black">Đóng</p>
                            </Button>
                            <Button color="primary" onClick={onMoveNext}>
                                <p className="text-background">
                                    Tới bước tiếp theo
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
