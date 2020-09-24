const openWeatherApiKey = "e93223a6b1823d41860077c8e54b5206"; // D
// fetch for openWeather current weather API

const api = {
    requestCityWeather = async (cityName) => {
        const WeatherURL = "https://api.openweathermap.org/data/2.5/weather";
        const query = `?q=${cityName}&appid=${openWeatherApiKey}`;
        const response = await fetch((WeatherURL + query), {method: "GET"});
        const data = await response.json();
        return data;
    },
    // fetch for openWeather UV index API
    requestCityUVI = async (cityName) => {
        const uviAPIURL = "https://api.openweathermap.org/data/2.5/uvi";
        let lat = cityName.coord.lat;
        let lon = cityName.coord.lon;
        const query = `?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`;
        const response = await fetch((uviAPIURL + query), {method: "GET"});
        const data = await response.json();
        return data;
    },
    // fetch for openWeather forecast weather API
    requestCityForecast = async (cityid) => {
        const queryforecastURL = "https://api.openweathermap.org/data/2.5/forecast";
        const query = `?id=${cityid}&appid=${openWeatherApiKey}`;
        // make fetch call (promise call)
        const response = await fetch((queryforecastURL + query), {method: "GET"});
        // promise data
        const data = await response.json();
        return data;
    }

}



module.exports = api;