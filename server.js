const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
// MAC check if this is correct ^^^^ for your route path
const exphbs = require('express-handlebars');
// if we are using helpers, we can insert here

// again need to check if the path route is correct
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// if we are using helpers, we can insert helpers inside curly brackets
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


app.use(routes);

// firing it into local host
// will recheck code for sequelize.sync({ force: false })
sequelize.sync({ force: false }).then(() => { app.listen(PORT, () => 
    console.log(`Code Name's Website is Working! ${PORT}`));
  });