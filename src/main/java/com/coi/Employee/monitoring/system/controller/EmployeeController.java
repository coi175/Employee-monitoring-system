package com.coi.Employee.monitoring.system.controller;

import com.coi.Employee.monitoring.system.domain.Employee;
import com.coi.Employee.monitoring.system.domain.EmployeeStatistic;
import com.coi.Employee.monitoring.system.domain.Post;
import com.coi.Employee.monitoring.system.service.serviceIml.EmployeeServiceIml;
import com.coi.Employee.monitoring.system.service.serviceIml.EmployeeStatisticServiceIml;
import com.coi.Employee.monitoring.system.service.serviceIml.PostServiceIml;
import com.coi.Employee.monitoring.system.util.StatisticGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
public class EmployeeController {
    final
    EmployeeServiceIml employeeService;

    final
    EmployeeStatisticServiceIml employeeStatisticService;

    final
    PostServiceIml postService;

    public EmployeeController(EmployeeServiceIml employeeService, EmployeeStatisticServiceIml employeeStatisticService, PostServiceIml postService) {
        this.employeeService = employeeService;
        this.employeeStatisticService = employeeStatisticService;
        this.postService = postService;
    }

    @GetMapping("/employees")
    public ResponseEntity<?> listEmployees() {
        List<Employee> employees = employeeService.findAllEmployees();
        employees.sort(Comparator.comparing(Employee::getLastName));
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Integer id) {
        Optional<Employee> employee = employeeService.findEmployeeById(id);
        return employee.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @PostMapping("/employee")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) throws URISyntaxException {
        EmployeeStatistic employeeStatistic = StatisticGenerator.generateStatistic();
        Post post = postService.findPostById(employee.getPost().getId()).orElse(postService.findAllPosts().get(0));
        employee.setPost(post);
        employee.setEmployeeStatistic(employeeStatistic);
        employeeStatistic.setEmployee(employee);
        Employee result = employeeService.createEmployee(employee);
        return ResponseEntity.created(new URI("/employee" + result.getId())).body(result);
    }


    @PutMapping("/employee/{id}")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
        Employee result = employeeService.createEmployee(employee);
        Post post = postService.findPostById(employee.getPost().getId()).orElse(postService.findAllPosts().get(0));
        employee.setPost(post);
        return ResponseEntity.ok().body(result);
    }


    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Integer id) {
        employeeService.removeEmployee(id);
        return ResponseEntity.ok().build();
    }
}
