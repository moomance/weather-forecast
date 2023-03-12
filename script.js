/** @format */
//hero images

// weather api gets based on city
const newYork =
  "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,apparent_temperature,precipitation&daily=sunrise,sunset&timezone=America%2FNew_York";
const miami =
  "https://api.open-meteo.com/v1/forecast?latitude=25.77&longitude=-80.19&hourly=temperature_2m,apparent_temperature,precipitation&daily=sunrise,sunset&timezone=America%2FNew_York";
const london =
  "https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&hourly=temperature_2m,apparent_temperature,precipitation&daily=sunrise,sunset&timezone=Europe%2FLondon";
const toronto =
  "https://api.open-meteo.com/v1/forecast?latitude=43.70&longitude=-79.42&hourly=temperature_2m,apparent_temperature,precipitation&daily=sunrise,sunset&timezone=America%2FNew_York";

//function to convert cel to far degrees
function celToFah(celsius) {
  let fahrenheit = Math.round(celsius * (9 / 5) + 32);
  return fahrenheit;
}

//current date text
const currentTime = new Date();
document.querySelector(".weather__current-time").innerHTML =
  currentTime.toLocaleTimeString() + " AM";

//target miami button
const miamiButton = document.getElementById("miami");
miamiButton.addEventListener("click", (e) => {
  document.querySelector(".hero").style.backgroundImage =
    "url(Assets/hero/Miami-campus.png)";
  document.querySelector(".weather__campus").innerHTML = "Miami";
  activeCity(e.target);

  //testing the get req within each button event
  axios
    .get(miami)
    .then((res) => {
      //get sunrise time
      const sunrise = res.data.daily.sunrise[0].slice(11);
      document.getElementById("rise").innerText = "Sunrise: " + sunrise + " AM";

      //sunset
      const sunset = res.data.daily.sunset[0].slice(11);
      document.getElementById("set").innerText = "Sunset: " + sunset + " PM";

      //temps
      let mornTemp = Math.floor(res.data.hourly.apparent_temperature[7]);
      let midDayTemp = Math.floor(res.data.hourly.apparent_temperature[11]);
      let endDayTemp = Math.floor(res.data.hourly.apparent_temperature[17]);

      // morn precipitation
      let mornPrecip = res.data.hourly.precipitation[7];

      if (mornPrecip < 0.5) {
        document
          .getElementById("morningPrecipIcon")
          .setAttribute("src", "Assets/Icons/sunny.png");
        document.getElementById("mornPrediction").innerText = "Clear";
      } else if (mornPrecip < 1) {
        document
          .getElementById("morningPrecipIcon")
          .setAttribute("src", "Assets/Icons/cloudy.png");
        document.getElementById("mornPrediction").innerText = "Cloudy";
      } else {
        document
          .getElementById("morningPrecipIcon")
          .setAttribute("src", "Assets/Icons/rainy.png");
        document.getElementById("mornPrediction").innerText = "Rainy";
      }

      //mid day precip
      let midDayPrecip = res.data.hourly.precipitation[11];

      if (midDayPrecip < 1) {
        document
          .getElementById("midDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/sunny.png");
        document.getElementById("midDayPrediction").innerText = "Clear";
      } else if (midDayPrecip < 2) {
        document
          .getElementById("midDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/cloudy.png");
        document.getElementById("midDayPrediction").innerText = "Cloudy";
      } else {
        document
          .getElementById("midDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/rainy.png");
        document.getElementById("midDayPrediction").innerText = "Rainy";
      }

      //evening precip
      let endDayPrecip = res.data.hourly.precipitation[17];

      if (endDayPrecip < 1) {
        document
          .getElementById("endDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/sunny.png");
        document.getElementById("endDayPrediction").innerText = "Clear";
      } else if (endDayPrecip < 2) {
        document
          .getElementById("endDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/cloudy.png");
        document.getElementById("endDayPrediction").innerText = "Cloudy";
      } else {
        document
          .getElementById("endDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/rainy.png");
        document.getElementById("endDayPrediction").innerText = "Rainy";
      }

      //background of current weather div

      //get current time
      function timeOfDay(time) {
        if (time < 9) {
          document.querySelector(
            ".weather__current-temperature"
          ).innerHTML = `${celToFah(mornTemp)} f`;
        } else if (time < 13) {
          document.querySelector(
            ".weather__current-temperature"
          ).innerHTML = `${celToFah(midDayTemp)} f`;
        } else {
          document.querySelector(
            ".weather__current-temperature"
          ).innerHTML = `${celToFah(endDayTemp)} f`;
        }
      }

      timeOfDay(new Date().getHours());

      document.getElementById("morningTemp").innerHTML = `${celToFah(
        mornTemp
      )}  f`;

      document.getElementById("midDayTemp").innerHTML = `${celToFah(
        midDayTemp
      )}  f`;

      document.getElementById("endDayTemp").innerHTML = `${celToFah(
        endDayTemp
      )}  f`;
    })
    .catch((err) => console.log(err));
});

