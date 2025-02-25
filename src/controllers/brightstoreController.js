import * as brightstoreService from '../services/brightstoresService.js';

export const getBrightstoreUsers = async (req, res) => {
  const { page, perPage } = req.query;
  console.log(page, perPage);
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

export const createBrightstoreUsers = async (req, res) => {
  const requestData = req.body;

  try {
    const user = await brightstoreService.createBrightstoreUsers(requestData);

    res.status(200).json({
      status: 'success',
      user
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

export const getBrightOrders = async (req, res) => {
  const { page, perPage } = req.query;

  try {
    const orders = await brightstoreService.getBrightOrders(page, perPage);

    res.status(200).json({
      status: 'success',
      orders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getBrightOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await brightstoreService.getBrightOrderById(id);
    res.status(200).json({
      status: 'success',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
