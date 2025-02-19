import express from 'express';
import {
  getBrightstoreUsers,
} from '../controllers/brightstoreController.js';

const router = express.Router();

router.get('/users', getBrightstoreUsers);

export default router;
