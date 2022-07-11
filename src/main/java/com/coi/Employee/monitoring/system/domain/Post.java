package com.coi.Employee.monitoring.system.domain;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="post")
public class Post {
    @Id
    @GeneratedValue
    @Getter
    @Setter
    private int id;

    @Column(name="name")
    @Getter @Setter
    @NonNull
    private String name;

    @Column(name="salary")
    @Getter @Setter
    @NonNull
    private int salary;

    @Column(name="is_piecework")
    @Getter @Setter
    @NonNull
    private boolean isPiecework;

    @Column(name="bonus")
    @Getter @Setter
    @NonNull
    private int bonus;

    @Column(name="payment_per_item")
    @Getter @Setter
    @NonNull
    private int paymentPerItem;

    @OneToMany (mappedBy="post", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
    @Getter @Setter
    private Set<Employee> employees;
}
