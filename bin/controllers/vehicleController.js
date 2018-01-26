const models = require('../models');

module.exports = {
  findOccupied: async (req, res) => {
    const records = await models.Vehicle.findAll({
      where: { isParked: false }
    });

    return res.status(200).json(records);
  },

  findHistory: async (req, res) => {
    const history = await models.Vehicle.findAll({
      where: { isParked: true }
    });

    return res.status(200).json(history);
  }
}
