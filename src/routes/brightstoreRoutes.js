import express from 'express';
import {
  getBrightstoreUsers,
  createBrightstoreUsers,
  updateBrightstoreUsers,
  getBrightOrders
} from '../controllers/brightstoreController.js';

const router = express.Router();

router.get('/users', getBrightstoreUsers);
router.post('/users', createBrightstoreUsers);
router.put('/users/:id', updateBrightstoreUsers);
router.get('/orders', getBrightOrders);

export default router;
