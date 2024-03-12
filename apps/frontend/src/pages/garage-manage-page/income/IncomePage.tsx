import { Chart } from "@/core/ui";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { months } from "./constraints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const labels = months.map((month) => month.short);

function IncomePage() {
    const [fakeData, setFakeData] = useState([1, 2, 3, 4, 5, 6]);
    const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
    const [selectedYear, setSelectedYear] = useState<string>(
        String(new Date().getFullYear()),
    );

    useEffect(() => {
        console.log(selectedMonth);
    }, [selectedMonth]);
    return (
        <div className="pt-10">
            <p className="text-2xl font-bold">Here is your revenue</p>
            <div className="pt-5">
                <p className="text-lg text-primary font-medium">
                    Select a month to view revenue
                </p>

                <Select
                    label="Select a Month"
                    className="w-[20rem] py-5"
                    size="sm"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setSelectedMonth(e.target.value);
                    }}
                >
                    {months.map((month) => (
                        <SelectItem key={month.long} value={month.short}>
                            {month.long}
                        </SelectItem>
                    ))}
                </Select>
                <p className="text-3xl text-black font-bold pt-5">$0.00</p>
                <p className="text-medium text-primary font-medium pb-5">
                    Revenue in 2024
                </p>
                <p className="text-center text-xl font-bold">
                    {selectedMonth ? selectedMonth : selectedYear}
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
                        <div className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer hover:bg-default-200 transition-colors ">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>

                        <div className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer hover:bg-default-200 transition-colors ">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IncomePage;
