const weatherApiLink = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';
const key = "7686f0c1b59995cf23b48c391656614e";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImg = document.querySelector(".weather-icon")


async function weather(city){
    const response = await fetch(weatherApiLink + city + `&appid=${key}`);
    if(response.status == 404){
        document.querySelector('.error').style.display= 'block';
        document.querySelector('.weather').style.display = 'none';
    }else{
        document.querySelector('.error').style.display= 'none';
    var data = await response.json();

    document.querySelector('.city').innerHTML = data.name + ` <i class="fa-solid fa-location-dot"></i>`;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
    // make every first word capital letter
    var desc = data.weather[0].description;
    var array = desc.split(" ")
    for(var i = 0 ; i < array.length; i++){
        document.querySelector('.desc').innerHTML +=  array[i].charAt(0).toUpperCase() + array[i].slice(1) + " ";
    }
    document.querySelector('.feelsLike').innerHTML =  data.main.temp_max+'°' + ' / ' + data.main.temp_min +'°' + 
    " Feels like " + Math.round(data.main.feels_like) + "°C";
    document.querySelector('.humidity').innerHTML = data.main.humidity +"%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
    
    if(data.weather[0].main == "Clouds"){
        weatherImg.src = './images/clouds.png';
    }
    else if(data.weather[0].main == "Clear"){
        weatherImg.src = './images/clear.png';
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherImg.src = './images/drizzle.png';
    }
    else if(data.weather[0].main == "Mist"){
        weatherImg.src = './images/mist.png';
    }
    else if(data.weather[0].main == "Rain"){
        weatherImg.src = './images/rain.png';
    }
    else if(data.weather[0].main == "Snow"){
        weatherImg.src = './images/snow.png';
    }
    const weather = document.querySelector(".weather");
    weather.style.display = "block";
}
}

searchBtn.onclick = () =>{
    document.querySelector('.desc').innerHTML = " ";
    weather(searchBox.value);
}
