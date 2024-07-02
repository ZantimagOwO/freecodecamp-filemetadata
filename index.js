var express = require('express');
var cors = require('cors');
require('dotenv').config()
const fs = require("node:fs");
const bodyParser = require('body-parser');
const multer = require('multer');
const storage = multer({dest: "/sotrage"})

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use("/", bodyParser.urlencoded({ extended: false}));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", storage.single('upfile') ,function (req, res) {
  let file = req.file
  console.log(file);

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  })
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
