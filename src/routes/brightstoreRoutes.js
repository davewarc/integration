import express from 'express';
import {
  getBrightstoreUsers,
  updateBrightstoreUsers,
} from '../controllers/brightstoreController.js';

const router = express.Router();

router.get('/users', getBrightstoreUsers);
router.put('/users/:id', updateBrightstoreUsers);

export default router;
