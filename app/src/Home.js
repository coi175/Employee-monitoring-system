import React from 'react';
import './App.css';
import AppNavbar from './navigation/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

const Home = () => {
    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <p className="text-center">
                    Hello. It is an application to manage and monitoring employees of shop. To see list of employees go to the
                    employees page, to see list of posts go to the posts page, to see statistic, go to the statistic page.
                    <br/>
                    In employees page you can edit or create an new employer or see information about each employee.
                    <br/>
                    In posts page you can edit or create an new post or see information about each post.
                    <br/>
                    In statistic page you can see statistic of shop with diagrams.
                </p>
                <div className="text-center">
                    <img alt="logo" src={"../logo.png"}/>
                </div>
            </Container>
        </div>
    );
}

export default Home;