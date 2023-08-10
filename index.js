import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import Greetings from './greetings.js';
import flash from 'express-flash';
import session from 'express-session';

let greetingsFactory = Greetings();

let app = express();

app.engine('handlebars', engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('./public/css'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.get('/', function(req, res) {
    let name = greetingsFactory.getName();
    let language = greetingsFactory.getLanguage();

    let greet = greetingsFactory.greet(name, language);

    res.render('index', {
        title: 'Home',
        greeting: greet,
    })
})

app.post('/greetings', function(req, res) {
    greetingsFactory.setName(req.body.name);
    greetingsFactory.setLanguage(req.body.lang);

    if(greetingsFactory.getName() === ''){
        req.flash('info', 'Please enter a name!');
    }

    res.redirect('/');
})

app.get('/greeted', function(req, res) {
    res.render('greeted', { users: greetingsFactory.getNames()})
})

app.get('/counter/:user', function(req, res) {
    let name = req.params.user

    res.render('count', {
        userName: name.charAt(0).toUpperCase() + name.slice(1),
        count: greetingsFactory.getUserGreetCount(name)
    })
})

let PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('App running on port ' + PORT);
})