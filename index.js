import express from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv'
dotenv.config()

import {  closeConnection, openConnection } from './dbconnection.js';

import $routes from './routes/index.js';

import errorMiddleware from './middleware/error-middleware.js';

import cors from 'cors'
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use($routes.AuthRouter);
app.use($routes.BodyPartsRouter);
app.use($routes.DifficultyRouter);
app.use($routes.TestRouter);
app.use($routes.SubsriptionRouter);
app.use($routes.CurrentTraningRouter);
app.use($routes.ActivitiesComplexRouter);
app.use($routes.ActivitiesRouter);
app.use($routes.UserRouter);


app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.status(200).json("Server rabotaet")
})

function startApp() {
    try {
        openConnection();
        app.listen(process.env.PORT, () => console.log(`Сервер работает на порте ${process.env.PORT}}`))

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startApp();
