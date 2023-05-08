const path = require('path');
const express = require('express');
const session = require('express-session');
const helmet = require("helmet");

const routes = require('./controllers');

const exphbs = require('express-handlebars');


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
app.use(helmet());


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(routes);


sequelize.sync({ force: false }).then(() => { app.listen(PORT, () => 
    console.log(`Code Name's Website is Working! ${PORT}`));
  });