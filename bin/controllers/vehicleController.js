const models = require('../models');

const validate = (vehicleNumber) => {
  if (!vehicleNumber) return false;

  if (vehicleNumber.type !== 'string') return false;

  return true;
}

module.exports = {
  findOccupied: async (req, res) => {
    try {
      const records = await models.Vehicle.findAll({
        where: { isParked: false }
      });

      return res.status(200).json(records);
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  },

  findHistory: async (req, res) => {
    try {
      const history = await models.Vehicle.findAll({
        where: { isParked: true }
      });

      return res.status(200).json(history);
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  },

  fileWatcher: async (req, res) => {
    const vehicleNumber = req.body.vehicleNumber;

    const isValidateReq = validate(vehicleNumber);

    if (!isValidReq) return res.status(400).json({ message: 'Invalid request' });

    // find this data in the table.
    // 1. If there is no record, add this record with status `false`
    // 2. If there is record and status is false, update the record with status
    // `true` and calculate the amount.
    // 3. If there is record and status is true, create a new record With
    // status `false`
    const records = await models.Vehicle.findAll({ where: { vehicleNumber } });
    let parked;

    try {
      if (records && records.length > 0) {
        // check if there is a record with status false
        parked = records.filter(record => record.status === false)[0];

        if (parked) {
          const date = Date.now();
          const minutesUsed = Number(((date - Date.parse(parked.createdAt)) / (1000 * 60)).toFixed(2));
          const amount = MIN_RATE + (RATE_PER_MINUTE * minutesUsed);

          await models.Vehicle.update({
            status: true,
            amount,
            updatedAt: date
          }, {
            where: {
              vehicleNumber,
              status: false
            }
          })
        } else {
          const a = await models.Vehicle.create({
            vehicleNumber,
            createdAt: Date.now(),
            updatedAt: Date.now()
          });
          console.log(a.createdAt);
        }
      } else {
        await models.Vehicle.create({
          vehicleNumber,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
      }

      return res.status(200).send();
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  }
}
