import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../navigation/AppNavbar';
import Select from 'react-select'

const EmployeeEdit = () => {
    const initialFormState = {
        firstName: '',
        lastName: '',
        age: '',
        workExperience: '',
        post: ''
    };
    const [employee, setEmployee] = useState(initialFormState);
    const [posts, setPosts] = useState(null);
    const[currentPost, setCurrentPost] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();

   useEffect(() => {
        if (id !== 'new') {
            fetch(`/employee/${id}`)
                .then(response => response.json())
                .then(data => setEmployee(data));
        }
    },[id, setEmployee]);

    useEffect(() => {
        fetch('/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data.map(d => ({
                    "value": d,
                    "label": d.name
                })));
            });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target
        setEmployee({ ...employee, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        employee.post = currentPost.value;
        await fetch('/employee' + (employee.id ? '/' + employee.id : ''), {
            method: (employee.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });
        setEmployee(initialFormState);
        navigate('/employees');
    }

    const title = <h2>{employee.id ? 'Edit Employee' : 'Add Employee'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Last Name</Label>
                        <Input type="text" name="lastName" id="lastName" value={employee.lastName || ''}
                               onChange={handleChange} autoComplete="lastName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">First Name</Label>
                        <Input type="text" name="firstName" id="firstName" value={employee.firstName || ''}
                               onChange={handleChange} autoComplete="firstName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">Age</Label>
                        <Input type="text" name="age" id="age" value={employee.age || ''}
                               onChange={handleChange} autoComplete="age"/>
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="stateOrProvince">Work Experience</Label>
                            <Input type="text" name="workExperience" id="workExperience" value={employee.workExperience || ''}
                                   onChange={handleChange} autoComplete="workExperience"/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="post">Post</Label>
                            <Select id="Post"
                                defaultValue={currentPost}
                                onChange={setCurrentPost}
                                options={posts}
                            />
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/employees">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default EmployeeEdit;