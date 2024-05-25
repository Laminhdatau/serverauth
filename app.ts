import express from 'express';
import authRoutes from './auth/routes/authRoutes';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
          windowMs: 15 * 60 * 1000, // 15 minutes
          max: 100,
});

const app = express();
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

export default app;
