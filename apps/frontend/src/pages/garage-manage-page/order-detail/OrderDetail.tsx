// import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { Evaluation } from "./ui";

function OrderDetail() {
    return (
        <div className="pt-10">
            <p className="text-3xl font-bold">Chi tiết đơn hàng</p>

            <div className="grid grid-cols-10 gap-4 pt-10">
                <div className="col-span-7 flex flex-col gap-5">
                    {/* Evaluation */}
                    <Evaluation />
                    {/* Book Information */}
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
                </div>
                <div className="w-full col-span-3">
                    {/* Report button */}
                    <div className="px-5 py-5 border-2 rounded-lg ">
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
                </div>
            </div>
        </div>
    );
}
export default OrderDetail;
