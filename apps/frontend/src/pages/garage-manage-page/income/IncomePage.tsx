import { Chart } from "@/core/ui";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { months } from "./constraints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const labels = months.map((month) => month.short);

function IncomePage() {
    const [fakeData, setFakeData] = useState([1, 2, 3, 4, 5, 6]);
    const [selectedMonth, setSelectedMonth] = useState<number>(0);
    const [selectedYear, setSelectedYear] = useState<number>(
        Number(new Date().getFullYear()),
    );
    const changeButton = (direction: string) => {
        console.log(direction, selectedYear);
        if (selectedMonth === 0) {
            setSelectedYear(
                direction == "left" ? selectedYear - 1 : selectedYear + 1,
            );
        } else if (direction == "left") {
            if (selectedMonth === 1) {
                setSelectedMonth(months.length);
                setSelectedYear(selectedYear - 1);
            } else {
                setSelectedMonth(selectedMonth - 1);
            }
        } else {
            if (selectedMonth === months.length) {
                setSelectedMonth(1);
                setSelectedYear(selectedYear + 1);
            } else {
                setSelectedMonth(selectedMonth + 1);
            }
        }
    };

    useEffect(() => {
        console.log(selectedMonth);
    }, [selectedMonth]);
    return (
        <div className="p-10">
            <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold">Here is your revenue</p>
                <Select
                    label="Select a Month"
                    className="w-[20rem] py-5"
                    size="sm"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        console.log(e.target.value);
                        setSelectedMonth(Number(e.target.value));
                    }}
                    selectedKeys={String(selectedMonth)}
                >
                    {months.map((month, index) => (
                        <SelectItem key={index + 1} value={month.short}>
                            {month.long}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <div className="pt-5">
                <div className=" flex gap-4">
                    {/* <Select
                        label="Select a Year"
                        className="w-[20rem] py-5"
                        size="sm"
                        value={selectedYear}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            console.log(e.target.value);
                            setSelectedMonth(Number(e.target.value));
                        }}
                        onAbort={() => {
                            setSelectedMonth(-1);
                        }}
                    >
                        {months.map((month, index) => (
                            <SelectItem key={index} value={month.short}>
                                {month.long}
                            </SelectItem>
                        ))}
                    </Select> */}
                </div>

                <p className="text-3xl text-black font-medium pt-5">$0.00</p>
                <p className="text-medium  font-medium pb-5">Revenue in 2024</p>
                <p className="text-center text-xl font-bold">
                    {selectedMonth !== 0
                        ? `${months[selectedMonth - 1].long} ${selectedYear}`
                        : selectedYear}
                </p>
                <div>
                    <Chart
                        labels={labels}
                        label1="Đã thu"
                        label2="Ước tính"
                        data1={fakeData}
                        data2={[1, 4, 3, 4, 2, 5]}
                    />
                    <div className="flex justify-between">
                        <div
                            className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer hover:bg-default-200 transition-colors "
                            onClick={() => changeButton("left")}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>

                        <div
                            className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer hover:bg-default-200 transition-colors "
                            onClick={() => changeButton("right")}
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IncomePage;
