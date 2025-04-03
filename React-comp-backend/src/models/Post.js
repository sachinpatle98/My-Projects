import pool from "../config/postgres.js";

const createPosts =  async (title , content) => {
    const result = await pool.query(
        "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
        [title, content]
    );
    return result.rows[0];
};

const getPost = async  () => {
    const result = await pool.query("SELECT * FROM posts");
    return result.rows;
};

const updatePost = async (id, title, content) => {
    const result = await pool.query(
        "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
        [title, content, id]
    );
    return result.rows[0];
};

// Delete a post by ID
const deletePost = async (id) => {
    const result = await pool.query(
        "DELETE FROM posts WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0]; 
};

export {createPosts, getPost, updatePost, deletePost}