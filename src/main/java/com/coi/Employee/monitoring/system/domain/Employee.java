package com.coi.Employee.monitoring.system.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name="employee")
public class Employee {
    @Id
    @GeneratedValue
    @Getter
    @Setter
    private int id;

    @Column(name="first_name")
    @Getter @Setter
    @NonNull
    private String firstName;

    @Column(name="last_name")
    @Getter @Setter
    @NonNull
    private String lastName;

    @Column(name="age")
    @Getter @Setter
    @NonNull
    private int age;

    @Column(name="work_experience")
    @Getter @Setter
    @NonNull
    private int workExperience;

    @OneToOne (optional=false, cascade=CascadeType.ALL)
    @JoinColumn (name="statistic_id")
    @Getter @Setter
    @JsonIgnoreProperties("employee")
    private EmployeeStatistic employeeStatistic;

    @ManyToOne (optional=false)
    @JoinColumn (name="post_id")
    @Getter @Setter
    @NonNull
    @JsonIgnoreProperties("employees")
    private Post post;
}
