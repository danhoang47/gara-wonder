import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody, Chip, Button } from "@nextui-org/react";
import Information from "./Information";
import Order from "./Order";
import Payment from "./Payment";
import { useLocation, useParams } from "react-router-dom";
import useSWR from "swr";
import { getBasicGarageInfo } from "@/api";
import { LoadingContext } from "@/core/contexts/loading";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { updateGarageStatus } from "@/api/admin";
import { notify } from "@/features/toasts/toasts.slice";

const GarageManagement: React.FC = () => {
    const location = useLocation();
    const [status, setStatus] = useState(location.state.status);
    const { garageId } = useParams();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const { load, unload } = useContext(LoadingContext);
    const { isLoading, data: garageData } = useSWR(
        user.token ? garageId : null,
        getBasicGarageInfo,
    );
    useEffect(() => {
        if (!isLoading) unload("garageData");
        else load("garageData");
    }, [isLoading]);
    const onChangeStatus = async (value: number) => {
        try {
            const result = await updateGarageStatus(garageId, value);
            if (result.statusCode === 200) {
                dispatch(
                    notify({
                        type: "success",
                        title: `Đã xác nhận thay đổi trạng thái`,
                        description: `Đã xác nhận thay đổi trạng thái garage thành công`,
                        delay: 4000,
                    }),
                );
                setStatus(value);
            }
        } catch (error) {
            dispatch(
                notify({
                    type: "failure",
                    title: "Xác nhận thất bại",
                    description: "Một số lỗi xảy ra khi xác nhận",
                    delay: 4000,
                }),
            );
        }
    };
    return (
        <div className="flex flex-col h-full">
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "10px",
                    alignItems: "center",
                }}
            >
                <h2 style={{ fontSize: 25 }}>{garageData?.data[0].name}</h2>
                {status === 0 && (
                    <Chip className="select-none" color="default">
                        <p className="font-semibold"> Đợi chấp nhận</p>
                    </Chip>
                )}
                {status === 1 && (
                    <Chip className="select-none" color="primary">
                        <p className="font-semibold">Hoạt động</p>
                    </Chip>
                )}
                {status === 2 && (
                    <Chip className="select-none" color="warning">
                        <p className="font-semibold">Đã từ chối</p>
                    </Chip>
                )}
                {status === 3 && (
                    <Chip className="select-none">
                        <p className="font-semibold">Đang tắt</p>
                    </Chip>
                )}
                {status === 4 && (
                    <Chip className="select-none" color="danger">
                        <p className="font-semibold">Cấm</p>
                    </Chip>
                )}
            </div>

            <div className="flex w-full flex-col h-[calc(85vh)]">
                <Tabs
                    aria-label="Dynamic tabs"
                    variant="underlined"
                    classNames={{
                        tab: "",
                    }}
                >
                    <Tab title="Thông tin chung" className="relative">
                        <Card className="h-full">
                            <CardBody>
                                <Information />
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab title="Đơn hàng">
                        <Card>
                            <CardBody>
                                <Order />
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab title="Thanh toán">
                        <Card>
                            <CardBody>
                                <Payment />
                            </CardBody>
                        </Card>
                    </Tab>

                    <Tab title="Nhân viên">
                        <Card>
                            <CardBody>
                                <Information />
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
                <div className="fixed flex gap-3 bottom-[2rem] right-[2rem]">
                    {status !== 0 && (
                        <>
                            <Button
                                color="danger"
                                radius="sm"
                                onClick={() => onChangeStatus(4)}
                            >
                                Cấm
                            </Button>
                            <Button
                                color="warning"
                                radius="sm"
                                onClick={() => onChangeStatus(3)}
                            >
                                Khóa hoạt động
                            </Button>
                            <Button
                                color="primary"
                                radius="sm"
                                onClick={() => onChangeStatus(1)}
                            >
                                Mở khóa hoạt động
                            </Button>
                        </>
                    )}
                    {status === 0 && (
                        <>
                            <Button
                                color="default"
                                radius="sm"
                                onClick={() => onChangeStatus(2)}
                            >
                                Từ chối garage
                            </Button>
                            <Button
                                color="primary"
                                radius="sm"
                                onClick={() => onChangeStatus(1)}
                            >
                                Chấp nhận Garage
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GarageManagement;
