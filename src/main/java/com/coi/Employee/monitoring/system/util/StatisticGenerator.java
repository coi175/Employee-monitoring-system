package com.coi.Employee.monitoring.system.util;

import com.coi.Employee.monitoring.system.domain.EmployeeStatistic;

/**
 * This class imitate a statistic for employees.
 */
public class StatisticGenerator {
    public static EmployeeStatistic generateStatistic() {
        EmployeeStatistic employeeStatistic = new EmployeeStatistic();
        employeeStatistic.setAttendance(90 + (int)(Math.random() * (100-90) + 1)); // from 90 to 100 %
        employeeStatistic.setSales(80 + (int)(Math.random() * ((150-80) + 1))); // from 80 to 150 sales in month
        return employeeStatistic;
    }
}
