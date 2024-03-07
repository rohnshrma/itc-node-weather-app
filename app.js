const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios")


// ṃiddleware
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")



app.get("/", (req, res) => {
    res.render("home")
})

app.post("/", (req, res) => {
    var city = req.body.city
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3ed1a8944ae36bde087adc8f67d0f04a&units=metric`


    var weather_data = {}

    axios.get(url)
        .then((response) => {
            var data = response.data
            weather_data.temperature = data.main.temp
            weather_data.description = data.weather[0].description
            weather_data.icon_url = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            weather_data.city = city

            console.log(weather_data);
            res.render("weather",{weather : weather_data})
        })
        .catch(err => {
            console.log(err);
        })


})


app.listen(5000, () => {
    console.log("Server started on port 5000");
})