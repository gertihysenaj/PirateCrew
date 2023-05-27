const express = require('express');
const app = express();
const port = 8000;

const cors = require('cors');

app.use(cors());
app.use(express.json());


require('./config/mongoose.config');
const routes = require('./routes/Pirate.routes');
routes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );