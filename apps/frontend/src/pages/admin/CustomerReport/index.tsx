import { getReport, updateGarageStatus } from "@/api/admin";
import { useAppDispatch } from "@/core/hooks";
import { notify } from "@/features/toasts/toasts.slice";
import { Button } from "@nextui-org/react";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const CustomerReport: React.FC = () => {
    const {
        isLoading,
        data: reportData,
        mutate,
    } = useSWR("report", () => getReport());
    const dispatch = useAppDispatch();
    const { garageId } = useParams();
    const onChangeStatus = async () => {
        try {
            const result = await updateGarageStatus(garageId, 4);
            if (result.statusCode === 200) {
                dispatch(
                    notify({
                        type: "success",
                        title: `Đã xác nhận cấm garage`,
                        description: `Đã xác nhận cấm garage thành công`,
                        delay: 4000,
                    }),
                );
                mutate();
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

    if (!isLoading)
        return (
            <div>
                <p className="text-xl font-semibold">Báo cáo của khách hàng</p>

                <div className="pt-10  flex flex-col gap-4">
                    {reportData?.data.map((report, index) => (
                        <div
                            key={index}
                            className="border-2 rounded-lg w-[800px] p-3"
                        >
                            <div className="flex justify-between">
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={report.userId?.photoURL}
                                        alt=""
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium">
                                            {report.userId?.displayName}
                                        </p>
                                        <p className="font-light text-sm">
                                            {moment(report?.updatedAt).format(
                                                "DD/MM/YYYY",
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center border-2 p-2 rounded-lg border-primary-400">
                                    <img
                                        src={
                                            report.entityId?.backgroundImage[0]
                                                ?.url
                                        }
                                        alt=""
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="font-medium">
                                            {report.entityId?.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="py-4 flex items-center justify-between">
                                <p>
                                    <span className="font-medium">
                                        Nội dung:{" "}
                                    </span>
                                    {report.content}
                                </p>
                                <div>
                                    <Button
                                        color="danger"
                                        radius="sm"
                                        onClick={() => onChangeStatus()}
                                    >
                                        Cấm Garage
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
};

export default CustomerReport;
