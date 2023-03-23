const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("index");
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
            res.render("weather", { icon: icon, weatherDescription: weatherDescription, query: query, temp: temp });
        })
    })
})


app.listen(3000, function () {
    console.log("Server is running on port 3000");
})