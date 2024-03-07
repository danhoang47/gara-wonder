import {
    faLayerGroup,
    faFileLines,
    faGear,
    faMoneyBills,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Accordion,
    AccordionItem,
    Button,
    Input,
    Radio,
    RadioGroup,
    Textarea,
} from "@nextui-org/react";
const ProgressBar = () => {
    return (
        <div className=" flex  items-center justify-center px-auto py-5 pb-10  ">
            <div className="relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3 text-white border-primary bg-primary">
                <FontAwesomeIcon icon={faFileLines} size="2xl" />
                <p className="absolute  -bottom-7 text-sm font-semibold text-primary-500  whitespace-nowrap">
                    Đánh giá
                </p>
            </div>

            <div className="min-w-20 h-1 bg-primary" />
            <div className="relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3 text-primary-500 border-primary-500">
                <FontAwesomeIcon icon={faLayerGroup} size="2xl" />
                <p className="absolute  -bottom-7 text-sm font-semibold text-primary-500  whitespace-nowrap">
                    Chuẩn bị
                </p>
            </div>
            <div className="min-w-20 h-1 bg-default-500" />
            <div className="relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3 text-default-500 border-default-500">
                <FontAwesomeIcon icon={faGear} size="2xl" />
                <p className="absolute  -bottom-7 text-sm font-semibold text-default-500  whitespace-nowrap">
                    Chỉnh sửa
                </p>
            </div>
            <div className="min-w-20 h-1 bg-default-500" />
            <div className="relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3 text-default-500 border-default-500">
                <FontAwesomeIcon icon={faMoneyBills} size="2xl" />
                <p className="absolute  -bottom-7 text-sm font-semibold text-default-500  whitespace-nowrap">
                    Thanh toán
                </p>
            </div>
        </div>
    );
};
function Evalutation() {
    return (
        <div className="border-2 rounded-lg">
            <Accordion>
                <AccordionItem key="1" title={<ProgressBar />} hideIndicator>
                    <div className="flex flex-col gap-4 p-5">
                        <p className="text-center text-2xl font-bold">
                            Đánh giá
                        </p>
                        <div className="w-full h-1 border-t-2" />
                        <div className="flex flex-col gap-3">
                            <p className=" text-xl font-semibold">Dịch vụ</p>
                            <div className="flex justify-between">
                                <p className="text-lg">Sửa chửa</p>
                                <input
                                    type="text"
                                    value={"30"}
                                    className="w-10 text-center text-lg outline-none"
                                />
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg">Rửa xe</p>
                                <input
                                    type="text"
                                    value={"30"}
                                    className="w-10 text-center text-lg outline-none"
                                />
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg">Ngày lấy xe</p>
                                <p className="text-lg">
                                    Mon , 4 Feb 2024 -10:00
                                </p>
                            </div>
                        </div>

                        <div className="w-full h-1 border-t-2" />
                        <div className="flex flex-col gap-3">
                            <p className=" text-xl font-semibold">
                                Ước tính thời gian hoàn thành
                            </p>
                            <RadioGroup>
                                <Radio value="1">Cùng ngày</Radio>
                                <Radio value="2">Đúng ngày</Radio>
                                <Radio value="3">Trong khoảng thời gian</Radio>
                                <Radio value="4">Chưa thể ước tính</Radio>
                            </RadioGroup>
                        </div>

                        <div className="w-full h-1 border-t-2" />
                        <div className="flex flex-col gap-3">
                            <p className=" text-xl font-semibold">Dịch vụ</p>
                            <div className="flex justify-between">
                                <p className="text-lg">Sửa chửa</p>
                                <p className="text-lg">30$</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg">Rửa xe</p>
                                <p className="text-lg">30$</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-lg">Ngày lấy xe</p>
                                <p className="text-lg">
                                    Mon , 4 Feb 2024 -10:00
                                </p>
                            </div>
                        </div>

                        <div className="w-full h-1 border-t-2" />
                        <div className="flex flex-col gap-3">
                            <p className=" text-xl font-semibold">
                                Miêu tả tổng quát
                            </p>
                            <Textarea
                                variant="bordered"
                                placeholder="Nhập "
                                className="w-full"
                                maxRows={10}
                                minRows={6}
                                size="lg"
                            />
                        </div>
                        <div className="w-full h-1 border-t-2" />
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <p>Tổng cộng:</p>
                                <p className="font-bold text-black text-2xl">
                                    USD 280
                                </p>
                            </div>
                            <div className="flex gap-2 py-2 justify-end px-4">
                                <Button variant="light">
                                    <p className="text-black">Xóa</p>
                                </Button>
                                <Button color="primary">
                                    <p className="text-background">
                                        Gửi tới khách hàng
                                    </p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default Evalutation;
