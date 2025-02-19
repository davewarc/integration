import * as brightstoreService from '../services/brightstoresService.js';

export const getBrightstoreUsers = async (req, res) => {
  const { page, perPage } = req.params;
  try {
    const users = await brightstoreService.getBrightstoreUsers(page, perPage);

    res.status(200).json({
      status: 'success',
      users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateBrightstoreUsers = async (req, res) => {
  const { id } = req.params;
  const { points } = req.body;
  try {
    const user = await brightstoreService.updateBrightstoreUsers(id, points);

    res.status(200).json({
      status: 'success',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}