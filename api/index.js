import Express from 'express';
const app = Express();

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import commentsRoutes from './routes/comments.js';
import likesRoutes from './routes/likes.js';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/likes', likesRoutes);

app.listen(8000, () => console.log('API Running'));
