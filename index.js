//const mongoose = require('mongoose');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listen to port ${PORT}`));
app.use(express.static('public'));
app.use(express.json({ limit: '5mb' }));
app.use(fileUpload());

var text = { 'hello.txt': 'Hello World!', 'bye.txt': 'Goodbye Cruel World!' };
app.get('/files/:name', function(req, res) {
  res.set({
    'Content-Disposition': `attachment; filename="${req.params.name}"`,
    'Content-type': 'text/plain'
  });
  res.send(text[req.params.name]);
});

app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./public/data/' + sampleFile.name, function(err) {
    if (err) return res.status(500).send(err);

    res.send('File uploaded!');
  });
});
