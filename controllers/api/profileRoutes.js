const router = require('express').Router();
const formidable = require('formidable');
const fs = require('fs');
const bodyParser = rewquore('body-parser');

const Profile = require('../../models/Profile'); 

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());



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
  

  app.post('/save-profile', (req, res) => {
    // Extract the form data from the request body
    const formData = req.body;

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || ! formData.address) {
      return res.status(400).json({ error: "required fields are missing"});
    } 

    const profile = new Profile ({ 
      firstname: formData.firstName,
      lastName: formData.lastName,
      email: formData.enail,
      phone: formData.phone,
      address: formData.address
    });
    
    profile.save() 
    .then(() => {
      res.json({ message: 'Profile saved successfully' });
    })
  
  .catch((error) => {
    console.error(error);
    res.status(500).json({ error: 'Failed to save the profile' });
  });

});

  module.exports = router;  