package com.coi.Employee.monitoring.system.service;

import com.coi.Employee.monitoring.system.domain.EmployeeStatistic;

import java.util.List;
import java.util.Optional;

public interface EmployeeStatisticService {
    public Optional<EmployeeStatistic> findEmployeeStatisticById(int id);

    public EmployeeStatistic createStatistic(int attendance, int sales);

    public List<EmployeeStatistic> findAll();
}
