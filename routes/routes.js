db = require('../db/db.js');

module.exports = function(app) {
    app.get('/', function(request, response) {
        db.Project.find({}, function(err, projects) {
            response.render('portfolio', { projects: projects });
        });
    });

    app.get('/admin', function(request, response) {
        if (request.session.user) {
            if (request.session.user.isAdmin) {
                return redirect('/admin/home');
            }
        }
        response.render('adminlogin');
    });
}