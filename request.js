var request = require("request");
var colbysKey = "49807b9f8418a122";
var express = require("express");


var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/:city/:state/:hour', function(req,res){
    var city = req.params.city
    var state = req.params.state
    var hour = req.params.hour
    var url = "http://api.wunderground.com/api/"+colbysKey+"/hourly/q/"+ state + "/" +city+".json"
    request(url, function(error,response,body){
        var parsed = JSON.parse(body);
        parsed.hourly_forecast.forEach(function(e){
            if(e.FCTTIME.hour === hour){
                console.log(e.temp.english)
                var temp = e.temp.english
                res.send(temp)
            }
        })
    })

});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});






// console.log("this is on line ten but it will print before the stuff on line 5")