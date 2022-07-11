import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import React, {useEffect, useState} from "react";

ChartJS.register(
    CategoryScale,
    ArcElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const EmployeesChart = () => {
    const [realData, setRealData] = useState(null);
    const [bestData, setBestData] = useState(null);

    useEffect(() => {
        let rd = [];
        let bd = [];
        fetch('/statistic/employeesStatistic')
            .then(response => response.json())
            .then(data => {
                let i = 0;
                for(let entry of Object.entries(data)) {
                    if(i < 3) {
                        rd.push(entry[1]);
                    } else {
                        bd.push(entry[1]);
                    }
                    i++;
                }
            }).then(() => {
                setRealData(rd);
                setBestData(bd);
        })
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Employee Statistic',
            },
        },
    };
    const labels = ['Attendance', 'Sales', 'Rate x 100'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Real Data',
                data: realData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Best Values',
                data: bestData,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    return <Bar options={options} data={data} />;
}

export default EmployeesChart;