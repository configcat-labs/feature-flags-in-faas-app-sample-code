const functions = require('@google-cloud/functions-framework');
const configcat = require("configcat-node");
const fetch = require('node-fetch');

let configCatClient = configcat.createClient("ScDaCD8ETUuG7wYo3BdP2A/5s96HBVckk-RzI-iVf-zRA")

functions.http('weather', async (req, res) => {

const isWeatherInfoFeatureFlagEnabled = await configCatClient.getValueAsync("weatherinfo",  false);

if (isWeatherInfoFeatureFlagEnabled) {
    const myData = await fetch('http://api.openweathermap.org/data/2.5/weather?q=france&appid=9e3b54f35c574e2bef004720df52675a');
    const myDataAsJson = await myData.json()
    res.send(myDataAsJson);
} else {
    res.send("Sorry, this service is unavailable. Try again later.");
}

});