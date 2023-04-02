

import Comment from '../models/commentModel.js';

export const newComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();

        return res.status(200).json({ msg: 'Comment saved successfully' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id });

        // console.log('getComments function me comment controller me ');
        // console.log(req.params.id);
        // console.log(comments);

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);

        return res.status(200).json({ msg: 'Comment deleted successfully' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}