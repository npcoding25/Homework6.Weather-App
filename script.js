let city = ""


document.querySelector("#searchBtn").addEventListener("click", function(event) {
    event.preventDefault()
    city = document.querySelector("#searchBox").value
    console.log(city)
    getWeather()
})

const ApiKey = "9fcd3a5881a397cda2d72d306ef443fe"
function getWeather() {
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + ApiKey

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response){
        console.log(response)
        $("#title").text(city)
        $("#temp").text("Temperature: " + Math.round(response.main.temp) + "°C")
        $("#humidity").text("Humidity: " + response.main.humidity + "%")
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " km/h")
        $("#currentIcon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
        
        console.log(response.weather[0].icon)
        let latitude = response.coord.lat
        let longitude = response.coord.lon
          
        function getMoreWeather() {
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
                    $("#date"+ i).text(future.dt)
                    $("#img" + i).attr("src", "http://openweathermap.org/img/wn/" + future.weather[i].icon + "@2x.png")
                    $("#temp-day"+ i).text("Temp: " + Math.round(future.temp.max) + "°C")
                    $("#humidity-day"+ i).text("Humidity: " + future.humidity + "%")
                }




                let unixTime = $(".date1").text()
                console.log(unixTime)
                unixTime =  moment.format("MM/DD/YYYY")
                console.log(unixTime)
            })
        }
        getMoreWeather()
    })
}

