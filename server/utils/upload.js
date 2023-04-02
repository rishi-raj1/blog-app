import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import multer from 'multer';


dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// console.log('upload.js me hai /file/upload se yha pe phuche hai');

const storage = new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@cluster0.of5s4.mongodb.net/test?retryWrites=true&w=majority`,
    options: {
        useNewUrlParser: true
    },
    file: (request, file) => {

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});


export default multer({
    storage,

}).single('file');