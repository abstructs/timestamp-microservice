var express = require('express');
var app = express();
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

app.use('/:time', function(req, res, next){
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

app.get('/:time', function(req, res){
  var reqNaturalDate = new Date(req.params.time);
  var reqUnixDate = new Date(req.params.time * 1000);
  var returnObj = {
    "unix": null,
    "natural": null
  };
  if (!(isNaN(reqNaturalDate))) {
    returnObj.unix = Date.parse(reqNaturalDate);
    returnObj.natural = monthNames[reqNaturalDate.getMonth()] + ' ' + reqNaturalDate.getDate() + ', ' + reqNaturalDate.getFullYear();
    res.sendStatus(JSON.stringify(returnObj));
  }
  else if (!(isNaN(reqUnixDate))){
    returnObj.unix = parseInt(req.params.time);
    returnObj.natural = monthNames[reqUnixDate.getMonth()] + ' ' + reqUnixDate.getDate() + ', ' + reqUnixDate.getFullYear();
    res.sendStatus(JSON.stringify(returnObj));
  }
  else {
    res.sendStatus(JSON.stringify(returnObj))
  }
  res.end();
});

app.use('/', express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.end();
});
app.listen(3000, function(){
  console.log('Server is running on port 3000...');
});
