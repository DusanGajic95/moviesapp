import { Sequelize } from 'sequelize-typescript';
import { Movie } from '../models/movieModel';
import { Genre } from '../models/genreModel';
import { User } from '../models/userModel';
import { config } from 'dotenv';

config(); 

const connectDatabase = async () => {
    const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        models: [Movie, Genre, User],
    });

    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        await sequelize.sync(); 
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default connectDatabase;
