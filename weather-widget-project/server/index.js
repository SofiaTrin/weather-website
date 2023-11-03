const express = require("express");
const axios = require('axios');
const NodeCache = require("node-cache");

const PORT = process.env.PORT || 3001;

const app = express();
const cache = new NodeCache({ stdTTL: 1800 }); // Cache saves data for 30 minutes

//                Lisbon     Leiria     Coimbra     Porto      Faro
const cityIds = ["2267056", "2267094", "2740636", "2735941", "2268337"];

// Insert here you API Key from OpenWeather
const apiKey = ""

// Get weather information of a city using OpenWeather API
async function getCityMeteorology(cityNumber) {
    const url = "http://api.openweathermap.org/data/2.5/forecast";

    try{
        return await axios
            .get(url + "?id=" + cityIds[cityNumber] + "&APPID=" + apiKey)
            .then(res => res.data.list[0].main.temp)
    } catch(error) {
        console.log(error.message);
    }
        
}

app.get('/', (req, res) => {
    res.send('root')
})

// Get weather information in Lisbon
app.get("/lisbon", (req, res) => {
    const cityNumber = 0;

    // Get weather information in Lisbon in cache
    const value = cache.get(cityIds[cityNumber]);

    // If cache has the weather information
    if (value !== undefined) {
        return res.status(200).json({ message: 'Request received from cache!', meteorology: value })
    } else {
        getCityMeteorology(cityNumber).then(meteorology => {
            if (meteorology != null) {
                // Save weather information in cache
                cache.set(cityIds[cityNumber], meteorology);
            }

            return res.status(200).json({ message: 'Request received!', meteorology });
        })
        .catch(err => {console.log(err)});
    }
});

// Get weather information in Leiria
app.get("/leiria", (req, res) => {
    const cityNumber = 1;

    // Get weather information in Leiria in cache
    const value = cache.get(cityIds[cityNumber]);

    // If cache has the weather information
    if (value !== undefined) {
        return res.status(200).json({ message: 'Request received from cache!', meteorology: value })
    } else {
        // Get new weather information from OpenWeather API
        getCityMeteorology(cityNumber).then(meteorology => {
            if (meteorology != null) {
                // Save weather information in cache
                cache.set(cityIds[cityNumber], meteorology);
            }

            return res.status(200).json({ message: 'Request received!', meteorology });
        })
        .catch(err => console.log(err));
    }
});

// Get weather information in Coimbra
app.get("/coimbra", (req, res) => {
    const cityNumber = 2;

    // Get weather information in Coimbra in cache
    const value = cache.get(cityIds[cityNumber]);

    // If cache has the weather information
    if (value !== undefined) {
        return res.status(200).json({ message: 'Request received from cache!', meteorology: value })
    } else {
        // Get new weather information from OpenWeather API
        getCityMeteorology(cityNumber).then(meteorology => {
            if (meteorology != null) {
                // Save weather information in cache
                cache.set(cityIds[cityNumber], meteorology);
            }

            return res.status(200).json({ message: 'Request received!', meteorology });
        })
        .catch(err => console.log(err));
    }
});

// Get weather information in Porto
app.get("/porto", (req, res) => {
    const cityNumber = 3;

    // Get weather information in Porto in cache
    const value = cache.get(cityIds[cityNumber]);

    // If cache has the weather information
    if (value !== undefined) {
        return res.status(200).json({ message: 'Request received from cache!', meteorology: value })
    } else {
        // Get new weather information from OpenWeather API
        getCityMeteorology(cityNumber).then(meteorology => {
            if (meteorology != null) {
                // Save weather information in cache
                cache.set(cityIds[cityNumber], meteorology);
            }

            return res.status(200).json({ message: 'Request received!', meteorology });
        })
        .catch(err => console.log(err));
    }
});

// Get weather information in Faro
app.get("/faro", (req, res) => {
    const cityNumber = 4;

    // Get weather information in Faro in cache
    const value = cache.get(cityIds[cityNumber]);

    // If cache has the weather information
    if (value !== undefined) {
        return res.status(200).json({ message: 'Request received from cache!', meteorology: value })
    } else {
        // Get new weather information from OpenWeather API
        getCityMeteorology(cityNumber).then(meteorology => {
            if (meteorology != null) {
                // Save weather information in cache
                cache.set(cityIds[cityNumber], meteorology);
            }

            res.status(200).json({ message: 'Request received!', meteorology });
        })
        .catch(err => console.log(err));
    }
});

// Catch not found error
app.use(function(req, res, next) {
    res.status(404).send({
        message: "Not found",
        code: 404
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});