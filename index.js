//JS Iniatilise modules
const express = require("express");
const app = express();
const https = require("https");
//const ejs = require("ejs");

const bodyParser = require("body-parser");

//Serve Resources to be used
//app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

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
      const wImage = "src=http://openweathermap.org/img/wn/" + icon + "@2x.png width='300px' height='200px'";


      // res.write("<p>The conditions are :<h1>" + weatherDes + "</h1></p>");
      // res.write("The current temperature is :<h1>" + temp + "</h1> Degress Celcius in " + city + "<br>");
      // res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png' width='100' height='100'>");
      // res.send();
      res.render("index", {pCity: city,pTemp: temp, pDescrip: weatherDes, pImage: wImage});


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


app.listen(process.env.PORT || 3000, function() {
  console.log("The server has started on port ");
});
