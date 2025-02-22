import express from 'express';
import {
  createDeposcoNewOrder
} from '../controllers/deposcoController.js';

const router = express.Router();

router.post('/order', createDeposcoNewOrder);

export default router;
