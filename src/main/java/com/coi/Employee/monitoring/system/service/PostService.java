package com.coi.Employee.monitoring.system.service;

import com.coi.Employee.monitoring.system.domain.Post;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface PostService {
    public Optional<Post> findPostById(int id);

    public Post createPost(Post post);

    public List<Post> findAllPosts();

    public void removePost(int id);
}
