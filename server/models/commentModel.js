import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const commentModel = mongoose.model('comment', commentSchema);

export default commentModel;