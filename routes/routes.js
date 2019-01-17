db = require('../db/db.js');

module.exports = function(app) {
    app.get('/', function(request, response) {
        db.Project.findOne({}, function(err, proj) {
            response.render('portfolio', {proj: proj});
        })
    });
}