import * as brightstoreService from '../services/brightstoresService.js';

export const getBrightstoreUsers = async (req, res) => {
  try {
    const users = await brightstoreService.getBrightstoreUsers();

    res.status(200).json({
      status: 'success',
      users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
