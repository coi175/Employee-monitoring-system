package com.coi.Employee.monitoring.system.repos;

import com.coi.Employee.monitoring.system.domain.EmployeeStatistic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeStatisticRepository extends JpaRepository<EmployeeStatistic, Integer> {
}
