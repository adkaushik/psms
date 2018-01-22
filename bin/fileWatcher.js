const fs = require('fs');
const { PATH, MIN_RATE, RATE_PER_MINUTE } = require('./constants');
const models = require('./models');

const fileWatcher = () =>
  fs.watchFile(PATH, async (event, filename) => {
    // if (filename) {
    //   const data = fs.readFileSync(PATH);
    //
    //   if (licensePlates.length >= SLOT_LIMIT) {
    //     queue.push(data.toString())
    //   } else {
    //     licensePlates.push(data.toString());
    //   }
    // }
    // else {
    //   console.log('filename not provided');
    // }
    const number = fs.readFileSync(PATH).toString().trim();
    console.log(number);
    // find this data in the table.
    // 1. If there is no record, add this record with status `false`
    // 2. If there is record and status is false, update the record with status
    // `true` and calculate the amount.
    // 3. If there is record and status is true, create a new record With
    // status `false`
    const records = await models.User.findAll({ where: { number } });
    let parked;

    if (records && records.length > 0) {
      // check if there is a record with status false
      parked = records.filter(record => record.status === false)[0];

      if (parked) {
        const date = Date.now();
        const minutesUsed = Number(((date - Date.parse(parked.createdAt)) / (1000 * 60)).toFixed(2));
        const amount = MIN_RATE + (RATE_PER_MINUTE * minutesUsed);

        await models.User.update({
          status: true,
          amount,
          updatedAt: date
        }, {
          where: {
            number,
            status: false
          }
        })
      } else {
        const a = await models.User.create({
          number,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
        console.log(a.createdAt);
      }
    } else {
      await models.User.create({
        number,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
    }
});

module.exports = fileWatcher;
