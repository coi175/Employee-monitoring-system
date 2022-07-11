package com.coi.Employee.monitoring.system.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.*;

/**
 * This class is imitates real data such as attendance, sales and etc. In future this class will be replaced by microservice,
 * which will sends the real data from other system.
 */
@Entity
@Table(name="employee_statistic")
public class EmployeeStatistic {
    @Id
    @GeneratedValue
    @Getter
    @Setter
    private int id;

    @Column(name="attendance")
    @Getter @Setter
    @NonNull
    private int attendance;

    @Column(name="sales")
    @Getter @Setter
    @NonNull
    private int sales;

    @OneToOne (optional=false, mappedBy="employeeStatistic")
    @Getter @Setter
    @JsonIgnoreProperties("employeeStatistic")
    private Employee employee;
}
