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
const PORT = process.env.PORT || 3001;
const upload = multer({ dest: 'uploads/' });


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


app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "script-src 'self' https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js;"
  );
  next();
});
app.use(routes);

//endpoint for profil pic 
app.post('/upload', isAuthenticated, upload.single('profilePicture'), (req, res) => {
  console.log('test 2');
  res.send('Profile picture uploaded successfully');
});
// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  console.log(req.session);
  if (req.session && req.session.user_id) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Code Name's Website is Working! ${PORT}`));
});

