require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const helmet = require("helmet");
const helpers = require("./utils/helper");
const multer = require('multer');

const routes = require('./controllers');

const exphbs = require('express-handlebars');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const hbs = exphbs.create({ helpers });


const app = express();
const upload = multer({ dest: 'uploads/' }); 
const PORT = process.env.PORT || 3001;


const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: false,
      sameSite: "strict"
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

//endpoint for profile pic 
app.post('/upload', isAuthenticated, upload.single('profilePicture'), (req, res) => {
  res.send('Profile picture uploaded successfully');
});
// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};


sequelize.sync({ force: false }).then(() => { app.listen(PORT, () => 
    console.log(`Code Name's Website is Working! ${PORT}`));
  });

  