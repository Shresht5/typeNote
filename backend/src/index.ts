import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from "dotenv";
import NoteR from './routes/NoteR'
import UserR from './routes/UserR'
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
dotenv.config()

mongoose.connect(`${process.env.MONGO_URL}`)
    .then(() => { console.log("monogoose connected") })
    .catch((err) => { console.log("mongoose error ", err) })

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
    },
    store: MongoStore.create({
        mongoUrl: `${process.env.MONGO_URL}`,
        collectionName: 'sessions',
        ttl: 60 * 60,
    }),
}))

app.use('/api/notes', NoteR)
app.use('/api/user', UserR)

// app.use((req, res, next) => {
//     next(Error("Endpoint not found"))
// });

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    let errorMessage = "An unknown error occurred";
    if (err instanceof Error) { errorMessage = err.message };
    res.status(500).json({ errorMessage });
})

app.get('/', (req, res) => { res.send({ succes: true }) })

app.listen(process.env.PORT, () => { console.log('server is running on 9099') }) 