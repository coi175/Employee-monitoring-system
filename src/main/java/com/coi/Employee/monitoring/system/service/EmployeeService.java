package com.coi.Employee.monitoring.system.service;

import com.coi.Employee.monitoring.system.domain.Employee;
import com.coi.Employee.monitoring.system.domain.EmployeeStatistic;
import com.coi.Employee.monitoring.system.domain.Post;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    public Optional<Employee> findEmployeeById(int id);

    public Employee createEmployee(Employee employee);

    public List<Employee> findAllEmployees();

    public void removeEmployee(int id);

}
