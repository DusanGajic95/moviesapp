import { Router } from 'express';
import { check } from 'express-validator';
import { authenticateToken } from '../middleware/authMiddleware';
import * as movieController from '../controllers/movieController';

const router = Router();

router.get('/:id', movieController.getMovieById);
router.get('/', movieController.getAllMovies);
router.post(
    '/',
    authenticateToken,
    [
        check('title').notEmpty(),
        check('releaseDate').isISO8601(),
        check('userScore').isFloat({ min: 0, max: 10 }),
        check('description').optional().isString(),
        check('image').optional().isString(),
        check('trailer').optional().isString(),
        check('director').optional().isString(),
        check('duration').optional().isInt(),
    ],
    movieController.createMovie
);
router.put(
    '/:id',
    authenticateToken,
    [
        check('title').optional().notEmpty(),
        check('releaseDate').optional().isISO8601(),
        check('userScore').optional().isFloat({ min: 0, max: 10 }),
        check('description').optional().isString(),
        check('image').optional().isString(),
        check('trailer').optional().isString(),
        check('director').optional().isString(),
        check('duration').optional().isInt(),
    ],
    movieController.updateMovie
);
router.delete('/:id', authenticateToken, movieController.deleteMovie);

export default router;
