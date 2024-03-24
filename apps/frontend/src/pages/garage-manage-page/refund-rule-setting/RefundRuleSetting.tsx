import { faGem } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    RadioGroup,
} from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomSelect } from "./ui";

export default function RefundRuleSetting() {
    const navigate = useNavigate();
    const [groupSelected, setGroupSelected] = useState<string>();

    return (
        <div className="relative grid grid-cols-12 gap-5 px-10 mt-10 h-full">
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
                            value={groupSelected}
                            classNames={{
                                wrapper: "gap-3",
                                label: "max-w-full",
                            }}
                            onValueChange={(value: string) =>
                                setGroupSelected(value)
                            }
                        >
                            <CustomSelect value="1" className="max-w-full">
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
                            <CustomSelect value="2" className="max-w-full">
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
                                value="3"
                                className="max-w-full"
                                onValueChange={(isSelected: boolean) => {
                                    console.log(isSelected);
                                }}
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
            <div className="fixed flex w-44 gap-4 bottom-[5rem] left-[calc((100%-11rem)/2)]">
                <Button
                    variant="light"
                    radius="full"
                    onClick={() => {
                        navigate("..");
                    }}
                >
                    Hủy
                </Button>
                <Button className="" color="primary" radius="full">
                    Lưu
                </Button>
            </div>
        </div>
    );
}
