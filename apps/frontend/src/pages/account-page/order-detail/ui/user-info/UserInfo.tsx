import { getBasicGarageInfo } from "@/api";
import { OrderDetailType } from "@/api/order/getOrderById";
import useSWRImmutable from "swr/immutable";

export default function UserInfo({ garageId }: { garageId: string }) {
    const { isLoading, data: garageData } = useSWRImmutable(
        garageId,
        getBasicGarageInfo,
    );
    if (!isLoading)
        return (
            <div className="px-5 py-5 border-2 rounded-lg flex flex-col gap-6">
                <p className="text-xl font-bold">Thông tin đơn hàng</p>
                <div className="w-full h-1 border-t-2" />
                <div className="flex  text-md">
                    <div className="w-[15rem]">
                        <p className="text-default-400">Tên Garage</p>
                        <p>{garageData?.data[0].name}</p>
                    </div>

                    <div className="w-[15rem]">
                        <p className="text-default-400">Địa chỉ</p>
                        <p> {garageData?.data[0].address}</p>
                    </div>
                </div>
            </div>
        );
}
