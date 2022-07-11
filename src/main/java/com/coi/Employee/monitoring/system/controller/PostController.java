package com.coi.Employee.monitoring.system.controller;

import com.coi.Employee.monitoring.system.domain.Employee;
import com.coi.Employee.monitoring.system.domain.EmployeeStatistic;
import com.coi.Employee.monitoring.system.domain.Post;
import com.coi.Employee.monitoring.system.service.serviceIml.EmployeeServiceIml;
import com.coi.Employee.monitoring.system.service.serviceIml.PostServiceIml;
import com.coi.Employee.monitoring.system.util.StatisticGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
public class PostController {
    final
    PostServiceIml postService;

    public PostController(PostServiceIml postService) {
        this.postService = postService;
    }

    @GetMapping("/posts")
    public ResponseEntity<?> listPosts() {
        List<Post> posts = postService.findAllPosts();
        posts.sort(Comparator.comparing(Post::getName));
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Integer id) {
        Optional<Post> post = postService.findPostById(id);
        return post.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @PostMapping("/post")
    public ResponseEntity<Post> createEmployee(@RequestBody Post post) throws URISyntaxException {
        Post result = postService.createPost(post);
        return ResponseEntity.created(new URI("/post" + result.getId())).body(result);
    }


    @PutMapping("/post/{id}")
    public ResponseEntity<Post> updateEmployee(@RequestBody Post post) {
        Post result = postService.createPost(post);
        return ResponseEntity.ok().body(result);
    }


    @DeleteMapping("/post/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Integer id) {
        postService.removePost(id);
        return ResponseEntity.ok().build();
    }
}
