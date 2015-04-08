var request = require("request");
var colbysKey = "49807b9f8418a122";
var express = require("express");
var fs = require("fs");
var mustache = require("mustache");
var linkHome = "<a href='/'> home </a>";

var app = express();

app.get('/', function (req, res) {
    var html = fs.readFileSync('./index.html', 'utf8');
  res.send(html);
});

app.get('/formcast', function(req, res){
    var state = req.query.state;
    var city = req.query.city;
    var url = "http://api.wunderground.com/api/"+colbysKey+"/conditions/q/"+ state + "/" +city+".json";
    request(url, function(err, response, body){
        var parsed = JSON.parse(body);
        var temp = parsed.current_observation.temp_f.toString();
        res.send("<h1> in " +city+ " "+ state + " the temp is " + temp + "</h1>")
    })

})

app.get('/forecast/:city/:state', function(req,res){
    var city = req.params.city
    var state = req.params.state
    var url = "http://api.wunderground.com/api/"+colbysKey+"/conditions/q/"+ state + "/" +city+".json"
    request(url, function(error,response,body){
        var parsed = JSON.parse(body);
        var temp = parsed.current_observation.temp_f
        if(temp < 50){
            res.send("<span style='color: blue'>" + temp.toString() + "</span>" + linkHome)
        }else{
            res.send("<span style='color: red'>" + temp.toString() + "</span>" + linkHome)        }
    });
});

app.get('/forecast/:city/:state/:hour', function(req,res){
    var city = req.params.city
    var state = req.params.state
    var hour = req.params.hour
    var url = "http://api.wunderground.com/api/"+colbysKey+"/hourly/q/"+ state + "/" +city+".json"
    request(url, function(error,response,body){
        var parsed = JSON.parse(body);
        var temp;
        parsed.hourly_forecast.forEach(function(e){
            if(e.FCTTIME.hour === hour){
                temp = e.temp.english
            }
        })
        res.send("<span> The temp in " + city + " is " +temp + "degrees </span>" + linkHome)
    })

});

app.get('/breakdown/:city/:state', function(req,res){
    var city = req.params.city
    var state = req.params.state
    var url = "http://api.wunderground.com/api/"+colbysKey+"/hourly/q/"+ state + "/" +city+".json"
    request(url, function(error,response,body){
        var parsed = JSON.parse(body);
        var arrayOfForecasts = []
        parsed.hourly_forecast.forEach(function(e){
            var newObject = {time: e.FCTTIME.pretty, temp: e.temp.english};
            arrayOfForecasts.push(newObject);
        })
        var template = fs.readFileSync('./template.html', 'utf8');
        var html = mustache.render(template, {forecasts: arrayOfForecasts});
        res.send(html);
    })

});







var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});






