// 3.0 Version (doesn't work?)
// https://api.openweathermap.org/data/3.0/onecall?lat={33.44}&lon={-94.04}&units=imperial&exclude={part}&appid={apiKey}

// 2.5 Version
// https://api.openweathermap.org/data/2.5/weather?q=Denver&units=imperial&appid={apiKey}

let weather = {
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=imperial&appid=" 
            // + this.apiKey   //  Couldn't get this.apiKey to work? Kept rendering as "undefined"
            + "d0e3b1b5303a0ce18fa3c964d47de025"
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + " °F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')" // + name + for City Picture, + description + for Weather picture
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
        weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search()
        };
});

weather.fetchWeather("Tokyo");