import express from "express";
import { PORT, mongoDBURL } from "./config";
import mongoose from "mongoose";
import { Translation } from "./models/translatorModel.js";
import translationRoute from './routes/translationRoutes.js'
const app = express();
import cors from 'cors';

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
//Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome to MERN Stack")
});


app.use('/translations', translationRoute); 


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App is connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

