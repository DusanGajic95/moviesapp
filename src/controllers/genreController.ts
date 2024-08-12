import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Genre } from '../models/genreModel';
import { Op } from 'sequelize';

export const getGenreById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) return res.status(400).json({ error: 'Invalid ID' });

    const genre = await Genre.findByPk(id);
    if (!genre) return res.status(404).json({ error: 'Genre not found' });

    res.json(genre);
};

export const getAllGenres = async (req: Request, res: Response) => {
    const { skip = 0, take = 10, name } = req.query;
    const options: any = {
        limit: Number(take),
        offset: Number(skip),
    };

    if (name) {
        options.where = { name: { [Op.like]: `%${name}%` } };
    }

    const genres = await Genre.findAll(options);
    res.json(genres);
};

export const createGenre = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name } = req.body;
    const userId = (req as any)?.user?.id; 

    const genre = await Genre.create({ name, userId });
    res.status(201).json(genre);
};

export const updateGenre = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) return res.status(400).json({ error: 'Invalid ID' });

    const genre = await Genre.findByPk(id);
    if (!genre) return res.status(404).json({ error: 'Genre not found' });

    await genre.update(req.body);
    res.json(genre);
};

export const deleteGenre = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(Number(id))) return res.status(400).json({ error: 'Invalid ID' });

    const genre = await Genre.findByPk(id);
    if (!genre) return res.status(404).json({ error: 'Genre not found' });

    await genre.destroy();
    res.status(204).end();
};
