import * as deposcoService from '../services/deposcoService.js';

export const createDeposcoNewOrder = async (req, res) => {
    const data = req.body;
    try {
        const response = await deposcoService.createDeposcoNewOrder(data);
        res.status(200).json({
            status: 'success',
            result: response,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}