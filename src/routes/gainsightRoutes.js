import express from 'express';

import {
  gainsightAuthentication,
  fetchGainsightUsers,
  fetchGainsightUserById,
  registerGainsightUser,
  fetchGainsightPointsByUserIds,
  fetchUserByFieldValue,
} from '../controllers/gainsightController.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is running...');
});

router.post('/auth', gainsightAuthentication);

router.get('/users', fetchGainsightUsers);
router.get('/users/:id', fetchGainsightUserById);
router.get('/users/:field/:value', fetchUserByFieldValue);
router.post('/users/register', registerGainsightUser);

router.post('/points', fetchGainsightPointsByUserIds);

export default router;
