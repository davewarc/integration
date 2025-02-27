import express from 'express';
import gainsightRoutes from './gainsightRoutes.js';
import brightstoreRoutes from './brightstoreRoutes.js';
import deposcoRoutes from './deposcoRoutes.js'
import {
  syncNewUsersPoints,
  pushOrderFromBrightstoresToDeposco,
  syncGainsightPointsToBrightstores
} from '../../cronJobs.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is running...');
});

router.get('/run-cron-job/push-order', async (req, res) => {
  try {
    // Manually trigger the cron job's function
    await pushOrderFromBrightstoresToDeposco();
    res.status(200).json({ message: 'Cron job executed successfully for debugging.' });
  } catch (error) {
    console.error('Error running cron job manually:', error);
    res.status(500).json({ error: 'Error running cron job.' });
  }
});

router.get('/run-cron-job/sync-newuser-points', async (req, res) => {
  try {
    // Manually trigger the cron job's function
    await syncNewUsersPoints();
    res.status(200).json({ message: 'Cron job executed successfully for debugging.' });
  } catch (error) {
    console.error('Error running cron job manually:', error);
    res.status(500).json({ error: 'Error running cron job.' });
  }
});

router.get('/run-cron-job/sync-everyusers-points', async (req, res) => {
  try {
    // Manually trigger the cron job's function
    await syncGainsightPointsToBrightstores();
    res.status(200).json({ message: 'Cron job executed successfully for debugging.' });
  } catch (error) {
    console.error('Error running cron job manually:', error);
    res.status(500).json({ error: 'Error running cron job.' });
  }
});

router.use('/gainsight', gainsightRoutes);
router.use('/brightstores', brightstoreRoutes);
router.use('/deposco', deposcoRoutes);

export default router;
