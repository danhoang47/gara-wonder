import { useEffect, useMemo } from "react";
import Lottie from "react-lottie";
import { useSearchParams } from "react-router-dom";

import paymentSuccessAnimation from '@/assets/payment_success.json'
import { Link } from "@nextui-org/react";

function PaymentPage() {
    const [urlSearchParams] = useSearchParams();
    const params = useMemo(() => {
        return undefined
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
                            animationData: paymentSuccessAnimation,
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
                    <Link href="/garages">
                        <span className="font-medium text-foreground">Trở lại trang chủ</span>
                    </Link>
                    <Link href="/user/settings" className="h-10 py-3 px-4 bg-primary rounded-large">
                        <span className="font-medium text-background">Xem danh sách đơn</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
