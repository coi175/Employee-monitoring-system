package com.coi.Employee.monitoring.system.service.serviceIml;

import com.coi.Employee.monitoring.system.domain.Post;
import com.coi.Employee.monitoring.system.repos.PostRepository;
import com.coi.Employee.monitoring.system.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceIml implements PostService {
    @Autowired
    PostRepository postRepository;

    @Override
    public Optional<Post> findPostById(int id) {
        return postRepository.findById(id);
    }

    @Override
    public Post createPost(Post post) {
        return postRepository.saveAndFlush(post);
    }

    @Override
    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }


    @Override
    public void removePost(int id) {
        postRepository.deleteById(id);
    }
}
