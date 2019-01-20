bodyParser = require('body-parser');
session = require('express-session');

module.exports = function(app) {
    app.locals.icons = {
        'Angular': 'angular.svg',
        'Django': 'django.svg',
        'Django Rest Framework': 'django-rest-framework.png',
        'LinkedIn': 'linkedin.svg',
        'Python': 'python.svg',
        'jQuery': 'jquery.png',
        'SQLite': 'SQLite.svg'
    }
    app.use(express.static('./static'))
    app.set('views', './views');
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        secret: 'change me first',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: 'auto' }
    }));
}