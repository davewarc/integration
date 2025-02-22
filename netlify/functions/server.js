import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import routes from '../../src/routes/index.js'; // Ensure you use .js extension
import '../../cronJobs.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

if (process.env.NODE_ENV !== 'production') {
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export const handler = serverless(app);
