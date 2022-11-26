const functions = require('@google-cloud/functions-framework');
const configcat = require("configcat-node");
const fetch = require('node-fetch');

let configCatClient = configcat.createClient("YOUR_SDK_KEY")

functions.http('weather', async (req, res) => {

const isWeatherInfoFeatureFlagEnabled = await configCatClient.getValueAsync("weatherinfo",  false);

if (isWeatherInfoFeatureFlagEnabled) {
    const myData = await fetch('http://api.openweathermap.org/data/2.5/weather?q=france&appid=YOUR-OPENWEATHER-API-KEY');
    const myDataAsJson = await myData.json()
    res.send(myDataAsJson);
} else {
    res.send("Sorry, this service is unavailable. Try again later.");
}

});