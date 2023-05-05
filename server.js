const express = require('express');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
const routes = require('./controllers');
// MAC check if this is correct ^^^^ for your route path
const exphbs = require('express-handlebars');
// if we are using helpers, we can insert here

// again need to check if the path route is correct
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const hbs = exphbs.create();


const app = express();
const PORT = process.env.PORT || 3001;


const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };


app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------ PASSPORT AUTHENTICATION --------------
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
})



app.use(routes);


sequelize.sync({ force: false }).then(() => { app.listen(PORT, () => 
    console.log(`Code Name's Website is Working! ${PORT}`));
  });