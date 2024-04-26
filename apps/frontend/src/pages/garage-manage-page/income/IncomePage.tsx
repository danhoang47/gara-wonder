import { Chart } from "@/core/ui";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { months } from "./constraints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { getGarageIncome } from "@/api";
import { useAppSelector } from "@/core/hooks";
import { years } from "@/pages/admin/constants";
import { formatCurrency } from "@/utils";

const labels = months.map((month) => month.short);

function IncomePage() {
    const garageId = useAppSelector((state) => state.user.value?.garageId);
    const user = useAppSelector((state) => state.user);

    const [selectedMonth, setSelectedMonth] = useState<number>(0);
    const [selectedYear, setSelectedYear] = useState<number[]>([
        Number(new Date().getFullYear()),
    ]);

    const {
        isLoading,
        data: chartData,
        mutate: refetch,
    } = useSWR(user.token ? "getChart" : null, () => {
        if (user.token)
            return getGarageIncome(garageId, user.token, selectedYear[0]);
    });

    const chartArray = useMemo(() => {
        const result = Object.keys((chartData?.data as object) ?? {}).map(
            (e: string) => chartData.data[e] as number,
        );
        const sum = Object.keys((chartData?.data as object) ?? {}).reduce(
            (state: number, next: string) =>
                state + chartData?.data[next as string],
            0,
        );
        return { chart: result, sum: sum };
    }, [chartData]);
    const changeButton = (direction: string) => {
        if (selectedMonth === 0) {
            setSelectedYear(
                direction == "left"
                    ? [selectedYear[0] - 1]
                    : [selectedYear[0] + 1],
            );
        } else if (direction == "left") {
            if (selectedMonth === 1) {
                setSelectedMonth(months.length);
                setSelectedYear([selectedYear[0] - 1]);
            } else {
                setSelectedMonth(selectedMonth - 1);
            }
        } else {
            if (selectedMonth === months.length) {
                setSelectedMonth(1);
                setSelectedYear([selectedYear[0] + 1]);
            } else {
                setSelectedMonth(selectedMonth + 1);
            }
        }
    };

    useEffect(() => {
        refetch();
    }, [selectedYear]);
    useEffect(() => {
        document.title = "Admin";
    }, []);

    if (!isLoading)
        return (
            <div className="px-10">
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold">
                        Đây là thu nhập của garage
                    </p>
                    <Select
                        label="Chọn năm"
                        className="w-[20rem] py-5"
                        size="sm"
                        isRequired
                        value={String(selectedYear)}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setSelectedYear([Number(e.target.value)]);
                        }}
                    >
                        {years.map((year) => (
                            <SelectItem key={year.key} value={year.key}>
                                {year.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                <div className="">
                    <p className="text-3xl text-black font-medium pt-5">
                        {formatCurrency(chartArray.sum)}
                    </p>
                    <p className="text-medium  font-medium pb-5">
                        Revenue in {selectedYear}
                    </p>
                    <p className="text-center text-xl font-bold">
                        {selectedMonth !== 0
                            ? `${months[selectedMonth - 1].long} ${selectedYear}`
                            : selectedYear}
                    </p>
                    <div>
                        <Chart
                            labels={labels}
                            label1="Đã thu"
                            data1={chartArray.chart}
                        />
                        <div className="flex justify-between">
                            <div>
                                {selectedYear[0] > 2018 && (
                                    <div
                                        className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer hover:bg-default-200 transition-colors "
                                        onClick={() => changeButton("left")}
                                    >
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </div>
                                )}
                            </div>

                            {selectedYear[0] <
                                Number(new Date().getFullYear()) && (
                                <div
                                    className="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer hover:bg-default-200 transition-colors "
                                    onClick={() => changeButton("right")}
                                >
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default IncomePage;
