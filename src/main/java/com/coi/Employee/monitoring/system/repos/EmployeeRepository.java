package com.coi.Employee.monitoring.system.repos;

import com.coi.Employee.monitoring.system.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

}
