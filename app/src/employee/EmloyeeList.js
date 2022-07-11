import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../navigation/AppNavbar';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('/employees')
            .then(response => response.json())
            .then(data => {
                setEmployees(data);
                setLoading(false);
            })
    }, []);

    const remove = async (id) => {
        await fetch(`/employee/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedEmployees = [...employees].filter(i => i.id !== id);
            setEmployees(updatedEmployees);
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const employeeList = employees.map(employee => {
        return <tr key={employee.id}>
            <td style={{whiteSpace: 'nowrap'}}>{employee.lastName}</td>
            <td>{employee.firstName}</td>
            <td>{employee.post.name}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="secondary" tag={Link} to={"/employee/" + employee.id}>Show</Button>
                    <Button size="sm" color="primary" tag={Link} to={"/employees/" + employee.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(employee.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/employees/new">Add Employee</Button>
                </div>
                <h3>Employees</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Last Name</th>
                        <th width="20%">First Name</th>
                        <th>Post</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employeeList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default EmployeeList;
