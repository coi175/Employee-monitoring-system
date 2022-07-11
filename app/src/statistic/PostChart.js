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
import { Pie } from "react-chartjs-2";
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

const PostChart = () => {
    const [labels, setLabels] = useState(null);
    const [values, setValues] = useState(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        let v = [];
        let l = [];
        fetch('/statistic/postStatistic')
            .then(response => response.json())
            .then(data => {
                for(let entry of Object.entries(data)) {
                    l.push(entry[0])
                    v.push(entry[1]);
                }
            }).then(() => {
                setLabels(l);
                setValues(v);
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
            datalabels: {
                color: '#111',
                textAlign: 'center',
                font: {
                    lineHeight: 1.6
                },
            }
        },
    };

    const pieChartData = {
        labels: labels,
        datasets: [{
            data: values,
            backgroundColor: ["#2FDE00", "#00A6B4", "#ff6600", "#f3ff00", "#ff9ad3", "#6cfdff"],
            hoverBackgroundColor: ["#175000", "#003350", "#993d00", "#c6cf00", "#cd7eaa", "#59cdcf"]
        }],
    };


    return <Pie options={options} data={pieChartData} />;
}

export default PostChart;