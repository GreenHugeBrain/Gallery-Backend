import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import Router from './src/routes/routes.mjs'; // Adjust path if necessary
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import MongoStore from 'connect-mongo';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Update CORS configuration
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // Adjust to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'] // Add 'Authorization' here
}));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret: 'gallery project',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://khvtisozedelashvili:BEi0r03gEKlbezH7@gallerydb.hvgj3.mongodb.net/galleryDB?retryWrites=true&w=majority',  // Use the MongoDB URI
        ttl: 14 * 24 * 60 * 60 // 14 days session expiration
    }),
    cookie: {
        maxAge: 60000 * 60
    }
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'client')));

app.use(Router);

  mongoose.connect('mongodb+srv://khvtisozedelashvili:BEi0r03gEKlbezH7@gallerydb.hvgj3.mongodb.net/galleryDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
