const path = require('path');

module.exports = {
  PATH: path.join(process.cwd(), 'result.txt'),
  SLOT_LIMIT: 10,
  PORT: 5000,
  MIN_RATE: 50,
  RATE_PER_MINUTE: 1
}
