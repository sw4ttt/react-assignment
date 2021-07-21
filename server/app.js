'use strict';
const fs = require('fs');
const path = require('path');
var _ = require('lodash')
const express = require('express');
var morgan = require('morgan');
const app = express();
const port = 3000;
var multipart = require('connect-multiparty');

app.use(express.static(path.join(__dirname, "..", "build")));

app.use(express.static("public"));



app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(multipart({
  uploadDir: "./temp-files"
}));

fs.readdir("./temp-files", (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join("./temp-files", file), err => {
      if (err) throw err;
    });
  }
});


var surveyController = require('./api/survey.controller');

app.get('/api/survey/all', surveyController.getAll);
app.post('/api/survey/save', surveyController.save);
app.post('/api/testimonial/save', surveyController.testimonialSave);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})