let weather = {
  apikey: "d1e6a082c96a1d42f706929ed8554b3c",
  //fetching weather information from OpenWeatherMap API
  fetchWeather: function (cityName) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&units=metric&appid=" +
        this.apikey
    )
      .then((Response) => Response.json())
      .then((data) => this.displayWeather(data));
  },

  // Display fetched information on the website
  displayWeather: function (jsonData) {
    const { name } = jsonData;
    const { icon, description } = jsonData.weather[0];
    const { temp, humidity } = jsonData.main;
    const { speed } = jsonData.wind;

    $("div h2").text("Weather in " + name);
    $("div p.tempreture").text(+temp + " ℃");
    $("div p.humidity").text("Humidity: " + humidity + "%");
    $("div p.wind").text("Wind speed: " + speed + " km/h");
    $("div p.skyDescription").text(description);
    $("div img.icon").attr(
      "src",
      "http://openweathermap.org/img/wn/" + icon + ".png"
    );
  },

  // Run the application with the text that is writen in the search box
  searchInput: function () {
    var cityName = $("div input.searchBar").val();
    weather.fetchWeather(cityName);
    this.backgroundChanger(cityName);
  },
  //changes the background picture by using unsplash API
  backgroundChanger: function (cityName) {
    $("body").css(
      "background-image",
      "url( 'https://source.unsplash.com/random/1600x12008/?" + cityName + "')"
    );
  },
};

//Run the application when search bottom is clicked
$("div button").click(function () {
  weather.searchInput();
});

//This calling is used to run the application with "gothenburg" as a default value
weather.fetchWeather("gothenburg");
