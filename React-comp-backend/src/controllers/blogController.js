import { createPosts, deletePost, getPost, updatePost } from "../models/Post.js"

const getAllPost = async (req,res) => {
    try {
        const posts = await getPost();
        res.json(posts)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const createPost = async (req,res) => {
    try {
        const {title, content} = req.body;

        const newPost = await createPosts(title, content);
        res.status(201).json(newPost);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePosts = async (req,res) =>{
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedPost = await updatePost(id, title, content);
        if (updatedPost) {
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deletePosts = async (req,res) =>{

    try {
        const { id } = req.params;
        const deletedPost = await deletePost(id);
        if (deletedPost) {
            res.json({ message: "Post deleted successfully" });
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export { getAllPost, createPost, updatePosts, deletePosts }
