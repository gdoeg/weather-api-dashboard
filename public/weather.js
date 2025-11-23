/*
 * Author: Gabriela Castaneda
 * weather.js
 * CS 248 Homework 5 - Weather
 * Uses fetch to load city list, current weather, and 5-day forecast
 * from allisonobourn.com/weather.php and updates the page.
 */

(function() {

  "use strict";

  const BASE_PAGE = "https://www.allisonobourn.com/weather.php";

  // Allowed module-global variable
  let currentCity = null;

  window.addEventListener("load", setUp);

  // Runs on page load, sets up listeners and loads city list 
  function setUp() {
    id("search").addEventListener("click", handleSearch);
    id("forecastbutton").addEventListener("click", handleForecast);

    id("resultsarea").style.display = "none";
    id("forecastsarea").style.display = "none";

    hide("loadingtoday");
    hide("loadingforecast");
    show("loadingnames");

    loadCities();
  }

  // Helper DOM functions 

  function id(name) {
    return document.getElementById(name);
  }

  function show(idName) {
    id(idName).style.display = "block";
  }

  function hide(idName) {
    id(idName).style.display = "none";
  }

  function clearErrors() {
    id("errors").textContent = "";
  }

  // Load city list 

  function loadCities() {
    fetch(BASE_PAGE + "?mode=cities")
      .then(checkStatus)
      .then(resp => resp.text())   
      .then(text => {
        const datalist = id("cities");
        const lines = text.split("\n");
        lines.forEach(line => {
          const city = line.trim();
          if (city) {
            const opt = document.createElement("option");
            opt.value = city;
            datalist.appendChild(opt);
          }
        });
        hide("loadingnames");
      })
      .catch(handleError);
  }

  // Handle Search button
  function handleSearch() {
    clearErrors();

    const city = id("citiesinput").value.trim();
    if (!city) {
      id("errors").textContent = "Please enter or select a city name.";
      return;
    }

    clearCurrentWeather();
    clearForecast();

    currentCity = city;

    id("resultsarea").style.display = "block";
    show("loadingtoday");

    const url = BASE_PAGE + "?mode=oneday&city=" + encodeURIComponent(city);

    fetch(url)
      .then(checkStatus)
      .then(resp => resp.text())  
      .then(JSON.parse)         
      .then(data => {

        const forecastArray = data.forecast;
        if (!forecastArray || forecastArray.length === 0) {
          throw new Error("No forecast data available for " + city + ".");
        }

        const first = forecastArray[0];

        id("time").textContent = formatHour(first.time);

        const iconUrl = "https://openweathermap.org/img/w/" + first.icon + ".png";
        const nowImg = id("now");
        nowImg.src = iconUrl;
        nowImg.alt = first.description || "current weather";

        const tempNow = first.temperature;
        id("nowtemp").textContent = tempNow.toFixed(1) + " \u2109";

        const todayDiv = id("today");
        forecastArray.forEach(entry => {
          const dayDiv = document.createElement("div");
          dayDiv.classList.add("day");

          const tempDiv = document.createElement("div");
          tempDiv.textContent = entry.temperature.toFixed(1) + " \u2109";
          dayDiv.appendChild(tempDiv);

          const cloudDiv = document.createElement("div");
          cloudDiv.classList.add("gray");
          cloudDiv.style.backgroundColor = cloudColor(entry.clouds);
          dayDiv.appendChild(cloudDiv);

          const timeDiv = document.createElement("div");
          timeDiv.textContent = formatHour(entry.time);
          dayDiv.appendChild(timeDiv);

          todayDiv.appendChild(dayDiv);
        });

        hide("loadingtoday");
      })
      .catch(handleError);
  }

  // Handle Forecast button
  function handleForecast() {
    clearErrors();

    if (!currentCity) {
      id("errors").textContent = "Search for a city first, then click Forecast.";
      return;
    }

    clearForecast();
    show("loadingforecast");

    const url = BASE_PAGE + "?mode=week&city=" + encodeURIComponent(currentCity);

    fetch(url)
      .then(checkStatus)
      .then(resp => resp.text())  
      .then(JSON.parse)          
      .then(data => {

        const forecastDiv = id("forecast");
        const days = data.weather;

        if (!days || days.length === 0) {
          throw new Error("No 5-day forecast data available for " + currentCity + ".");
        }

        id("forecastsarea").style.display = "block";

        days.forEach(dayInfo => {
          const dayDiv = document.createElement("div");
          dayDiv.classList.add("forecast-day");

          const p = document.createElement("p");
          p.textContent = dayInfo.day;
          dayDiv.appendChild(p);

          const img = document.createElement("img");
          img.src = "https://openweathermap.org/img/w/" + dayInfo.icon + ".png";
          img.alt = dayInfo.description || "forecast";
          dayDiv.appendChild(img);

          const tempDiv = document.createElement("div");
          tempDiv.textContent = dayInfo.temperature.toFixed(1) + " \u2109";
          dayDiv.appendChild(tempDiv);

          forecastDiv.appendChild(dayDiv);
        });

        hide("loadingforecast");
      })
      .catch(handleError);
  }

  // Clearing helpers

  function clearCurrentWeather() {
    id("time").textContent = "";
    id("nowtemp").textContent = "";
    id("now").src = "";
    id("now").alt = "";
    id("today").innerHTML = "";
  }

  function clearForecast() {
    id("forecast").innerHTML = "";
    id("forecastsarea").style.display = "none";
  }

  // Fetch helpers 
  function checkStatus(response) {
    if (!response.ok) {
      if (response.status === 410) {
        throw new Error("No data available for that city.");
      } else {
        throw new Error("HTTP error " + response.status + ": " + response.statusText);
      }
    }
    return response;
  }

  function handleError(err) {
    console.error(err);
    id("errors").textContent =
      err.message || "An error occurred while fetching weather data.";

    hide("loadingnames");
    hide("loadingtoday");
    hide("loadingforecast");
  }

  // Utilities 

  // Format military "13" to "1:00 PM"
  function formatHour(hourString) {
    const hour = parseInt(hourString, 10);
    let suffix = "AM";
    let displayHour = hour;

    if (hour === 0) {
      displayHour = 12;
      suffix = "AM";
    } else if (hour === 12) {
      displayHour = 12;
      suffix = "PM";
    } else if (hour > 12) {
      displayHour = hour - 12;
      suffix = "PM";
    }

    return displayHour + ":00 " + suffix;
  }

  // Convert cloud cover (0–100) to RGB string
  function cloudColor(clouds) {
    let blue = Math.floor((clouds * 256) / 100);
    if (blue === 256) {
      blue = 255;
    }
    const red = Math.floor(blue / 2);
    const green = Math.floor(blue / 2);
    return "rgb(" + red + "," + green + "," + blue + ")";
  }

})();
