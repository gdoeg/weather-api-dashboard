# Weather Webpage — CS 248 Homework 5

<p>Author: Gabriela Castaneda </p>
<p>Course: CS 248 — Full-Stack Web Programming</p>
<p>Assignment: Weather App with Fetch & JSON Parsing</p>

## Overview
This project implements a simple weather webpage that retrieves weather data from:
https://www.allisonobourn.com/weather.php 

Using the fetch API, the page:

1. Loads a full list of cities into a datalist

2. Displays the current day's weather for a selected city

3. Displays a 5-day forecast

4. Provides loading animations

5. Handles errors and missing data gracefully

All DOM manipulation and fetch requests are handled in weather.js, wrapped in the module pattern.

## Folder structure
| Path | Purpose |
|------|----------|
| `public/` | All static site files go here |
| `weather.html` | Home page |
| `weather.css` | Styles |
| `weather.js` | JavaScript logic |

## Features
### City List Loading
- On page load, the app fetches ?mode=cities
- Populates the <datalist> for user autocomplete

### Current Weather (Today)
- Fetches ?mode=oneday&city=NAME
- Shows:
   - Time (converted from 24h → 12h format)
   - Current weather icon
   - Temperature (℉)
   - A list of forecast entries for the current day
   - Cloud cover visualized through background color

### Five-Day Forecast
- Fetches ?mode=week&city=NAME
- Displays each day with day name, weather icon, and temperature

