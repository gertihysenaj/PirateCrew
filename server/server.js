const express = require('express');
const app = express();
const port = 8000;

const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

require('./config/mongoose.config');
require('./routes/User.routes')(app);
require('./routes/Pirate.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
