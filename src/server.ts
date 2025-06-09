import express from "express";
import { database } from "./db/db";
import userRoutes from "./routes/user.routes";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database setup
const userRepository = new UserRepository(database);
const userService = new UserService(userRepository);

// Routes setup with dependency injection
app.use('/api/users', userRoutes(userService));

app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });
});

// Database connection and server start
async function startServer() {
    try {
        await database.initialize();
        await database.sync();
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Environment: ${process.env.NODE_ENV}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();