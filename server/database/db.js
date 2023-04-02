import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const Connection = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        });

        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error);
    }
};

export default Connection;