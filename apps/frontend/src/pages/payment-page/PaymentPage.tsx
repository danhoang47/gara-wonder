import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import { useSearchParams } from "react-router-dom";

import paymentSuccessAnimation from "@/assets/payment_success.json";
import useSWRImmutable from "swr/immutable";
import { persistPayment } from "@/api";
import { useAppSelector, useLoadingContext } from "@/core/hooks";

const title = (stt: string) => `Thanh toán ${stt}`;
const description = (
    orderId: string,
    stt: string,
) => `Đơn hàng ${orderId} đã được thanh toán ${stt}.
Bạn có thể trở lại trang chủ hoặc vào xem danh sách đơn`;

function PaymentPage() {
    const [urlSearchParams] = useSearchParams();
    const user = useAppSelector((state) => state.user.value);
    const { load, unload } = useLoadingContext();
    const params = useMemo(() => {
        const orderId = urlSearchParams.get("orderId");
        const vnp_TxnRef = urlSearchParams.get("vnp_TxnRef");
        const vnp_ResponseCode = urlSearchParams.get("vnp_ResponseCode");
        const vnp_PayDate = urlSearchParams.get("vnp_PayDate");
        const garageId = urlSearchParams.get("garageId");
        const type = urlSearchParams.get("type");

        return {
            orderId,
            vnp_PayDate,
            vnp_TxnRef,
            vnp_ResponseCode,
            garageId,
            type,
        };
    }, [urlSearchParams]);
    const isSuccess = useMemo(() => params.vnp_ResponseCode === "00", [params]);
    const isValidURL = useMemo(() => {
        return (
            Object.keys(params).length === 4 &&
            Object.values(params).every((v) => v)
        );
    }, [params]);
    const { isLoading } = useSWRImmutable(
        params.vnp_ResponseCode === "00" ? params : null,
        () => persistPayment(params),
    );

    useEffect(() => {
        if (!isValidURL) {
            unload("payment");
        }
    }, [isValidURL, unload]);

    useEffect(() => {
        if (isLoading) {
            load("payment");
        } else {
            unload("payment");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <div className="h-[calc(100vh-81px)] flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="w-32 h-32">
                    <Lottie
                        options={{
                            animationData: paymentSuccessAnimation,
                            autoplay: true,
                            loop: true,
                        }}
                    />
                </div>
                <div className="max-w-80">
                    <h1 className="font-semibold text-2xl text-center">
                        {title(isSuccess ? "thành công" : "thất bại")}
                    </h1>
                    <p className="text-center">
                        {description(
                            params.orderId!,
                            isSuccess ? "thành công" : "thất bại",
                        )}
                    </p>
                </div>
                <div className="flex gap-4 mt-8 items-center">
                    <Link to="/garages" className="display-flex justify-content-center align-items-center">
                        <span className="font-medium text-foreground ">
                            Trở lại trang chủ
                        </span>
                    </Link>
                    <Link
                        to={
                            params?.type
                                ? `/garages/management/billing-history`
                                : "/account/orders"
                        }
                        className="h-10 py-3 px-4 bg-primary rounded-large flex items-center"
                    >
                        <span className="font-medium text-background">
                            {params.type
                                ? "Xem lịch sử thanh toán"
                                : "Xem danh sách đơn"}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
