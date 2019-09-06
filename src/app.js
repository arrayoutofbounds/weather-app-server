const path = require("path");
const express = require("express");
const hbs = require('hbs');

const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const app = express(); // create the express application

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// set an express property for which templating engine to use.
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// directory for partials
hbs.registerPartials(partialsPath);

// customise the server
// static is a function and then uses what you give it and displays static info. 
app.use(express.static(path.join(__dirname, '../public'))); 

// CAN access html pages i.e /about.html
// content shown for home page will be index.html.  This is done automatically. route url matches to index.html in the public folder. home page route matches index.html automatically
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
    if(!req.query.address){
        return res.send({
            error: "Provide an address"
        });
    }

    geoCode(req.query.address, (error, { longtitude, lattitude, location } = {}) => {
        if(error){
            return res.send({
                error
            });
        }
        forecast(lattitude, longtitude, (error, { temp, precipProbability, summary, finalResult } = {}) => {
            if(error){
                return res.send({
                    error
                });
            }

            res.send({
                temp,
                precipProbability,
                summary,
                location,
                address: req.query.address,
                finalResult
            })
        })
    });
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Cannot find help page',
        name: 'ad',
        title: '404'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        error: "Page not found",
        name: 'ad',
        title: '404'
    })
});

app.listen(port, () => {
    console.log("Server start");
});