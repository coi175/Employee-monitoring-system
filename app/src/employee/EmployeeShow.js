import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {Button, ButtonGroup, Container, Form, FormGroup, Input, Label, Table} from 'reactstrap';
import AppNavbar from '../navigation/AppNavbar';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const EmployeeShow = () => {
    const initialFormState = {
        firstName: '',
        lastName: '',
        age: '',
        workExperience: '',
        post: ''
    };


    const [employee, setEmployee] = useState(initialFormState);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        fetch(`/employee/${id}`)
            .then(response => response.json())
            .then(data => setEmployee(data))
    },[]);

    const title = <h2 className="text-center">{"Employee: " + employee.lastName + " " + employee.firstName}</h2>;

    const renderStatistic = () => {
        if(employee.employeeStatistic === undefined) {
            return null;
        }
        return <tr>
            <td className="text-center" style={{whiteSpace: 'nowrap'}}>{employee.employeeStatistic.attendance + "%"}</td>
            <td className="text-center" style={{whiteSpace: 'nowrap'}}>{100 + "%"}</td>
            <td className="text-center" style={{whiteSpace: 'nowrap'}}>{employee.employeeStatistic.sales}</td>
            <td className="text-center" style={{whiteSpace: 'nowrap'}}>{150}</td>
            <td className="text-center" style={{whiteSpace: 'nowrap'}}>{(employee.employeeStatistic.attendance +
                employee.employeeStatistic.sales) / (100 + 150)}</td>
        </tr>
    }

    const renderPerItemLabel = () => {
        if(employee.post === "") {
            return null;
        }

        if(employee.post.piecework === false) {
            return <th className="text-center" width="30%">Salary + bonus:</th>
        }
        return <th className="text-center" width="30%">Salary + payment per item:</th>

    }

    const renderPerItem = () => {
        if(employee.post === "") {
            return null;
        }

        if(employee.post.piecework === false) {
            return <td className="text-center" style={{whiteSpace: 'nowrap'}}>{employee.post.salary + " + " + employee.post.bonus}</td>
        }
        return <td className="text-center" style={{whiteSpace: 'nowrap'}}>{employee.post.salary + " + "  + employee.post.paymentPerItem}</td>

    }

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

    const getStats = () => {
        if(employee.employeeStatistic === undefined) {
            return [0, 0, 0]
        }
        return [employee.employeeStatistic.attendance, employee.employeeStatistic.sales,
            (employee.employeeStatistic.sales + employee.employeeStatistic.attendance) / 250 * 100];
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Real Data',
                data: getStats(),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Best Values',
                data: [100, 150, 1 * 100],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const chart = () => {
        if(employee.employeeStatistic === undefined) {
            return null;
        }
        return <Bar options={options} data={data} />;
    }


    return (<div>
            <AppNavbar/>
            <Container fluid>
                {title}
                <div className="float-end">
                    <Button color="success" tag={Link} to="/employees">Back to employees</Button>
                </div>
                <div className="justify-content-evenly row">
                    <div className="col-md-4">
                        <Table className="mt-4">
                            <thead>
                                <tr>
                                    <th className="text-center" width="30%">Post:</th>
                                </tr>
                                <tr>
                                    <td className="text-center" style={{whiteSpace: 'nowrap'}}>{employee.post.name}</td>
                                </tr>

                                <tr>
                                    {renderPerItemLabel()}
                                </tr>
                                <tr>
                                    {renderPerItem()}
                                </tr>

                                <tr>
                                    <th className="text-center" width="30%">Age:</th>
                                </tr>
                                <tr>
                                    <td className="text-center" style={{whiteSpace: 'nowrap'}}>{employee.age}</td>
                                </tr>

                                <tr>
                                    <th className="text-center" width="30%">Work Experience:</th>
                                </tr>
                                <tr>
                                    <td className="text-center" style={{whiteSpace: 'nowrap'}}>{employee.workExperience}</td>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </Table>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <Table className="mt-4">
                                <thead>
                                    <tr>
                                        <th className="text-center" width="20%">Attendance:</th>
                                        <th className="text-center" width="20%">Best Attendance:</th>
                                        <th className="text-center" width="20%">Sales:</th>
                                        <th className="text-center" width="20%">Best sales:</th>
                                        <th className="text-center" width="20%">Success rate:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderStatistic()}
                                </tbody>
                            </Table>
                        </div>
                        <div className="row">
                            {chart()}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
};

export default EmployeeShow;