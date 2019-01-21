db = require('../db/db.js');
bcrypt = require('bcryptjs');

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

    app.post('/admin/login', function(request, response) {
        db.Admin.findOne({ email: request.body.email }, function(error, admin) {
            if (error) {
                response.send(error.errmsg);
            } else {
                if (!admin) {
                    response.send("Not authorized.");
                    return;
                }
                bcrypt.compare(request.body.password, admin.pw_hash)
                    .then(function(result) {
                        console.log(result)
                        if (result) {
                            request.session.admin = admin.email;
                            response.redirect('/admin/home');
                        }
                        else response.send("Not authorized");
                    })
                    .catch(function(error) {
                        console.log("Fail", error);
                        respone.send(error);
                    });
            }
        });
    });

    app.get('/admin/home', function(request, response) {
        //if (request.session.admin) {
        if (true) {
            db.Project.find({}, function(error, result) {
                if (error) console.log(error)
                else {
                    response.render('adminhome', {result: result});
                    }
            });
        }
        else response.redirect('/admin');
    });

    app.post('/admin/edit/:id', function(request, response) {
        if (request.session.admin) {
            request.body.images = [];
            request.body.key_elements = [];
            request.body.technologies = [];
            for (image of request.body['image-list'].split('|')) {
                if (image !== '') {
                    request.body.images.push(image);
                }
            }
            for (key of request.body['key_elements-list'].split('|')) {
                if (key !== '') {
                    request.body.key_elements.push(key);
                }
            }
            for (tech of request.body['technologies-list'].split('|')) {
                if (tech !== '') {
                    request.body.technologies.push(tech);
                }
            }
            delete request.body['technologies-list'];
            delete request.body['image-list'];
            delete request.body['key_elements-list'];

            db.Project.updateOne({_id: request.params.id}, {$set: request.body}, function(error, result) {
                if (error) response.send(error);
                else response.redirect('/admin/home');
            });
        } else {
            response.redirect('/admin');
        }
    });
}