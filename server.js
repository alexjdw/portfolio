express = require('express');

const app = express();

//Apply config
require('./config/config.js')(app);

//Add routes
require('./routes/routes.js')(app);

app.listen(8000);