//mew york button
const nyButton = document.getElementById("ny");
nyButton.addEventListener("click", (e) => {
  document.querySelector(".weather__campus").innerHTML = "New York";
  activeCity(e.target);

  //get req within ny button
  axios
    .get(newYork)
    .then((res) => {
      //get sunrise time
      const sunrise = res.data.daily.sunrise[0].slice(11);
      document.getElementById("rise").innerText = "Sunrise: " + sunrise + " AM";

      //sunset
      const sunset = res.data.daily.sunset[0].slice(11);
      document.getElementById("set").innerText = "Sunset: " + sunset + " PM";

      //temps
      let mornTemp = Math.floor(res.data.hourly.apparent_temperature[7]);
      let midDayTemp = Math.floor(res.data.hourly.apparent_temperature[11]);
      let endDayTemp = Math.floor(res.data.hourly.apparent_temperature[17]);

      // morn preciitation
      let mornPrecip = res.data.hourly.precipitation[7];

      console.log(mornPrecip);

      if (mornPrecip < 0) {
        document
          .getElementById("morningPrecipIcon")
          .setAttribute("src", "Assets/Icons/sunny.png");
        document.getElementById("mornPrediction").innerText = "Clear";
      } else if (mornPrecip >= 0) {
        document
          .getElementById("morningPrecipIcon")
          .setAttribute("src", "Assets/Icons/cloudy.png");
        document.getElementById("mornPrediction").innerText = "Cloudy";
      } else {
        document
          .getElementById("morningPrecipIcon")
          .setAttribute("src", "Assets/Icons/rainy.png");
        document.getElementById("mornPrediction").innerText = "Rainy";
      }

      //mid day precip
      let midDayPrecip = res.data.hourly.precipitation[11];

      if (midDayPrecip < 0) {
        document
          .getElementById("midDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/sunny.png");
        document.getElementById("midDayPrediction").innerText = "Clear";
      } else if (midDayPrecip >= 0) {
        document
          .getElementById("midDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/cloudy.png");
        document.getElementById("midDayPrediction").innerText = "Cloudy";
      } else {
        document
          .getElementById("midDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/rainy.png");
        document.getElementById("midDayPrediction").innerText = "Rainy";
      }

      //evening precip
      let endDayPrecip = res.data.hourly.precipitation[17];

      if (endDayPrecip < 0) {
        document
          .getElementById("endDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/sunny.png");
        document.getElementById("endDayPrediction").innerText = "Clear";
      } else if (endDayPrecip >= 0) {
        document
          .getElementById("endDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/cloudy.png");
        document.getElementById("endDayPrediction").innerText = "Cloudy";
      } else {
        document
          .getElementById("endDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/rainy.png");
        document.getElementById("endDayPrediction").innerText = "Rainy";
      }

      //background of current weather div

      //get current time
      function timeOfDay(time) {
        if (time < 9) {
          document.querySelector(
            ".weather__current-temperature"
          ).innerHTML = `${celToFah(mornTemp)} f`;
        } else if (time < 13) {
          document.querySelector(
            ".weather__current-temperature"
          ).innerHTML = `${celToFah(midDayTemp)} f`;
        } else {
          document.querySelector(
            ".weather__current-temperature"
          ).innerHTML = `${celToFah(endDayTemp)} f`;
        }
      }
      timeOfDay(new Date().getHours());

      document.getElementById("morningTemp").innerHTML = `${celToFah(
        mornTemp
      )}  f`;

      document.getElementById("midDayTemp").innerHTML = `${celToFah(
        midDayTemp
      )}  f`;

      document.getElementById("endDayTemp").innerHTML = `${celToFah(
        endDayTemp
      )}  f`;
    })
    .catch((err) => console.log(err));

  document.querySelector(".hero").style.backgroundImage =
    "url(/Assets/hero/New-York-campus.png)";
});

