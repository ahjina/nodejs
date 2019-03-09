// STEP2: Implement this index.js which starts the app with the PORT and MONGO_URL from env variable
const app = require('./app');

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/nordic';

app.start(PORT, MONGO_URL);
