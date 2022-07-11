import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {Button, ButtonGroup, Container, Form, FormGroup, Input, Label, Table} from 'reactstrap';
import AppNavbar from '../navigation/AppNavbar';
import PostChart from "../statistic/PostChart";
import EmployeesChart from "./EmployeesChart";
import WorkExperienceChart from "./WorkExperienceChart";

const Statistic = () => {
    const [radio, setRadio] = useState('1');
    const navigate = useNavigate();
    const {id} = useParams();

    const title = <h2 className="text-center">{"Shop Statistic"}</h2>;

    const getStatistic = () => {
        if (radio === undefined) {
            return null;
        } else if (radio === '1') {
            return <div className={"row justify-content-center"}>
                        <div className = {"col-md-4"}>
                            <PostChart/>
                        </div>
                    </div>
        } else if (radio === '2') {
            return <div className={"row justify-content-center"}>
                        <div className = {"col-md-8"}>
                            <EmployeesChart/>
                        </div>
                   </div>
        } else if (radio === '3') {
            return <div className={"row justify-content-center"}>
                <div className = {"col-md-8"}>
                    <WorkExperienceChart/>
                </div>
            </div>
        }
    }

    const handleChange=(e)=>{
        setRadio(e.target.value);
    }

    return (<div>
            <AppNavbar/>
            <Container fluid>
                {title}
                <Form className={"row mt-4 justify-content-center"}>
                    <FormGroup className={"col-md-2 text-center"}>
                        <Input defaultChecked={radio} type="radio" value="1" id="postStat"
                               onChange={handleChange} name="stat"/> <Label htmlFor="postStat">Post Statistic</Label>
                    </FormGroup>
                    <FormGroup className={"col-md-2 text-center"}>
                        <Input type="radio" value="2" id="employeesStat"
                               onChange={handleChange} name="stat"/> <Label htmlFor="employeesStat">Employees Statistic</Label>

                    </FormGroup>
                    <FormGroup className={"col-md-2 text-center"}>
                        <Input type="radio" value="3" id="someStat"
                               onChange={handleChange} name="stat"/> <Label htmlFor="someStat">Work Experience</Label>
                    </FormGroup>
                </Form>
                {getStatistic()}
            </Container>
        </div>
    )
};

export default Statistic;