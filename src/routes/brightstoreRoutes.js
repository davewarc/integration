import express from 'express';
import {
  getBrightstoreUsers,
  createBrightstoreUsers,
  updateBrightstoreUsers,
} from '../controllers/brightstoreController.js';

const router = express.Router();

router.get('/users', getBrightstoreUsers);
router.post('/users', createBrightstoreUsers);
router.put('/users/:id', updateBrightstoreUsers);

export default router;
