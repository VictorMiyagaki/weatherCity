const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "7ba894935b68ab669d8642128222427d";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.write("<body style='background-color:lightblue; text-align: center;'>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees</h1>");
            res.write("<p>The weather is " + weatherDescription + "</p>");
            res.write("<img src='" + icon + "'>")
            res.send();
        })
    })
})


app.listen(3000, function () {
    console.log("Server is running on port 3000");
})