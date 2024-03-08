// import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { Evaluation } from "./ui";

function OrderDetail() {
    return (
        <div className="pt-10">
            <p className="text-3xl font-bold">Chi tiết đơn hàng</p>

            <div className="grid grid-cols-12 gap-4 pt-10">
                <div className="col-span-9 flex flex-col gap-5">
                    {/* Evaluation */}
                    <Evaluation />
                    {/* User Information */}
                    <div className="px-5 py-5 border-2 rounded-lg flex flex-col gap-3">
                        <p className="text-xl font-bold">Thông tin đơn hàng</p>
                        <div className="w-full h-1 border-t-2" />
                        <div className="flex  text-md">
                            <div className="w-[15rem]">
                                <p className="text-default-400">Họ và tên</p>
                                <p>Le Quy Duck</p>
                            </div>
                            <div className="w-[15rem]">
                                <p className="text-default-400">Email</p>
                                <p>lequyduc@gmail.com</p>
                            </div>
                            <div className="w-[15rem]">
                                <p className="text-default-400">
                                    Số điện thoại
                                </p>
                                <p>+849082634</p>
                            </div>
                        </div>
                    </div>
                    {/* Service Information */}
                    <div className="px-5 py-5 border-2 rounded-lg flex flex-col gap-3">
                        <p className="text-xl font-bold">Thông tin dịch vụ</p>
                        <div className="w-full h-1 border-t-2" />
                    </div>
                </div>
                <div className="w-full col-span-3 flex flex-col gap-4">
                    {/* Report button */}
                    <div className="p-5 border-2 rounded-lg ">
                        <p className="text-sm font-bold">
                            If you have any issues with the correct booking, you
                            can report it to the admin here
                        </p>
                        <Button
                            className="mt-5 w-full"
                            color="primary"
                            size="lg"
                            disableAnimation
                            startContent={
                                <FontAwesomeIcon icon={faFlag} size="lg" />
                            }
                        >
                            Report
                        </Button>
                    </div>
                    {/* Summary */}
                    <div className="px-5 py-10 border-2 rounded-lg flex flex-col gap-4">
                        <p className="text-xl font-bold">Tổng quát</p>
                        <div className="w-full h-1 border-t-2" />
                        <div className="flex justify-between">
                            <p className="text-sm text-default-400">
                                Ngày lấy xe
                            </p>
                            <p className="text-sm font-bold">
                                Mon , 4 Feb 2024 -10:00
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-default-400">
                                Ngày trả xe
                            </p>
                            <p className="text-sm font-bold">1 Xe</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-default-400">
                                Tổng số lượng xe
                            </p>
                            <p className="text-sm font-bold">
                                Thu , 48 Feb 2024 -15:00
                            </p>
                        </div>
                        <div className="w-full h-1 border-t-2" />
                        <p className="text-lg font-bold">Giá chi tiết</p>

                        <div className="flex justify-between">
                            <p className="text-sm text-default-400">
                                Giá sửa chửa
                            </p>
                            <p className="text-sm font-bold">USD 200</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-default-400">
                                Giá dịch vụ
                            </p>
                            <p className="text-sm font-bold">USD 80</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-default-400">
                                Thời gian kéo dài
                            </p>
                            <p className="text-sm font-bold">1 ngày</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-sm text-default-400">Thuế</p>
                            <p className="text-sm font-bold">USD 0</p>
                        </div>
                        <div className="w-full h-1 border-t-2" />
                        <div className="flex justify-between">
                            <p className="font-bold text-xl">Tổng cộng</p>
                            <p className="font-bold text-lg">USD 280.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OrderDetail;
