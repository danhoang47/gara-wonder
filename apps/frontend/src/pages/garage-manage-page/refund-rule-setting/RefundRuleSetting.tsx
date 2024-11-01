import { faGem } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    RadioGroup,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomSelect } from "./ui";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { LoadingContext } from "@/core/contexts/loading";
import { getGarageSetting, updateGarageSetting } from "@/api";
import useSWRImmutable from "swr/immutable";
import { notify } from "@/features/toasts/toasts.slice";

export default function RefundRuleSetting() {
    const navigate = useNavigate();
    const garageId = useAppSelector((state) => state.user.value?.garageId);
    const [mode, setMode] = useState<string>();
    const { load, unload } = useContext(LoadingContext);
    const dispatch = useAppDispatch();

    const { isLoading, data: setting } = useSWRImmutable(
        `${garageId}/management/refund-policy`,
        getGarageSetting,
    );
    useEffect(() => {
        if (!isLoading) {
            setMode(String(setting?.refundPolicy));
            unload("setting");
        } else {
            load("setting");
        }
    }, [isLoading]);
    const onSave = () => {
        if (mode !== setting?.refundPolicy) {
            updateGarageSetting(`${garageId}/management/refund-policy`, {
                policy: mode,
            }).then((resp) => {
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
        <div className="relative grid grid-cols-12 gap-5 px-10 mt-10 h-[95%]">
            <div className="col-span-6 col-start-4 lg:col-span-4 lg:col-start-4">
                <Breadcrumbs>
                    <BreadcrumbItem
                        onClick={() => {
                            navigate("..");
                        }}
                    >
                        Chung
                    </BreadcrumbItem>
                    <BreadcrumbItem className="font-bold">
                        Chế độ hoàn trả
                    </BreadcrumbItem>
                </Breadcrumbs>
                <div className="mt-2">
                    <p className="text-2xl font-semibold">
                        Chế độ hoàn trả thanh toán
                    </p>
                    <p className="text-default-400 text-sm">
                        Tùy chỉnh chế độ hoàn trả các thanh toán từ khách hàng
                        trong garage của bạn bạn
                    </p>
                </div>
                <div className="pt-5">
                    <p className="text-sm font-medium">Chế độ hoàn trả</p>
                    <div className="flex flex-col w-full">
                        <RadioGroup
                            value={mode}
                            classNames={{
                                wrapper: "gap-3",
                                label: "max-w-full",
                            }}
                            onValueChange={(value: string) => setMode(value)}
                        >
                            <CustomSelect value="0" className="max-w-full">
                                <p className="text-sm font-medium">
                                    Hoàn trả trong vòng ít nhất 1 ngày trước khi
                                    hủy đơn
                                </p>
                                <p className="text-sm text-default-500">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Fusce luctus venenatis
                                    enim.
                                </p>
                            </CustomSelect>
                            <CustomSelect value="1" className="max-w-full">
                                <p className="text-sm font-medium">
                                    Hoàn trả trong vòng ít nhất 5 ngày trước khi
                                    hủy đơn
                                </p>
                                <p className="text-sm text-default-500">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Fusce luctus venenatis
                                    enim.
                                </p>
                            </CustomSelect>
                            <CustomSelect
                                value="2"
                                className="max-w-full"
                                variant="danger"
                            >
                                <p className="text-sm font-medium text-red-600">
                                    Không hoàn trả khi hủy đơn
                                </p>
                                <p className="text-sm text-default-500">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Fusce luctus venenatis
                                    enim.
                                </p>
                            </CustomSelect>
                        </RadioGroup>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block col-span-2 col-start-8">
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
            <div className="fixed flex w-44 gap-4 bottom-[3rem] left-[calc((100%-11rem)/2)]">
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
