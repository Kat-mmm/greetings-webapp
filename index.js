import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import Greetings from './greetings.js';
import flash from 'express-flash';
import session from 'express-session';
import GreetingsDatabase from './model/greetings.model.js';

let greetingsFactory = Greetings();

let app = express();
let db = GreetingsDatabase();

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

app.get('/', async function(req, res) {
    let name = greetingsFactory.getName();
    let language = greetingsFactory.getLanguage();

    let greet = greetingsFactory.greet(name, language);

    let allGreetedUsers = await db.getAllGreetedUsers();

    res.render('index', {
        title: 'Home',
        greeting: greet,
        allCount: allGreetedUsers,
    })
})

app.post('/greetings', async function(req, res) {
    greetingsFactory.setName(req.body.name);
    greetingsFactory.setLanguage(req.body.lang);

    if(greetingsFactory.getName() === ''){
        req.flash('info', 'Please enter a name!');
    }
    else{
        await db.addUser(greetingsFactory.getName());
    }
    
    res.redirect('/')
})

app.get('/greeted', async function(req, res) {
    let greetedUsers = await db.getUsers();

    res.render('greeted', { users: greetedUsers})
})

app.get('/counter/:user', async function(req, res) {
    let name = req.params.user

    let userGreetCount = await db.getUserCount(name);

    res.render('count', {
        userName: name.charAt(0).toUpperCase() + name.slice(1),
        count: userGreetCount
    })
})

app.post('/reset-counter', async function(req, res) {
    await db.resetAll();
    greetingsFactory.setName('')

    res.redirect('/')
})

let PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('App running on port ' + PORT);
})