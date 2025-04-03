import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'

const Blog = () => {

    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editId, setEditId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/blog/posts");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // Create a new post
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/blog/posts", { title, content });
            fetchPosts();
            setTitle("");
            setContent("");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/blog/posts/${deleteId}`);
            fetchPosts();
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    const handleEdit = (post) => {
        setEditId(post.id);
        setTitle(post.title);
        setContent(post.content)
        setShowEditModal(true)
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/blog/posts/${editId}`, { title, content });
            fetchPosts();
            setShowEditModal(false);
            setTitle("");
            setContent("")
            setEditId(null)
        } catch (error) {
            console.error("Error updating post:", error);
        }
    }

    return (
        <Container>
            <h2>Blogs</h2>
            {/* Create post form */}
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">Create Post</Button>
            </Form>

            {/* Blog Posts */}
            <div className='mt-4'>
                {posts.map((post) => (
                    <Card key={post.id} className='mb-3'>
                        <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>{post.content}</Card.Text>
                            <div className='d-flex gap-4 align-items-center justify-content-center'>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            Edit
                                        </Tooltip>}
                                >
                                    <Button variant="success" onClick={() => handleEdit(post)} className="">
                                        <i class="fas fa-edit"></i>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip>
                                            Delete
                                        </Tooltip>}
                                >
                                    <Button variant="danger" onClick={() => confirmDelete(post.id)} >
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </Button>
                                </OverlayTrigger>
                            </div>
                        </Card.Body>
                    </Card>
                ))
                }
            </div>


            {/* Edit Post Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update Post
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this post?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Blog
