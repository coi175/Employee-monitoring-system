package com.coi.Employee.monitoring.system.service.serviceIml;

import com.coi.Employee.monitoring.system.domain.EmployeeStatistic;
import com.coi.Employee.monitoring.system.repos.EmployeeStatisticRepository;
import com.coi.Employee.monitoring.system.service.EmployeeStatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeStatisticServiceIml implements EmployeeStatisticService {
    @Autowired
    EmployeeStatisticRepository employeeStatisticRepository;

    @Override
    public Optional<EmployeeStatistic> findEmployeeStatisticById(int id) {
        return employeeStatisticRepository.findById(id);
    }

    @Override
    public EmployeeStatistic createStatistic(int attendance, int sales) {
        EmployeeStatistic employeeStatistic = new EmployeeStatistic();
        employeeStatistic.setAttendance(attendance);
        employeeStatistic.setSales(sales);
        return employeeStatisticRepository.saveAndFlush(employeeStatistic);
    }

    @Override
    public List<EmployeeStatistic> findAll() {
        return employeeStatisticRepository.findAll();
    }
}
