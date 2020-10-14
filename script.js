// Function to show current weather and 5 day forecast boxes
function showInfo() {
    let currentWeather = document.querySelector("#current-weather-box")
    let futureWeather = document.querySelector("#future-weather-cards")
    futureWeather.classList.remove("hide")
    currentWeather.classList.remove("hide")
}

// Setting empty variables unless there is data in local storage
let city = ""
let cities = localStorage.cities ? JSON.parse(localStorage.cities) : []

// Giving the search button a function when clicked
document.querySelector("#searchBtn").addEventListener("click", function(event) {
    event.preventDefault()
    
    // Acquiring user input then pushing into cities array
    city = document.querySelector("#searchBox").value
    cities.push(city)
    
    // Saving user input and displaying under search bar
    localStorage.setItem("cities", JSON.stringify(cities))
    $("#cityList").prepend(`<button class="list-group-item" onclick="getWeather()">${city}</button>`)
    
    // Show clear button
    let clearBtn = document.querySelector("#clearBtn")
    clearBtn.classList.remove("hide")
    getWeather()
})

// Function that will show cities after refresh
function showCities() {
    for (let i=0; i<cities.length; i++ ) {
        console.log(cities[i])
        $("#cityList").prepend(`<button class="list-group-item" onclick="getWeather()">${cities[i]}</button>`)
        city = cities[i]
    }
}

// Clear button that will clear local storage
$("#clearBtn").on("click", function() {
    localStorage.clear()
})

// Function to get weather data from OpenWeather API
function getWeather() {
    const ApiKey = "9fcd3a5881a397cda2d72d306ef443fe"
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + ApiKey

    // Getting information from API
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response){
        console.log(response)

        // Will convert unix time to MM/DD/YYYY
        let unixTime = response.dt
        let date = new Date(unixTime*1000)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let showDate = month + "/" + day + "/" + year

        // Displaying received info
        $("#currentDate").text(showDate)
        $("#title").text(response.name)
        $("#temp").text("Temperature: " + Math.round(response.main.temp) + "°C")
        $("#humidity").text("Humidity: " + response.main.humidity + "%")
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " km/h")
        $("#currentIcon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")

        // Getting latitude and longitude for next API call
        let latitude = response.coord.lat
        let longitude = response.coord.lon

        // Show cards after info is received
        showInfo() 

        // Second API call to get 5 day forecast and UV Index
        function getFutureWeather() {
            let queryUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric" + "&appid=" + ApiKey

            // Getting info from API
            $.ajax({
                url: queryUrl2,
                method: "GET"
            })
            .then(function(response){
                
                // Displaying UV Index in current weather
                $("#uv-index").text("UV Index: " + response.current.uvi)
                for ( var i=1; i<=5; i++) {

                    // Converting unix time to MM/DD/YYYY
                    let future = response.daily[i]
                    let unixTime = future.dt
                    let date = new Date(unixTime*1000)
                    let year = date.getFullYear()
                    let month = date.getMonth() + 1
                    let day = date.getDate()
                    let shownDate = month + "/" + day + "/" + year

                    // Displaying received info
                    $("#date"+ i).text(shownDate)
                    $("#img" + i).attr("src", "http://openweathermap.org/img/wn/" + future.weather[0].icon + "@2x.png")
                    $("#temp-day"+ i).text("Temp: " + Math.round(future.temp.max) + "°C")
                    $("#humidity-day"+ i).text("Humidity: " + future.humidity + "%")
                }
            })
        }
        getFutureWeather()
    })
}


$(document).ready( function() {
    showCities()
})
