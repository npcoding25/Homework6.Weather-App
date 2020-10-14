# Weather Dashboard

## Table of Contents

  - [Objective](#Objective)
  - [Functionality](#Functionality)
  - [Screenshots](#Screenshots)

## Objective

* Create a weather application where the user searches for a city and is shown current and future data

## Functionality

When you first go on the weather application you'll be given a search bar and a button. After a search for a city of your choice you'll be presented with two sections:
  * Current weather data including:
    * Date
    * Icon showing conditions
    * Temperature
    * Humidity
    * Wind Speed
    * UV Index

  * 5 day forecast:
    * Date
    * Icon showing conditions
    * Temperature
    * Humidity

This information comes from the OpenWeatherMap API. There are two API calls to aquire all the information needed. The first one gets most of the current weather data and also the latitude and longitude of the chosen city. The second API uses the latitude and longitude given in the first call to aquire the rest of the information. The cities will save and appear below the search bar. Upon refresh you can click one of the saved cities and you'll be shown the weather data for that city.

### Challenges & Improvements

One of the main issues I had was with localStorage. After eventually getting the cities to stay on screen after a refresh, I had trouble making them display the results afterwards. Currently they won't show the data unless you refresh the page and it will only show the first one you click. From here you can still search for new cities. The clear button clears the stored cities but doesn't take the cities off until you refresh the screen.

### Screenshots

![image](https://user-images.githubusercontent.com/69565347/95931416-f2c4f800-0d7d-11eb-94fc-f57f355c048d.png)

![image](https://user-images.githubusercontent.com/69565347/95943649-4134bf80-0d9b-11eb-8d4d-e9265c0970b3.png)


Click [Here](https://npcoding25.github.io/Homework6.Weather-App/) to see launched webpage.