import express from 'express';
import gainsightRoutes from './gainsightRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is running...');
});

router.use('/gainsight', gainsightRoutes);

export default router;
