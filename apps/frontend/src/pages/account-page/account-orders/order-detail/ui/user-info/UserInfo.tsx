import { OrderDetailType } from "@/api/order/getOrderById";

export default function UserInfo({ user }: { user?: OrderDetailType["user"] }) {
    return (
        <div className="px-5 py-5 border-2 rounded-lg flex flex-col gap-3">
            <p className="text-xl font-bold">Thông tin đơn hàng</p>
            <div className="w-full h-1 border-t-2" />
            <div className="flex  text-md">
                <div className="w-[15rem]">
                    <p className="text-default-400">Họ và tên</p>
                    <p>{user?.displayName}</p>
                </div>
                <div className="w-[15rem]">
                    <p className="text-default-400">Email</p>
                    <p>{user?.email}</p>
                </div>
                <div className="w-[15rem]">
                    <p className="text-default-400">Số điện thoại</p>
                    <p> {user?.phoneNumber}</p>
                </div>
            </div>
        </div>
    );
}
