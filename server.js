const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const PORT = 3000 ;
const app = express();
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('./config/passport');
const passportModule = require('passport');

require('dotenv').config();

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine','hbs');
app.use('/uploads', express.static('uploads'));

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_PATH })
}));

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',                
    layoutsDir: path.join(__dirname, 'views/layouts'),  
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(passportModule.initialize());
app.use(passportModule.session());

let users = [];
let admin = [];

const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);
app.use('/admin', adminRoute); 
app.use('/user', userRoute);

app.get('/', (req, res) => {
    res.render('home', { logoutMessage: req.query.logoutMessage });
});

app.get('/start', (req, res) => {
    res.render('start');
});

mongoose.connect(process.env.DB_PATH).then(()=>{
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
   });
});

