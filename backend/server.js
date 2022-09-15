require('dotenv').config();
const app = require('./app');
const dbConnection = require('./config/db');

const PORT = process.env.PORT || 3000;

dbConnection.connect();

app.listen(PORT, () => console.log(`Server Listening For Requests On Port ${PORT}`));