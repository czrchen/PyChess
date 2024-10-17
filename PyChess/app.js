const express = require('express');
const app = express();
const path = require('path');
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const session = require('express-session')

// Database Connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"qwertyasd",
    database:"PyChess",
});

db.connect((err) => {
    if(err){
        console.error("Database connection failed: ", err);
    }else{
        console.log("Connected to the database");
    }
})

// Establish Session

app.use(session({
    secret: 'PyChess',
    resave: true,
    saveUninitialized:true
}));


// Middleware

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set Up Views and Public Folder

app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','pug');

// Rendering Pages

app.get('/',(req,res)=>{
    res.render('index',{ user: req.session.user });
});

app.get('/register',(req,res)=>{
    res.render('register');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/rules',(req,res) =>{
    res.render('rules',{ user: req.session.user });
});

app.get('/game',(req,res) =>{
    res.render('game');
});

// Routes

const registerRoutes = require('./routes/register')(db);
app.use("/", registerRoutes);

const loginRoutes = require('./routes/login')(db);
app.use("/", loginRoutes);

const profileRoutes = require('./routes/profile')(db); // Import profile routes
app.use("/", profileRoutes);

const sessionRoutes = require('./routes/sessionRoutes')(db);
app.use("/", sessionRoutes);

// Connecting to Port

app.listen(3000,()=>{
    console.log('App listening on port 3000! ');
})