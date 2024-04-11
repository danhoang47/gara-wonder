import { useEffect, useMemo } from "react";
import Lottie from "react-lottie";
import { useSearchParams } from "react-router-dom";

import orderSuccessAnimation from '@/assets/order_success.json'
import { Button } from "@nextui-org/react";

function PaymentPage() {
    const [urlSearchParams] = useSearchParams();
    const params = useMemo(() => {
        const orderId = urlSearchParams.get("orderId");
        const status = urlSearchParams.get("status");

        return {
            orderId,
            status,
        };
    }, [urlSearchParams]);

    useEffect(() => {
        // TODO: post orderId to server for checking
    }, [])

    return (
        <div className="h-[calc(100vh-81px)] flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="w-32 h-32">
                    <Lottie
                        options={{
                            animationData: orderSuccessAnimation,
                            autoplay: true,
                            loop: true,
                        }}
                    />
                </div>
                <div className="max-w-72">
                    <h1 className="font-semibold text-2xl text-center">Thanh toán thành công</h1>
                    <p className="text-center">Đơn hàng 123as2ad2123mii221 đã được thanh toán thành công. Bạn có thể trở lại trang chủ hoặc vào xem danh sách đơn</p>
                </div>
                <div className="flex gap-2 mt-8">
                    <Button variant="light" >
                        <span className="font-medium">Trở lại trang chủ</span>
                    </Button>
                    <Button color="primary">
                        <span className="font-medium">Xem danh sách đơn</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
