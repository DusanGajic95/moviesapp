import { Sequelize } from 'sequelize-typescript';
import { Movie } from '../models/movieModel';
import { Genre } from '../models/genreModel';
import { User } from '../models/userModel';

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'movies_db',
    models: [Movie, Genre, User],
});
