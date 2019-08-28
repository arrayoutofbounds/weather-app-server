const path = require("path");
const express = require("express");

const app = express(); // create the express application

// customise the server
// static is a function and then uses what you give it and displays static info. 
app.use(express.static(path.join(__dirname, '../public'))); 

// CAN access html pages i.e /about.html

// content shown for home page will be index.html.  This is done automatically. route url matches to index.html in the public folder. Hence we do not need the following route
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>');
// });

app.get('/weather', (req, res) => {
    res.send([{
        name: 'anmol',
        age: 'unknown'
    }])
})

app.listen(3000, () => {
    console.log("Server start");
});