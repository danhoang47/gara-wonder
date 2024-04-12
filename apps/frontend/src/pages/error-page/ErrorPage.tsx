import Lottie from "react-lottie";

import notFoundAnimation from '@/assets/not_found.json'
import { Link } from "@nextui-org/react";

function ErrorPage() {
    return (
        <div className="flex items-center justify-center flex-col h-full px-2">
            <div className="w-full max-w-80">
                <Lottie
                    options={{
                        animationData: notFoundAnimation,
                        autoplay: true,
                        loop: true,
                    }}
                />
            </div>
            <div className="my-4">
                <h1 className="text-center text-3xl font-semibold">Ôi không!</h1>
                <p className="italic text-default-400">Trang của bạn yêu cầu không được tìm thấy, trở lại trang chủ để tiếp tục</p>
            </div>
            <div>
                <Link href="/" color="primary">
                    <span className="font-medium">Tới trang chủ</span>
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;
