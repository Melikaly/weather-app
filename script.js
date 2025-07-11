// EventListner to get location Input
document.getElementById("location-input").addEventListener('change', async ()=>{
    // Get the user entered Location
    const location = document.getElementById("location-input").value;

    // Fetch the weather data
    const weatherData =  await getweatherData(location);

    // Display the weather data on the page
    displayWeatherData(weatherData);

});

const getweatherData = async (location) =>{
    if (!location){
        return {};
    }

    const apiKey = '240ed60a17ada95e08e72c8dca041f57';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    const data =  await response.json();

    return data;
};

function getBackgroundColor(temperature){
    if(temperature < 0 ){
        return 'lightblue';
    }else if (temperature < 10){
        return 'lightgreen';
    }else if (temperature < 20){
        return 'lightyellow';
    }else if (temperature < 20){
        return 'lightsalmon';
    }else if (temperature < 30){
        return 'lightblue';
    }else {
        return 'lightcoral';
    }
}

const displayWeatherData = (data) =>{
    const weatherDataElement = document.getElementById("weather-data");
 
    if(Object.keys(data).length === 0){
        weatherDataElement.innerHTML = "PLease enter a location to see the weather.";
    }else {
        const backgroundColor = getBackgroundColor(Math.floor(data.main.temp -272.15)); 
        weatherDataElement.style.backgroundColor = backgroundColor;

        weatherDataElement.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${Math.floor(data.main.temp -272.15)}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>

        `;
    }
}

window.onload = async () =>{
    const weatherData = await getweatherData();
    displayWeatherData(weatherData);
}