import React from 'react';
import '../App.css';
import Home from '../Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from "../employee/EmloyeeList";
import EmployeeEdit from '../employee/EmployeeEdit';
import EmployeeShow from "../employee/EmployeeShow"
import PostList from "../post/PostList";
import PostEdit from "../post/PostEdit";
import Statistic from "../statistic/Statistic";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path='/employees' exact={true} element={<EmployeeList/>}/>
                <Route path='/employees/:id' element={<EmployeeEdit/>}/>
                <Route path='/employee/:id' element={<EmployeeShow/>}/>

                <Route path='/posts' element={<PostList/>}/>
                <Route path='/posts/:id' element={<PostEdit/>}/>

                <Route path='/statistic' element={<Statistic/>}/>
            </Routes>
        </Router>
    )
}

export default App;