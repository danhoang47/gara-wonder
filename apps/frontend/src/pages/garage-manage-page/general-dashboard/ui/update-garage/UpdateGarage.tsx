import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";

function UpdateGarage() {
    const [selectType, setSelectType] = useState<string>("today");
    return (
        <div className="w-full border-b-1 pt-5 pb-[7.5rem]">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-2xl">Chỉnh sửa garage</p>
                {/* <Tabs
                    color="primary"
                    aria-label="Tabs colors"
                    radius="sm"
                    selectedKey={selectType}
                    onSelectionChange={(e: React.Key) => {
                        console.log(e);
                        setSelectType(e as string);
                    }}
                >
                    <Tab key="today" title="Hôm nay" />
                    <Tab key="tommorow" title="Ngày mai" />
                </Tabs> */}
            </div>
            <div className="flex justify-between pt-10">
                <div className="min-w-32 h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100">
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <FontAwesomeIcon icon={faCar} />
                            <p>0</p>
                        </div>
                        <p className="text-lg pt-3">Check-ins</p>
                    </div>
                </div>
                <div className="min-w-32 h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100">
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <FontAwesomeIcon icon={faCar} />
                            <p>0</p>
                        </div>
                        <p className="text-lg pt-3">Checkouts</p>
                    </div>
                </div>
                <div className="min-w-32 h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100">
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <FontAwesomeIcon icon={faCar} />
                            <p>0</p>
                        </div>
                        <p className="text-lg pt-3">Đang sửa chữa</p>
                    </div>
                </div>
                <div className="min-w-32 h-32 p-5 flex justify-center items-center shadow-md rounded-lg border-1 border-default-100">
                    <div>
                        <div className="font-semibold text-2xl flex gap-3 items-center">
                            <FontAwesomeIcon icon={faCar} />
                            <p>0</p>
                        </div>
                        <p className="text-lg pt-3">Chờ đánh giá</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdateGarage;
