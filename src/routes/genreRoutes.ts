import { Router } from 'express';
import { check } from 'express-validator';
import { authenticateToken } from '../middleware/authMiddleware';
import * as genreController from '../controllers/genreController';

const router = Router();

router.get('/:id', genreController.getGenreById);
router.get('/', genreController.getAllGenres);
router.post(
    '/',
    authenticateToken,
    [check('name').notEmpty()],
    genreController.createGenre
);
router.put(
    '/:id',
    authenticateToken,
    [check('name').optional().notEmpty()],
    genreController.updateGenre
);
router.delete('/:id', authenticateToken, genreController.deleteGenre);

export default router;
