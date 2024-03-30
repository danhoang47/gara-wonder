import { faHandHoldingDollar, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function UpdateGarage() {
    const navigate = useNavigate();
    return (
        <div className="w-full border-b-1 pt-5 pb-[7.5rem]">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-2xl">Chỉnh sửa garage</p>
            </div>
            <div className="flex gap-4 pt-10">
                <div
                    className="max-w-[15rem] h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100 cursor-pointer transition-shadow"
                    onClick={() => navigate("./order-setting")}
                >
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <FontAwesomeIcon icon={faSort} />
                        </div>
                        <p className="text-medium pt-3">
                            Cài đặt chế độ nhận đơn
                        </p>
                    </div>
                </div>
                <div
                    className="max-w-[15rem] h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100 cursor-pointer transition-shadow"
                    onClick={() => navigate("./refund-setting")}
                >
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <FontAwesomeIcon icon={faHandHoldingDollar} />
                        </div>
                        <p className="text-medium pt-3">
                            Cài đặt Chế độ Hoàn trả thanh toán
                        </p>
                    </div>
                </div>
                <div
                    className="max-w-[15rem] h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100 cursor-pointer transition-shadow"
                    onClick={() => navigate("./services-setting")}
                >
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <FontAwesomeIcon icon={faHandHoldingDollar} />
                        </div>
                        <p className="text-medium pt-3">
                            Thay đổi cài đặt dịch vụ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdateGarage;
