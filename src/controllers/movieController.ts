import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Movie } from '../models/movieModel';
import { Op } from 'sequelize';

export const getMovieById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) return res.status(400).json({ error: 'Invalid ID' });

    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    res.json(movie);
};

export const getAllMovies = async (req: Request, res: Response) => {
    const { skip = 0, take = 10, title } = req.query;
    const options: any = {
        limit: Number(take),
        offset: Number(skip),
    };

    if (title) {
        options.where = { title: { [Op.like]: `%${title}%` } };
    }

    const movies = await Movie.findAll(options);
    res.json(movies);
};

export const createMovie = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, releaseDate, userScore, description, image, trailer, director, duration } = req.body;

    const userId = (req as any).user.id;  

    const movie = await Movie.create({ title, releaseDate, userScore, description, image, trailer, director, duration, userId });
    res.status(201).json(movie);
};

export const updateMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) return res.status(400).json({ error: 'Invalid ID' });

    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    await movie.update(req.body);
    res.json(movie);
};

export const deleteMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) return res.status(400).json({ error: 'Invalid ID' });

    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    await movie.destroy();
    res.status(204).end();
};
