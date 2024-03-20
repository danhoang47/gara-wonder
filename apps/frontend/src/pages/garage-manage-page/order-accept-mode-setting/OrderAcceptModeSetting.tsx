import { faGem } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BreadcrumbItem, Breadcrumbs, Switch } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function OrderAcceptModeSetting() {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12 gap-5 px-10 mt-10">
            <div className="col-span-4 col-start-4">
                <Breadcrumbs>
                    <BreadcrumbItem
                        onClick={() => {
                            navigate("..");
                        }}
                    >
                        Chung
                    </BreadcrumbItem>
                    <BreadcrumbItem className="font-bold">
                        Chỉnh sửa cài đặt đơn
                    </BreadcrumbItem>
                </Breadcrumbs>
                <div className="mt-2">
                    <p className="text-2xl font-semibold">
                        Cài đặt chế độ nhận đơn
                    </p>
                    <p className="text-default-400 text-sm">
                        Tùy chỉnh chế độ nhận đơn từ khách hàng trong garage của
                        bạn
                    </p>
                </div>
                <div className="pt-5">
                    <p className="text-sm font-medium">Chế độ nhận đơn</p>
                    <div className="flex justify-between max-w-[30rem] gap-4 items-start">
                        <div className="max-w-[22rem]">
                            <p className="font-medium">
                                Kích hoạt chế độ nhận đơn tự động
                            </p>
                            <p className="font-light text-sm text-default-600">
                                Chế độ tự động có thể giúp bạn nhận những đơn
                                đặt hàng của khách, ngay cả khi bạn đang trong
                                trạng thái bận rộn.
                            </p>
                        </div>
                        <Switch
                            defaultSelected
                            size="sm"
                            aria-label="Automatic updates"
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-2 col-start-8">
                <div className="w-64 mt-7 p-4 flex justify-center border-3 border-default-500 rounded-2xl">
                    <div>
                        <FontAwesomeIcon icon={faGem} className="text-2xl" />
                        <p className="font-medium text-sm pt-2">
                            <span className="font-semibold">
                                Cài đặt chế độ nhận đơn phù hợp
                            </span>{" "}
                            có thể giúp bạn quản lý đơn đặt hàng của mình một
                            cách hiệu quả và chính xác hơn
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
