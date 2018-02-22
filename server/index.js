/* eslint no-console: "off" */
const server = require('./server');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
