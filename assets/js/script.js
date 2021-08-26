let SearchInput = document.getElementById('cityNameInput')
let searchBtn = document.getElementById('searchBtn');
let searchFormEl = document.getElementById('searchFormEl');
let apiKey = 'a162d79bf40c41aa937d1346397ac5c6'

let getWeatherApi = (SearchInput) => {
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${SearchInput}&appid=${apiKey}`
    fetch(apiUrl)
    .then((response) => {
        if (response.ok) {
            response.json()
            .then((data) => {
                console.log(data)
                displayWeather(data)
            })
        } else {
            alert(`Error: Information Not Found!`)
        }
    })
    .catch((error) => {
        alert(`Sorry couldn't get information. Please Try agin or Contact us.`);
      });
    
}

let formSubmitHandler = (e) => {
    e.preventDefault()
    let cityName = SearchInput.value.trim()
    if (cityName) {
        console.log(cityName)
        getWeatherApi(cityName)
    } else {
        alert("Please Enter a Valid City Name!")
    }
}

let displayWeather = (res, city) => {

}

searchFormEl.addEventListener('submit', formSubmitHandler)
