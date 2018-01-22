const http = require('http');
const app = require('./app');
const { PORT }  = require('./constants');

// Assign port to the app
app.set('port', PORT);

// Create an HTTP server
const server = http.createServer(app);

// Start the server on the required port
server.listen(PORT, () => {
  console.log(`server has started and listening on port ${PORT}`);
});
