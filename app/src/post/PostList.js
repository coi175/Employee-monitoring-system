import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../navigation/AppNavbar';
import { Link } from 'react-router-dom';

const PostList = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
    }, []);

    const remove = async (id) => {
        await fetch(`/post/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedPosts = [...posts].filter(i => i.id !== id);
            setPosts(updatedPosts);
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const postList = posts.map(post => {
        if(post.piecework === false) {
            return <tr key={post.id}>
                <td style={{whiteSpace: 'nowrap'}}>{post.name}</td>
                <td>{post.salary}</td>
                <td>{post.bonus}</td>
                <td>{"-"}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/posts/" + post.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => remove(post.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        }
        return <tr key={post.id}>
            <td style={{whiteSpace: 'nowrap'}}>{post.name}</td>
            <td>{post.salary}</td>
            <td>{"-"}</td>
            <td>{post.paymentPerItem}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/posts/" + post.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(post.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>

    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/posts/new">Add Post</Button>
                </div>
                <h3>Posts</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Name</th>
                        <th width="20%">Salary</th>
                        <th width="20%">Bonus</th>
                        <th width="20%">Payment Per Item</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {postList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default PostList;