//toronto button
const torontoButton = document.getElementById("toronto");
torontoButton.addEventListener("click", (e) => {
  document.querySelector(".hero").style.backgroundImage =
    "url(/Assets/hero/toronto-campus.png)";
  document.querySelector(".weather__campus").innerText = "Toronto";
  activeCity(e.target);

  //get req within toronto button
  axios
    .get(toronto)
    .then((res) => {
      //get sunrise time
      const sunrise = res.data.daily.sunrise[0].slice(11);
      document.getElementById("rise").innerText = "Sunrise: " + sunrise + " AM";

      //sunset
      const sunset = res.data.daily.sunset[0].slice(11);
      document.getElementById("set").innerText = "Sunset: " + sunset + " PM";

      //temps
      let mornTemp = Math.floor(res.data.hourly.apparent_temperature[7]);
      let midDayTemp = Math.floor(res.data.hourly.apparent_temperature[11]);
      let endDayTemp = Math.floor(res.data.hourly.apparent_temperature[17]);

      // morn preciitation
      let mornPrecip = res.data.hourly.precipitation[7];

      if (mornPrecip < 0) {
        document
          .getElementById("morningPrecipIcon")
          .setAttribute("src", "Assets/Icons/sunny.png");
        document.getElementById("mornPrediction").innerText = "Clear";
      } else if (mornPrecip >= 0) {
        document
          .getElementById("morningPrecipIcon")
          .setAttribute("src", "Assets/Icons/cloudy.png");
        document.getElementById("mornPrediction").innerText = "Cloudy";
      } else {
        document
          .getElementById("morningPrecipIcon")
          .setAttribute("src", "Assets/Icons/rainy.png");
        document.getElementById("mornPrediction").innerText = "Rainy";
      }

      //mid day precip
      let midDayPrecip = res.data.hourly.precipitation[11];

      if (midDayPrecip < 0) {
        document
          .getElementById("midDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/sunny.png");
        document.getElementById("midDayPrediction").innerText = "Clear";
      } else if (midDayPrecip >= 0) {
        document
          .getElementById("midDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/cloudy.png");
        document.getElementById("midDayPrediction").innerText = "Cloudy";
      } else {
        document
          .getElementById("midDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/rainy.png");
        document.getElementById("midDayPrediction").innerText = "Rainy";
      }

      //evening precip
      let endDayPrecip = res.data.hourly.precipitation[17];

      if (endDayPrecip < 0) {
        document
          .getElementById("endDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/sunny.png");
        document.getElementById("endDayPrediction").innerText = "Clear";
      } else if (endDayPrecip >= 0) {
        document
          .getElementById("endDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/cloudy.png");
        document.getElementById("endDayPrediction").innerText = "Cloudy";
      } else {
        document
          .getElementById("endDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/rainy.png");
        document.getElementById("endDayPrediction").innerText = "Rainy";
      }

      //background of current weather div

      //get current time
      function timeOfDay(time) {
        if (time < 9) {
          document.querySelector(
            ".weather__current-temperature"
          ).innerHTML = `${mornTemp} c`;
        } else if (time < 13) {
          document.querySelector(
            ".weather__current-temperature"
          ).innerHTML = `${midDayTemp} c`;
        } else {
          document.querySelector(
            ".weather__current-temperature"
          ).innerHTML = `${endDayTemp} c`;
        }
      }
      timeOfDay(new Date().getHours());

      document.getElementById("morningTemp").innerHTML = `${mornTemp} c`;

      document.getElementById("midDayTemp").innerHTML = `${midDayTemp} c`;

      document.getElementById("endDayTemp").innerHTML = `${endDayTemp} c`;
    })
    .catch((err) => console.log(err));
});

