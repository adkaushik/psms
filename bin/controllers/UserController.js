const models = require('../models');

module.exports = {
  findOccupied: async (req, res) => {
    const records = await models.User.findAll({
      where: { status: false }
    });

    return res.status(200).json(records);
  },

  findHistory: async (req, res) => {
    const history = await models.User.findAll({
      where: { status: true }
    });

    return res.status(200).json(history);
  }
}
