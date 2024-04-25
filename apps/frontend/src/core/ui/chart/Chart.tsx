import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "./Chart.styles.scss";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const plugin = {
    id: "chart",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    beforeInit(chart: any) {
        // Get reference to the original fit function
        const originalFit = chart.legend.fit;

        // Override the fit function
        chart.legend.fit = function fit() {
            // Call original function and bind scope in order to use `this` correctly inside it
            originalFit.bind(chart.legend)();
            // Change the height as suggested in another answers
            this.height += 30;
        };
    },
};

type ChartType = {
    labels: string[];
    label1: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data1: any[];
};

function DualLineChart({ labels, label1, data1 }: ChartType) {
    return (
        <div className="chart-wrapper">
            <Line
                plugins={[plugin]}
                data={{
                    labels,
                    datasets: [
                        {
                            label: label1,
                            data: data1,
                            backgroundColor: "#4361ee",
                            borderColor: "#4361ee",
                            borderWidth: 1,
                            tension: 0.4,
                        },
                       
                    ],
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                display: false,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            position: "top",
                            align: "start",
                            labels: {
                                font: {
                                    size: 12,
                                    family: "'Poppins', 'sans-serif'",
                                },
                            },
                            title: {
                                display: true,
                            },
                        },
                    },
                }}
            />
        </div>
    );
}

export default DualLineChart;
