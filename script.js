function showInfo() {
    let currentWeather = document.querySelector("#current-weather-box")
    let futureWeather = document.querySelector("#future-weather-cards")
    let clearBtn = document.querySelector("#clearBtn")
    currentWeather.classList.remove("hide")
    futureWeather.classList.remove("hide")
    clearBtn.classList.remove("hide")
}

let city = ""
let cities = localStorage.cities ? JSON.parse(localStorage.cities) : []

document.querySelector("#searchBtn").addEventListener("click", function(event) {
    event.preventDefault()
    city = document.querySelector("#searchBox").value
    cities.push(city)
    localStorage.setItem("cities", JSON.stringify(cities))
    $("#cityList").prepend(`<button class="list-group-item" onclick="getWeather()">${city}</button>`)
    
    getWeather()
})

function showCities() {
    for (let i=0; i<cities.length; i++ ) {
        console.log(cities[i])
        $("#cityList").prepend(`<button class="list-group-item" onclick="getWeather()">${cities[i]}</button>`)
        city = cities[i]
    }
}

$("#clearBtn").on("click", () => localStorage.clear())

const ApiKey = "9fcd3a5881a397cda2d72d306ef443fe"
function getWeather() {
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + ApiKey

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response){
        console.log(response)
        let unixTime = response.dt
        let date = new Date(unixTime*1000)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let showDate = month + "/" + day + "/" + year
        $("#currentDate").text(showDate)
        $("#title").text(response.name)
        $("#temp").text("Temperature: " + Math.round(response.main.temp) + "°C")
        $("#humidity").text("Humidity: " + response.main.humidity + "%")
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " km/h")
        $("#currentIcon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
        let latitude = response.coord.lat
        let longitude = response.coord.lon
        showInfo() 

        function getFutureWeather() {
            let queryUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric" + "&appid=" + ApiKey

            $.ajax({
                url: queryUrl2,
                method: "GET"
            })
            .then(function(response){
                console.log(response)
                $("#uv-index").text("UV Index: " + response.current.uvi)
                for ( var i=1; i<=5; i++) {
                    let future = response.daily[i]
                    let unixTime = future.dt
                    let date = new Date(unixTime*1000)
                    let year = date.getFullYear()
                    let month = date.getMonth() + 1
                    let day = date.getDate()
                    let shownDate = month + "/" + day + "/" + year
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
