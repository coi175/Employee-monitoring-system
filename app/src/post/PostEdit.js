import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../navigation/AppNavbar';
import Select from 'react-select'

const PostEdit = () => {
    const initialFormState = {
        name: '',
        salary: '',
        bonus: '',
        piecework: '',
        paymentPerItem: ''
    };

    const [post, setPost] = useState(initialFormState);
    const navigate = useNavigate();
    const [option, setCurrentOption] = useState(null);
    const options = [
        { value: 'true', label: 'true' },
        { value: 'false', label: 'false' }
    ]
    const {id} = useParams();

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/post/${id}`)
                .then(response => response.json())
                .then(data => setPost(data));
        }
    },[id, setPost]);

    const handleChange = (event) => {
        const { name, value } = event.target
        setPost({ ...post, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(option.value === "false") {
            post.paymentPerItem = 0;
        }
        if(option.value === "true") {
            post.bonus = 0;
        }
        post.piecework = option.value;

        await fetch('/post' + (post.id ? '/' + post.id : ''), {
            method: (post.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        setPost(initialFormState);
        navigate('/posts');
    }

    const generateForm = () => {
        if (option === null) {
            return null;
        } else if (option.value === "false") {
            return <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="bonus">Bonus</Label>
                            <Input type="text" name="bonus" id="bonus" value={post.bonus || ''}
                                   onChange={handleChange} autoComplete="bonus"/>
                        </FormGroup>
                    </div>
        } else {
            return <div className="row">
                <FormGroup className="col-md-4 mb-3">
                    <Label for="paymentPerItem">Payment Per Item</Label>
                    <Input type="text" name="paymentPerItem" id="paymentPerItem" value={post.paymentPerItem || ''}
                           onChange={handleChange} autoComplete="paymentPerItem"/>
                </FormGroup>
            </div>
        }
    }

    const title = <h2>{post.id ? 'Edit Post' : 'Add Post'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={post.name || ''}
                               onChange={handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="salary">Salary</Label>
                        <Input type="text" name="salary" id="salary" value={post.salary || ''}
                               onChange={handleChange} autoComplete="salary"/>
                    </FormGroup>
                    <FormGroup className={"col-md-3"}>
                        <Label for="piecework">Is Piecework?</Label>
                        <Select id="Post"
                                onChange={setCurrentOption}
                                options={options}
                        />
                    </FormGroup>
                    {generateForm()}
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/posts">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default PostEdit;