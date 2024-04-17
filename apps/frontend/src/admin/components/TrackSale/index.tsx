import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import thư viện Chart.js
import './tracksale.scss';

const TrackSale: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                        datasets: [{
                            label: 'Sales',
                            data: [65, 59, 80, 81, 56, 55, 40],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }
    }, []);

    return (
        <div className='track'>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default TrackSale;