//london button
const londonButton = document.getElementById("london");
londonButton.addEventListener("click", (e) => {
  document.querySelector(".hero").style.backgroundImage =
    "url(/Assets/hero/London-campus.png)";
  document.querySelector(".weather__campus").innerText = "London";
  activeCity(e.target);

  //get req within london button
  axios
    .get(london)
    .then((res) => {
      //get sunrise time
      const sunrise = res.data.daily.sunrise[0].slice(11);
      document.getElementById("rise").innerText = "Sunrise: " + sunrise + " AM";

      //sunset
      const sunset = res.data.daily.sunset[0].slice(11);
      document.getElementById("set").innerText = "Sunset: " + sunset + " PM";

      //temps
      let mornTemp = Math.floor(res.data.hourly.apparent_temperature[7]);
      let midDayTemp = Math.floor(res.data.hourly.apparent_temperature[11]);
      let endDayTemp = Math.floor(res.data.hourly.apparent_temperature[17]);

      // morn preciitation
      let mornPrecip = res.data.hourly.precipitation[7];

      if (mornPrecip < 0) {
        document
          .getElementById("morningPrecipIcon")
          .setAttribute("src", "Assets/Icons/sunny.png");
        document.getElementById("mornPrediction").innerText = "Clear";
      } else if (mornPrecip >= 0) {
        document
          .getElementById("morningPrecipIcon")
          .setAttribute("src", "Assets/Icons/cloudy.png");
        document.getElementById("mornPrediction").innerText = "Cloudy";
      } else {
        document
          .getElementById("morningPrecipIcon")
          .setAttribute("src", "Assets/Icons/rainy.png");
        document.getElementById("mornPrediction").innerText = "Rainy";
      }

      //mid day precip
      let midDayPrecip = res.data.hourly.precipitation[11];

      if (midDayPrecip < 0) {
        document
          .getElementById("midDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/sunny.png");
        document.getElementById("midDayPrediction").innerText = "Clear";
      } else if (midDayPrecip >= 0) {
        document
          .getElementById("midDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/cloudy.png");
        document.getElementById("midDayPrediction").innerText = "Cloudy";
      } else {
        document
          .getElementById("midDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/rainy.png");
        document.getElementById("midDayPrediction").innerText = "Rainy";
      }

      //evening precip
      let endDayPrecip = res.data.hourly.precipitation[17];

      if (endDayPrecip < -1) {
        document
          .getElementById("endDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/sunny.png");
        document.getElementById("endDayPrediction").innerText = "Clear";
      } else if (endDayPrecip < -2) {
        document
          .getElementById("endDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/cloudy.png");
        document.getElementById("endDayPrediction").innerText = "Cloudy";
      } else {
        document
          .getElementById("endDayPrecipIcon")
          .setAttribute("src", "Assets/Icons/rainy.png");
        document.getElementById("endDayPrediction").innerText = "Rainy";
      }

      //background of current weather div

      //get current time
      function timeOfDay(time) {
        if (time < 9) {
          document.querySelector(
            ".weather__current-temperature"
          ).innerHTML = `${mornTemp} c`;
        } else if (time < 13) {
          document.querySelector(
            ".weather__current-temperature"
          ).innerHTML = `${midDayTemp} c`;
        } else {
          document.querySelector(
            ".weather__current-temperature"
          ).innerHTML = `${endDayTemp} c`;
        }
      }
      timeOfDay(new Date().getHours());

      document.getElementById("morningTemp").innerHTML = `${mornTemp} c`;

      document.getElementById("midDayTemp").innerHTML = `${midDayTemp} c`;

      document.getElementById("endDayTemp").innerHTML = `${endDayTemp} c`;
    })
    .catch((err) => console.log(err));
});

function activeCity(currentBtn) {
  const buttons = document.querySelectorAll(".campuses__button");
  buttons.forEach((button) => {
    button.classList.remove("campuses__button--active");
  });
  currentBtn.classList.add("campuses__button--active");
}
