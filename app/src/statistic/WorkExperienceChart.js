import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";
import React, {useEffect, useState} from "react";

ChartJS.register(
    CategoryScale,
    ArcElement,
    PointElement,
    LineElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const WorkExperienceChart = () => {
    const [ages, setAges] = useState(null);
    const [workExperiences, setWorkExperiences] = useState(null);

    useEffect(() => {
        let a = [];
        let we = [];
        fetch('/statistic/workExperienceStatistic')
            .then(response => response.json())
            .then(data => {
                for(let i = 1; i < data.length; i+= 2) {
                    a.push(data[i-1]);
                    we.push(data[i]);
                }
            }).then(() => {
            setAges(a);
            setWorkExperiences(we);
        })
    }, []);

    const options = {
        responsive: true,
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: "Work Experience in years",
                    font: {
                        size: 15
                    }
                },
                ticks: {
                    precision: 0
                }
            },
            xAxes: {
                title: {
                    display: true,
                    text: "Age of employee in years",
                    font: {
                        size: 15
                    }
                }
            }
        },
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

    const data = {
        labels: ages,
        datasets: [
            {
                label: 'Work Experience',
                data: workExperiences,
                borderColor: "#3333ff",
                fill: true,
                lineTension: 0.5,
            },
        ],
    };


    return <Line type='line' options={options} data={data} />;
}

export default WorkExperienceChart;