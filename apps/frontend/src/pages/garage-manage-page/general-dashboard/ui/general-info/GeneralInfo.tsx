import { getDashboardInfo } from "@/api";
import { useAppSelector } from "@/core/hooks";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { mutate } from "swr";

function GeneralInfo({ garageId }: { garageId?: string }) {
    const [selectType, setSelectType] = useState<string>("today");
    const userData = useAppSelector((state) => state.user);

    const { data: generalData } = useSWR(
        userData.token ? "tabData" : null,
        () => getDashboardInfo(garageId, userData.token, selectType),
    );
    useEffect(() => {
        mutate("tabData"); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectType]);

    return (
        <div className="w-full border-b-1 pb-[7.5rem]">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-2xl">
                    Hôm nay bạn có gì mới ?
                </p>
                <Tabs
                    color="primary"
                    aria-label="Tabs colors"
                    radius="sm"
                    selectedKey={selectType}
                    onSelectionChange={(e: React.Key) => {
                        setSelectType(e as string);
                    }}
                    classNames={{
                        tabList: "bg-white",
                        cursor: "rounded-md",
                    }}
                >
                    <Tab key="today" title="Hôm nay" />
                    <Tab key="tommorow" title="Ngày mai" />
                </Tabs>
            </div>
            <div className="gridView pt-10 ">
                <div className="max-w-[12rem] h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100">
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <FontAwesomeIcon icon={faCar} />
                            <p>{generalData?.numberOfOrderCheckInToday}</p>
                        </div>
                        <p className="text-medium pt-3">Check-ins</p>
                    </div>
                </div>
                <div className="max-w-[12rem] h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100">
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <FontAwesomeIcon icon={faCar} />
                            <p>{generalData?.numberOfOrderCheckOutToday}</p>
                        </div>
                        <p className="text-medium pt-3">Checkouts</p>
                    </div>
                </div>
                <div className="max-w-[15rem] h-32 p-4 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100">
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <FontAwesomeIcon icon={faCar} />
                            <p>{generalData?.numberOfOrderInProgress}</p>
                        </div>
                        <p className="text-medium pt-3">Đang sửa chữa</p>
                    </div>
                </div>
                <div className="max-w-[12rem] h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100">
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <FontAwesomeIcon icon={faCar} />
                            <p>{generalData?.numberOdOrderNeedToEvaluate}</p>
                        </div>
                        <p className="text-medium pt-3">Chờ đánh giá</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralInfo;
