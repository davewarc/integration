import express from 'express';
import {
  getBrightstoreUsers,
  createBrightstoreUsers,
  updateBrightstoreUsers,
  getBrightOrders,
  getBrightOrderById
} from '../controllers/brightstoreController.js';

const router = express.Router();

router.get('/users', getBrightstoreUsers);
router.post('/users', createBrightstoreUsers);
router.put('/users/:id', updateBrightstoreUsers);
router.get('/orders', getBrightOrders);
router.get('/orders/:id', getBrightOrderById);

export default router;
