var mongoose = require('mongoose');
var models = require('./models.js');

mongoose.connect('mongodb://localhost/portfolio')

var db = {
    conn: mongoose
}

for (model in models) {
    db[model] = new mongoose.model(model, models[model]);
}

module.exports = db;