import { useAppSelector } from "@/core/hooks";
import { GeneralInfo, UpdateGarage } from "./ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./grids.style.scss";
import getDashboardInfo from "@/api/garages/getDashboardInfo";

import { useParams } from "react-router-dom";
import useSWR from "swr";

function GeneralDashboard() {
    const { garageId } = useParams();
    const userData = useAppSelector((state) => state.user);


    const { data: needEvaluate } = useSWR("needEvaluate", () =>
        getDashboardInfo(garageId, "needEvaluate", userData.token),
    );


    const { data: needAccept } = useSWR("needAccept", () =>
        getDashboardInfo(garageId, "needAccept", userData.token),
    );
    return (
        <div className="grid grid-cols-12 gap-5 h-full">
            <div className="pt-20 col-span-4 flex flex-col gap-[4rem] bg-default-100 px-10 overflow-hidden static ">
                <div>
                    <img
                        src={userData.value?.photoURL}
                        alt={`${userData.value?.displayName} avatar`}
                        className="w-[40px] rounded-full mb-4"
                    />
                    <p className="text-3xl font-semibold">
                        Good Morning, <br />
                        <span className="font-bold">
                            {userData.value?.displayName}
                        </span>
                    </p>
                    <div className="flex justify-between gap-3 pt-5">
                        <p>Doanh thu kiếm được trong tháng này</p>
                        <p className="text-primary font-medium shrink-0 whitespace-nowrap">
                            0 VND
                        </p>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2 pb-5">
                        <p className="text-xl font-semibold">
                            Đơn sửa chữa đang chờ
                        </p>
                        <FontAwesomeIcon icon={faChevronRight} size="1x" />
                    </div>
                    <li className="cursor-pointer hover:underline">
                        Bạn đang có{" "}
                        <span className="text-black font-medium">
                            {needAccept?.numberOfOrdersNeedToAccept}
                        </span>{" "}
                        đơn đang chờ xác nhận
                    </li>
                    <li className="cursor-pointer hover:underline">
                        Bạn đang có{" "}
                        <span className="text-black font-medium">
                            {needEvaluate?.numberOdOrderNeedToEvaluate}
                        </span>{" "}
                        đơn đang chờ đánh giá
                    </li>
                </div>
                <div>
                    <div className="flex items-center gap-2 pb-5">
                        <p className="text-xl font-semibold">Việc cần làm</p>
                        <FontAwesomeIcon icon={faChevronRight} size="1x" />
                    </div>
                    <li className="cursor-pointer hover:underline">
                        Cập nhật thông tin xác thực danh tính của bạn
                    </li>
                </div>
            </div>
            <div className="col-span-8 overflow-auto h-full pt-[8.5rem]">
                <div className="max-w-[40rem] h-full m-auto">
                    <GeneralInfo garageId={garageId} token={userData.token} />
                    <UpdateGarage />
                </div>
            </div>
        </div>
    );
}

export default GeneralDashboard;
