const route = require('express').Router();
const axios = require('axios');
const fetch = require('node-fetch');
require('dotenv').config();

route.get('/', (req, res) => {
    res.render("demo", {
        city: null,
        des: null,
        icon: null,
        temp: null
    })
})
route.post('/', async (req, res) => {
    const city = req.body.city;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    try {
        fetch(url)
            .then(data => {
                if (data.message === 'city not found') {
                    res.render('demo', {
                        city: data.message,
                        des: null,
                        icon: null,
                        temp: null
                    })
                }
                else {
                    res.render('demo', {
                        city: data.name,
                        des: data.weather[0].description,
                        icon: data.weather[0].icon,
                        temp: data.main.temp
                    })
                }
            })

    } catch (error) {
        res.render('demo', {
            city: "something wrong",
            des: null,
            icon: null,
            temp: null
        })
    }
})


module.exports = route