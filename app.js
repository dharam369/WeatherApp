const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req,res) {

    const query = req.body.cityName;
    const appid = "42ae3bf1f0288fe71a1d3a94fa471595";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + units;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently  " + weatherDescription + "</p > ");
            res.write("<h1>The Temperature in " + query + " is " + temp + " degree Celcius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });

})

/*
    const query = req.body.cityName;
    const appKey = "42ae3bf1f0288fe71a1d3a94fa471595";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + units;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon

            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently" + weatherDescription + "</p > ")
            res.write("<h1>The Temperature in "+query+" is" + temp + "degree Celcius.</h1>")
            res.write("<img src=" + imageURL + ">");
            res.send()
        })
    })

*/




app.listen(3000, function() {
    console.log("Server is listening port 3000");
})