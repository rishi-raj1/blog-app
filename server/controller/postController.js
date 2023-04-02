import Post from "../models/postModel.js"
import Comment from "../models/commentModel.js";

const createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();

        return res.status(200).json({ msg: 'Post saved successfully' });
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getAllPosts = async (req, res) => {
    let category = req.query.category;
    let posts;

    try {
        if (category) {
            posts = await Post.find({ categories: category })
        }
        else {
            posts = await Post.find({});

        }

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'post not found' });
        }

        await Post.findByIdAndUpdate(req.params.id, { $set: req.body });

        return res.status(200).json({ msg: 'post updated successfully' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);

        await Comment.deleteMany({ postId: req.params.id });

        return res.status(200).json({ msg: 'post and their comments deleted successfully' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export { createPost, getAllPosts, getPost, updatePost, deletePost };