require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const router = require('./router');
const errorMidleware = require('./midlewares/errorMiddleware');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMidleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true
        });
        app.listen(PORT, ()=> console.log(`Server start on port ${PORT}`));
    } catch (error) {
        console.error(error);
    }
}

start();
