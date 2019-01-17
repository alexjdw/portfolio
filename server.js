express = require('express');
db = require('./db/db.js');

const app = express();
app.use(express.static('./static'))
app.set('views', './views');
app.set('view engine', 'ejs');

//Add routes
require('./routes/routes.js')(app);

app.listen(8000);