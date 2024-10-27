import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from "dotenv";
import NoteR from './routes/NoteR'

const app = express();
dotenv.config()

mongoose.connect(`${process.env.MONGO_URL}`)
    .then(() => { console.log("monogoose connected") })
    .catch((err) => { console.log("mongoose error ", err) })

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use('/api', NoteR)

app.use((req, res, next) => {
    next(Error("Endpoint not found"))
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    let errorMessage = "An unknown error occurred";
    if (err instanceof Error) { errorMessage = err.message };
    res.status(500).json({ errorMessage });
})

app.get('/', (req, res) => { res.send({ succes: true }) })

app.listen(process.env.PORT, () => { console.log('server is running on 9099') }) 