import express from 'express';
import gainsightRoutes from './gainsightRoutes.js';
import brightstoreRoutes from './brightstoreRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is running...');
});

router.use('/gainsight', gainsightRoutes);
router.use('/brightstores', brightstoreRoutes);
export default router;
