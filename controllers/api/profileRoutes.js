const router = require('express').Router();
const fs = require('fs');


// const Profile = require('../../models/Profile'); 
const User = require('../../models/User'); 

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const server = http.createServer((req, res) => {
  if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
    const form = new formidable.IncomingForm();

    form.uploadDir = 'uploads/';

    // Parse the form data
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
     
      const file = files.profilePicture;

      // Move uploaded file to a permanent location
      const newPath = form.uploadDir + file.name;
      fs.rename(file.path, newPath, (err) => {
        if (err) {
         
          console.error(err);
          res.statusCode = 500;
          res.end('Internal Server Error');
          return;
        }

        // File upload success
        res.statusCode = 200;
        res.end('Profile picture uploaded successfully.');
      });
    });
  } else {
    
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm();
  
    // Set the directory to save uploaded files
    form.uploadDir = 'uploads/';
  
    form.parse(req, (err, fields, files) => {
      if (err) {
        // Handle any error 
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Access the uploaded file details
      const file = files.profilePicture;
  
      // Move uploaded file to a permanent location
      const newPath = form.uploadDir + file.name;
      fs.rename(file.path, newPath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }

        res.status(200).send('Profile picture uploaded successfully.');
      });
    });
  });
  

router.post('/save-profile',async (req, res) => {
    // Extract the form data from the request body
    const formData = req.body;
    console.log('req.session.user_id',req.session.user_id)
    console.log(!formData.firstName , !formData.lastName , !formData.email , !formData.phone , ! formData.address)
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || ! formData.address) {
      return res.status(400).json({ error: "required fields are missing"});
    } 
    const userData = await User.findOne({id:req.session.user_id});
   userData.firstname=formData.firstName;
   userData.lastname=formData.lastName;
   userData.email=formData.email;
   userData.phone=formData.phone;
   userData.address=formData.address
    userData.save() 
    .then((d) => {
      console.log(d)
      res.json({ message: 'Profile saved successfully' });
    })
  
  .catch((error) => {
    console.error(error);
    res.status(500).json({ error: 'Failed to save the profile' });
  });

});

module.exports = router;  