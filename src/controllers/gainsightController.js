import * as gainsightService from '../services/gainsightService.js';

/**
 * @description Authentication Controller
 * @param {Request} req 
 * @param {Response} res 
 */
export const gainsightAuthentication = async (req, res) => {
  try {
    const accessToken = await gainsightService.fetchGainsightAuth();
    res.status(200).json({
      status: 'success',
      access_token: accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Get All Users Controller
 * @param {Request} req 
 * @param {Response} res 
 */
export const fetchGainsightUsers = async (req, res) => {
  const { page, pageSize } = req.params;

  try {
    const users = await gainsightService.fetchGainsightUsers(page, pageSize);
    res.status(200).json({
      status: 'success',
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * @description Get User By Field and Value
 * @param {Request} req 
 * @param {Response} res 
 */

export const fetchUserByFieldValue = async (req, res) => {
  const { field, value } = req.params;
  try {
    const user = await gainsightService.fetchUserByFieldValue(field, value);

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * @description Get User By ID Controller
 * @param {Request} req 
 * @param {Response} res 
 */
export const fetchGainsightUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await gainsightService.fetchGainsightUserById(userId);

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * @description Register User Controller
 * @param {Request} req 
 * @param {Response} res 
 */
export const registerGainsightUser = async (req, res) => {
  const requestData = req.body;
  try {
    const registerUser = await gainsightService.registerGainsightUser(requestData);
    res.status(200).json({
      status: 'success',
      user: registerUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * @description Get Points By UserId
 * @param {Request} req
 * @param {Response} res
 */
export const fetchGainsightPointsByUserIds = async (req, res) => {
  const { userIds } = req.body;
  try {
    const allPointsByUser = await gainsightService.fetchGainsightPointsByUserIds(userIds);
    res.status(200).json({
      status: 'success',
      points: allPointsByUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}