const axios = require('axios');
const express = require('express');
const app = express();
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Allow-Methods", "*");
    res.set("x-requested-with", "XMLHttpRequest");
    res.set("Access-Control-Expose-Headers","Content-Encoding,api_key");
    res.set("origin","http://localhost:3001");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    next();
});

this.Api = process.env.API_KEY

app.post("/", (req, res) => {
    let {location} = req.body;
    axios.get(`https://serpapi.com/search.json?engine=google_events&q=Events+in+${location}&google_domain=google.com&gl=us&hl=en&api_key=${this.Api}`)
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            res.send(error.response.data);
        });
});