var request = require("request");


var request = require('request');
request('http://pokeapi.co/api/v1/pokedex/1/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) 
    var someData = //JSON.parse(body).name
    namer(someData)
  }
})


console.log('lol')
console.log('lolagain')
console.log("hehehe")
console.log('heehe')


function namer(data){
    console.log(data)
}