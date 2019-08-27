const express = require("express");

const app = express();

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>');
});

app.get('/help', (req, res) => {
    res.send({
        name: 'anmol',
        age: 'unknown'
    })
})

app.get('/about', (req, res) => {
    res.send("about page")
})

app.get('/weather', (req, res) => {
    res.send("weather page")
})

app.listen(3000, () => {
    console.log("Server start");
});