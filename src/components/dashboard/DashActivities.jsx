import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {faker} from "@faker-js/faker";
import {Box} from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const DashActivities = () => {
    const options = {

        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const dataLine = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                borderColor: '#c1beff',
                backgroundColor: '#c1beff',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                borderColor: '#9ad0f5',
                backgroundColor: '#9ad0f5',
            },
        ],
    };

    const dataPie = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Box>
                <Box sx={{
                    width:'600px',
                    border: '6px solid #ffffff',
                    ":hover": {
                        border: '6px solid rgb(193, 190, 255)',
                    }
                }}>
                    <Line
                        options={options}
                        data={dataLine} />
                </Box>
                <Box sx={{
                    width:'600px',
                    border: '6px solid #ffffff',
                    ":hover": {
                        border: '6px solid rgb(193, 190, 255)',
                    }
                }}>
                    <Bar
                        options={options}
                        data={dataLine} />
                </Box>
            </Box>
            <Box sx={{
                width:'600px',
                border: '6px solid #ffffff',
                ":hover": {
                    border: '6px solid rgb(193, 190, 255)',
                }
            }}>
                <Pie
                    options={options}
                    data={dataPie} />
            </Box>
        </Box>
    );
};

export default DashActivities;
