const path = require("path");
const express = require("express");
const hbs = require('hbs');

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const app = express(); // create the express application

// set an express property for which templating engine to use.
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// directory for partials
hbs.registerPartials(partialsPath);

// customise the server
// static is a function and then uses what you give it and displays static info. 
app.use(express.static(path.join(__dirname, '../public'))); 

// CAN access html pages i.e /about.html
// content shown for home page will be index.html.  This is done automatically. route url matches to index.html in the public folder.
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'ad',
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'ad',
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'ad'
    })
});

app.get('/weather', (req, res) => {
    res.send([{
        name: 'anmol',
        age: 'unknown'
    }])
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Cannot find help page'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        error: "Page not found"
    })
});

app.listen(3000, () => {
    console.log("Server start");
});