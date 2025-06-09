import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';
import { Database, DatabaseModel } from '../interfaces/database.interface';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export class SequelizeDatabase implements Database {
    private sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'passgiit23',
            database: process.env.DB_NAME || 'example_db',
            models: [User],
            logging: process.env.NODE_ENV === 'development' ? console.log : false
        });
    }

    async initialize(): Promise<void> {
        try {
            await this.sequelize.authenticate();
            console.log('Database connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    }

    getModel<T>(modelName: string): DatabaseModel<T> {
        const model = this.sequelize.model(modelName);
        if (!model) {
            throw new Error(`Model ${modelName} not found`);
        }
        return model as unknown as DatabaseModel<T>;
    }

    async sync(): Promise<void> {
        await this.sequelize.sync();
    }
}

// Exportamos una instancia única de la base de datos
export const database = new SequelizeDatabase();




