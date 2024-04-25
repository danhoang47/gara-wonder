import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import thư viện Chart.js
import "./tracksale.scss";
import useSWR from "swr";
import { getStatictics } from "@/api/admin";

const TrackSale: React.FC = () => {
    const { isLoading, data: chartData } = useSWR("chart", () =>
        getStatictics(),
    );
    const chartRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (chartData) {
            console.log(
                Object.keys(chartData?.data).map((e) => chartData.data[e]),
            );
        }

        if (chartRef && chartRef.current && chartData) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: [
                            "T1",
                            "T2",
                            "T3",
                            "T4",
                            "T5",
                            "T6",
                            "T7",
                            "T8",
                            "T9",
                            "T10",
                            "T11",
                            "T12",
                        ],
                        datasets: [
                            {
                                label: "Doanh số",
                                data: Object.keys(chartData?.data).map(
                                    (e) => chartData?.data[e],
                                ),
                                backgroundColor: "rgba(75, 192, 192, 0.2)",
                                borderColor: "rgba(75, 192, 192, 1)",
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        }
    }, [chartData]);

    return (
        <div className="">
            <p className="text-center text-xl font-semibold">2024</p>
            <canvas ref={chartRef} className="w-full"></canvas>
        </div>
    );
};

export default TrackSale;
