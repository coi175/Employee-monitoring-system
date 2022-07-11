package com.coi.Employee.monitoring.system.service.serviceIml;

import com.coi.Employee.monitoring.system.domain.Employee;
import com.coi.Employee.monitoring.system.domain.EmployeeStatistic;
import com.coi.Employee.monitoring.system.domain.Post;
import com.coi.Employee.monitoring.system.repos.EmployeeRepository;
import com.coi.Employee.monitoring.system.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceIml implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public Optional<Employee> findEmployeeById(int id) {
        return employeeRepository.findById(id);
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.saveAndFlush(employee);
    }

    @Override
    public List<Employee> findAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public void removeEmployee(int id) {
        employeeRepository.deleteById(id);
    }
}
