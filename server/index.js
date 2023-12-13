import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import Router from './routes/route.js';

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/', Router);

app.use(function (error, req, res, next) {
    if (error) {
        console.log('printing error in index.js ', error);
        res.status(500).json({ msg: error.message });
    }
});

const PORT = process.env.PORT || 5000;

Connection();


app.listen(PORT, () => console.log(`server is running successfully on PORT ${PORT}`));


//  backend url present in
//  D:\blog-app\server\controller\imageController.js