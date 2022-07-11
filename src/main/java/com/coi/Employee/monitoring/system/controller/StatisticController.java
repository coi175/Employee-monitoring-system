package com.coi.Employee.monitoring.system.controller;

import com.coi.Employee.monitoring.system.domain.Employee;
import com.coi.Employee.monitoring.system.domain.EmployeeStatistic;
import com.coi.Employee.monitoring.system.domain.Post;
import com.coi.Employee.monitoring.system.service.serviceIml.EmployeeServiceIml;
import com.coi.Employee.monitoring.system.service.serviceIml.EmployeeStatisticServiceIml;
import com.coi.Employee.monitoring.system.service.serviceIml.PostServiceIml;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class StatisticController {
    final
    EmployeeServiceIml employeeService;

    final
    PostServiceIml postService;

    final
    EmployeeStatisticServiceIml employeeStatisticService;

    public StatisticController(EmployeeServiceIml employeeService, PostServiceIml postService, EmployeeStatisticServiceIml employeeStatisticService) {
        this.employeeService = employeeService;
        this.postService = postService;
        this.employeeStatisticService = employeeStatisticService;
    }

    @GetMapping("/statistic/postStatistic")
    public ResponseEntity<Map<String, Integer>> getPostStatistic() {
        Map<String, Integer> result = new HashMap<>();
        for(Post post : postService.findAllPosts()) {
            result.put(post.getName(), post.getEmployees().size());
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/statistic/employeesStatistic")
    public ResponseEntity<Map<String, Integer>> getEmployeesStatistic() {
        Map<String, Integer> result = new LinkedHashMap<>();
        int attendance = 0;
        int bestAttendance = 0;
        int sales = 0;
        int bestSales = 0;
        int rate = 0;
        int bestRate = 100;
        for(EmployeeStatistic employeeStatistic : employeeStatisticService.findAll()) {
            attendance += employeeStatistic.getAttendance();
            sales += employeeStatistic.getSales();
            bestAttendance += 100;
            bestSales += 150;
        }

        rate = (attendance + sales) * 100 / (bestAttendance + bestSales);

        result.put("attendance", attendance);
        result.put("sales", sales);
        result.put("rate", rate);
        result.put("bestAttendance", bestAttendance);
        result.put("bestSales", bestSales);
        result.put("bestRate", bestRate);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/statistic/workExperienceStatistic")
    public ResponseEntity<?> getWorkExperienceStatistic() {
        List<Integer> result = new ArrayList<>();
        List<Employee> employees = employeeService.findAllEmployees();
        employees.sort(Comparator.comparing(Employee::getAge));

        int i = 0;
        int age = 0;
        int sum = 0;
        for (Employee employee : employees) {
            if (i == 0) {
                sum += employee.getWorkExperience();
                age = employee.getAge();
                i++;
            }
            else if (employee.getAge() == age) {
                sum += employee.getWorkExperience();
                i++;
            } else {
                result.add(age);
                result.add(Math.round(sum / i));
                i = 1;
                age = employee.getAge();
                sum = employee.getWorkExperience();
            }
        }
        result.add(age);
        result.add(Math.round(sum / i));

        return ResponseEntity.ok(result);
    }
}
