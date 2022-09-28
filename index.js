// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get('/api', (req, res) => {
  const inputDate = new Date();
  res.json(dateToJSON(inputDate));
})

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:year-:month-:day', (req, res) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const day = Number(req.params.day);
  if(Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    res.json({error:"Invalid Date"});
  } else {
  const inputDate = new Date(req.params.year, req.params.month - 1, req.params.day);
  res.json(dateToJSON(inputDate));
  }
});

const isNum = (year, month, day) => {
  console.log(Number.isNaN(year), Number.isNaN(month), Number.isNaN(day));
}

app.get('/api/:unix', (req, res) => {
  const inputUnix = req.params.unix;
  
  const checkInput1 = Date.parse(inputUnix);
  const checkInput2 = Date.parse(new Date(Number(inputUnix)));

  if (isNaN(checkInput1) && isNaN(checkInput2)) {
    res.json({error:"Invalid Date"});
  } else if (isNaN(checkInput1) == false){

    const inputDate = new Date(Date.parse(inputUnix));
    res.json(dateToJSON(inputDate));
    
  } else if (isNaN(checkInput2) == false){

    const inputDate = new Date(Number(req.params.unix));
    res.json(dateToJSON(inputDate));
  }
});

const dateToJSON = function(inputDate) {
  const jsonDate = inputDate.toJSON();
  const jsonDateUTC = new Date(jsonDate).toUTCString();
  const unixDate = inputDate.getTime();
  return{"unix": unixDate,"utc": jsonDateUTC}
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});