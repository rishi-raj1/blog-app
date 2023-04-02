import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import multer from 'multer';


dotenv.config();


// console.log('upload.js me hai /file/upload se yha pe phuche hai');

const storage = new GridFsStorage({
    url: `${process.env.MONGO_URI}`,
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