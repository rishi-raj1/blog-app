import grid from 'gridfs-stream';
import mongoose from 'mongoose';


const url = 'http://localhost:5000';

let gfs, gridfsBucket;

const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });

    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
})

// upper conn.once me bucketName me 'photos' daale hai and gfg.collection me bhi photos daale hai 
// kyunki upload.js me jb hmlog storage object ke if me nhi jaate hai to bucketName 'photos' save krte hai
// lekin video me iss file me bucketName 'fs' save kiya hai . video me code isiliye run kr rha hai 
// kyunki wha if condition se hi return ho jata hai because wo jpg image input me de rha hai aur 
// jiska content-type : image/jpeg hota hai aur video me if condition me image/jpg hai . video ka code wrong hai.


export const uploadImage = (req, res) => {

    if (!req.file) {
        console.log('imageController.js file me hai if me file nhi hai line 50 ', req.file);

        return res.status(404).json({ msg: 'File not found' });
    }

    // console.log('imageController.js file me hai file ye hai line 55 ', req.file);

    const imageUrl = `${url}/file/${req.file.filename}`;

    return res.status(200).json(imageUrl);
}

export const getImage = async (req, res) => {
    try {
        // console.log('imagecontroller.js me getimage ke try me hain ', req.params.filename);

        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        // console.log('imagecontroller.js me hai catch me err ye hai ', error);

        return res.status(500).json({ msg: error.message });
    }
}