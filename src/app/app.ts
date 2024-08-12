import express from 'express';
import movieRoutes from '../routes/movieRoutes';
import genreRoutes from '../routes/genreRoutes';
import authRoutes from '../routes/authRoutes';

export default function createApplication() {
    const app = express();

    app.use(express.json());
    app.use('/movies', movieRoutes);
    app.use('/genres', genreRoutes);
    app.use('/auth', authRoutes);

    
    app.use((req, res, next) => {
        res.status(404).json({ error: 'Not Found' });
    });

    return app;
}
