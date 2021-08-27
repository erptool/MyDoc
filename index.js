//JS Iniatilise modules
const express = require("express");
const app = express();
const https = require("https");

const bodyParser = require("body-parser");

//Serve Resources to be used
//app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function (req,res) {

  //res.sendFile(__dirname+"/index.html");

  const apiKey = "d345ca3d71b76902ce2908160c2715d6";
  const city = "Lisbon";
  const unitDef = "metric";

  const url ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey +"&units=" + unitDef;


  https.get(url, function (response) {

    //console.log(response.statusMessage);

      response.on("data", function(data) {

      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const city = weatherData.name
      const weatherDes = weatherData.weather[0].description

      const icon = weatherData.weather[0].icon

      res.write("<p>The conditions are :<h1>" + weatherDes + "</h1></p>");
      res.write("The current temperature is :<h1>" + temp + "</h1> Degress Celcius in " + city + "<br>");
      res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png' width='100' height='100'>");
      res.send();


      //console.log(temp)
      //res.send("<h1>The weather in " + city + " is currently " + temp + " C | " + weatherDes + "</h1>");
      // res.send({
      //
      //   Temp: temp,
      //   City: city,
      //   Weather_Description: weatherDes
      //
      // })
      })

  })

})


app.listen(3000, function() {

  console.log("Hello World!");

})
