package com.coi.Employee.monitoring.system.repos;

import com.coi.Employee.monitoring.system.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {

}
