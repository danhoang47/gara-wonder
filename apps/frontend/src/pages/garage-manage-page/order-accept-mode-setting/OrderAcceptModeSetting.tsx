import { getGarageSetting, updateGarageSetting } from "@/api";
import { LoadingContext } from "@/core/contexts/loading";
import { useAppDispatch, useAppSelector, useAuthLoading } from "@/core/hooks";
import { notify } from "@/features/toasts/toasts.slice";
import { faGem } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BreadcrumbItem, Breadcrumbs, Button, Switch } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

export default function OrderAcceptModeSetting() {
    const navigate = useNavigate();
    const garageId = useAppSelector(state => state.user.value?.garageId)
    const [mode, setMode] = useState<boolean>();
    const { load, unload } = useContext(LoadingContext);
    const dispatch = useAppDispatch();

    const { isLoading, data: setting } = useSWRImmutable(
        `${garageId}/management/mode`,
        getGarageSetting,
    );
    
    useEffect(() => {
        if (!isLoading) {
            setMode(setting?.isAcceptOrderAuto);
            unload("setting");
        } else {
            load("setting");
        }
    }, [isLoading]);

    const onSave = () => {
        if (mode !== setting?.isAcceptOrderAuto) {
            updateGarageSetting(`${garageId}/management/mode`).then((resp) => {
                if (resp.statusCode === 200) {
                    dispatch(
                        notify({
                            type: "success",
                            title: "Thay Đổi Cài Đặt Thành Công",
                            description:
                                "Thay đồi cài đặt garage tới khách hàng thành công",
                            delay: 2000,
                        }),
                    );
                    navigate("..");
                }
            });
        }
    };
    return (
        <div className=" relative grid grid-cols-12 gap-5 px-10 mt-10 h-[95%]">
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
                            isSelected={mode}
                            size="sm"
                            onChange={() => {
                                setMode(!mode);
                            }}
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
            <div className="absolute flex w-44 gap-4 bottom-[3rem] left-[calc((100%-11rem)/2)]">
                <Button
                    variant="light"
                    radius="full"
                    onClick={() => {
                        navigate("..");
                    }}
                >
                    Hủy
                </Button>
                <Button
                    className=""
                    color="primary"
                    radius="full"
                    onClick={() => onSave()}
                >
                    Lưu
                </Button>
            </div>
        </div>
    );
}
