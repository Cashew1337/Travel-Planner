const router = require('express').Router();
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');

const app = express();

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
  
    // Parse the form data
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
  


  module.exports = router;