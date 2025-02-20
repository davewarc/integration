import express from 'express';
import gainsightRoutes from './gainsightRoutes.js';
import brightstoreRoutes from './brightstoreRoutes.js';
import { registerMissingUsers } from '../../cronJobs.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is running...');
});

router.get('/run-cron-job', async (req, res) => {
  try {
    // Manually trigger the cron job's function
    await registerMissingUsers();
    res.status(200).json({ message: 'Cron job executed successfully for debugging.' });
  } catch (error) {
    console.error('Error running cron job manually:', error);
    res.status(500).json({ error: 'Error running cron job.' });
  }
});

router.use('/gainsight', gainsightRoutes);
router.use('/brightstores', brightstoreRoutes);
export default router;
