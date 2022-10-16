<template>
  <div
    id="app"
    :class="
      typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''
    "
  >
    <main>
      <div class="search-box">
        <input
          v-model="query"
          @keypress="fetchWeather"
          type="text"
          class="searchbar"
          placeholder="Search..."
        />
      </div>
      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">
            {{ weather.name }}, {{ weather.sys.country }}
          </div>
          <div class="date">{{ dateNow() }}</div>
        </div>

        <div class="weather-box">
          <div class="temperature">{{ Math.round(weather.main.temp) }}°C</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>
      <div class="no-results" v-else-if="typeof weather.main == 'undefined'">
        <span>Sorry, no results found</span>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      API_KEY: "adc50200af1f545c16bb1e24c329e219",
      URL_BASE: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: "",
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(
          `${this.URL_BASE}weather?q=${this.query}&units=metric&APPID=${this.API_KEY}`
        )
          .then((resp) => {
            return resp.json();
          })
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = null;
      this.weather = results;
    },

    dateNow() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date}, ${month} ${year}`;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Montserrat", "Helvetica Neue", "Helvetica", "Arial", sans;
}

#app {
  width: 100vw;
  height: 100vh;
  transition: all 0.4s;
  background: center / cover no-repeat
    url("https://images.unsplash.com/photo-1664736939017-cb84613d9f7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
}

#app.warm {
  background: center / cover no-repeat
    url("https://images.unsplash.com/photo-1472120435266-53107fd0c44a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
}

main {
  min-height: 100vh;
  padding: 25px;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.5)
  );
}

.no-results {
  color: #e2e2e2;
  text-align: center;
  font-weight: 700;
  font-size: 22px;
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.searchbar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #333;
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.4s;
}

.searchbar:focus {
  background-color: rgba(255, 255, 255, 0.9);
}

.location {
  color: #e2e2e2;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
}

.date {
  color: #bebebe;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
  margin: 40px;
}

.weather-box .temperature {
  display: inline-block;
  padding: 15px 35px;
  color: #e2e2e2;
  font-size: 102px;
  font-weight: 900;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 40px;
}

.weather-box .weather {
  margin-top: 20px;
  color: #bebebe;
  font-size: 32px;
  font-weight: 700;
}
</style>
