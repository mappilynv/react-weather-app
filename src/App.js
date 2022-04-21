import searchIcon from './searchicon.png';

function getCurrentDate(data) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = days[data.getDay()];
  const date = data.getDate();
  const month = months[data.getMonth()];
  const year = data.getFullYear()

  return (
    <div>{day} {date} {month}, {year}</div>
  )
}

const today = new Date();
const ampm = Date() >= 12 ? 'PM' : 'AM'
const time = today.getHours() + ':' + today.getMinutes();


function App() {

  let weather = {
    apiKey: "600ff19ab2c6f83d318296acc21c57f2",
    fetchWeather: function (zipCode) {
      fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&units=imperial&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, temp_min, temp_max, humidity, feels_like } = data.main;
      const { speed } = data.wind;
      document.querySelector('.city').innerText = "Weather in " + name;
      document.querySelector('.weatherDescription').innerText = description;
      document.querySelector('.normalTemp').innerText = Math.round(temp) + " °F";
      document.querySelector('.weatherIcon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector('.highTemp').innerText = Math.round(temp_max) + "°F";
      document.querySelector('.lowTemp').innerHTML = Math.round(temp_min) + "°F";
      document.querySelector('.feelsLike').innerHTML = "Feels like: " + Math.round(feels_like) + "°F";
      document.querySelector('.humidity').innerText = "Humidity:" + humidity + "%";
      document.querySelector('.wind').innerText = "Wind speed: " + Math.round(speed) + " mph";
    },
    search: function searchWeather() {
      this.fetchWeather(document.querySelector('.searchBox').value);
    },
  }

  weather.fetchWeather("28031");

  const buttonSearch = () => {
    weather.search()
  }

  const enterSearch = (evt) => {
    if (evt.key === "Enter") {
      weather.search();
    }
  };



  return (
    <div className="main">
      <div className="searchContainer">
        <input className="searchBox" type="text" onKeyPress={enterSearch} />
        <button className="searchButton" onClick={buttonSearch}><img src={searchIcon} className="searchIcon" alt="search icon" /></button>
      </div>
      <div className="infoContainer">
        <div className="infoWeather">
          <div className="normalTemp"><h1 className="normalTempText"></h1></div>
          <div className="weatherContainer">
            <div className="weatherBox1">
              <div className="temp"></div>
              <div className="otherTemp"></div>
              <div className="highLowTemp">
                <div className="highTemp"></div>
                <div> / </div>
                <div className="lowTemp"></div>
              </div>
              <div className="feelsLike"><p></p></div>
            </div>
            <div className="weatherBox2">
              <img src="" alt="weather icon image" className="weatherIcon" />
              <div className="weatherDescription"></div>
              <div className="humidity"></div>
              <div className="wind"></div>
            </div>
          </div>
        </div>
        <div className="cityDateBox">
          <h2 className="city">Weather in </h2>
          <h3 className="date">{getCurrentDate(new Date())} {time} {ampm}</h3>
        </div>
      </div>



    </div>
  )
}

export default App;


