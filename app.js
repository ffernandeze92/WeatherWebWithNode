const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
  console.log(req.body.cityName);
  console.log("Post request recieved")

  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=2e4b6d7c63931567c31b894bd3265f76&units=metric";

  https.get(url,function(response){

  //    console.log(response);
  console.log(response.statusCode);
      response.on("data",function(data){
      console.log(data);
      const weatherData = JSON.parse(data);
      console.log('la data es: '+JSON.stringify(weatherData,null,"\t"));

      console.log(weatherData.main.temp);
      const temp = weatherData.main.temp;
      console.log(weatherData.weather[0].description);

      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<p>the weather is currently: "+weatherData.weather[0].description+"</p>");
      res.write("<h1>The temperature in" +req.body.cityName+" is: "+temp + "decrees Celcius.</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
      })
  });








})



app.listen(3000,function(){
  console.log("server is running");
})
