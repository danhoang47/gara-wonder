import { useNavigate } from "react-router-dom";
import carIcon from "./icon/car.svg";
import certIcon from "./icon/cert.svg";
import sortIcon from "./icon/sort.svg";

function UpdateGarage() {
    const navigate = useNavigate();
    return (
        <div className="w-full border-b-1 pt-5 pb-[7.5rem]">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-2xl">Chỉnh sửa garage</p>
            </div>
            <div className="gridViewUpdate pt-10 ">
                <div
                    className="h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100 cursor-pointer transition-shadow"
                    onClick={() => navigate("./setting/order")}
                >
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <img src={sortIcon} alt="" />
                        </div>
                        <p className="text-medium pt-3">
                            Cài đặt chế độ nhận đơn
                        </p>
                    </div>
                </div>
                <div
                    className="flex-shrink-0  h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100 cursor-pointer transition-shadow"
                    onClick={() => navigate("./setting/refund")}
                >
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <img src={carIcon} alt="" />
                        </div>
                        <p className="text-medium pt-3">
                            Cài đặt Chế độ Hoàn trả thanh toán
                        </p>
                    </div>
                </div>
                <div
                    className="h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100 cursor-pointer transition-shadow"
                    onClick={() => navigate("./setting/services")}
                >
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <img src={carIcon} alt="" />
                        </div>
                        <p className="text-medium pt-3">
                            Thay đổi cài đặt dịch vụ
                        </p>
                    </div>
                </div>

                <div
                    className="h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100 cursor-pointer transition-shadow"
                    onClick={() => navigate("./setting/certificate")}
                >
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <img src={certIcon} alt="" />
                        </div>
                        <p className="text-medium pt-3">Giấy phép kinh doanh</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdateGarage;
