    // VARIABLES
let SearchInput = document.getElementById('cityNameInput')
let searchFormEl = document.getElementById('searchFormEl');
const apiKey = 'a162d79bf40c41aa937d1346397ac5c6' // security hazard
let cityButtons = document.getElementById('cityButtons')
let cityNameInput = document.getElementById('cityNameInput')
let resultsColumn = document.getElementById('resultsColumn')

// LOAD BUTTONS 
if (localStorage.length > 0) {
    var retrievedData = JSON.parse(localStorage.getItem("savedButtons"))
    // capitalize first letter of the localStorage 
    for (i = 0; i < retrievedData.length; i++) {
        retrievedData[i] = retrievedData[i].charAt(0).toUpperCase() + retrievedData[i].slice(1)
    }
    // retrieve buttons stored in localStorage
    for(i = 0; i < retrievedData.length; i++) {
        let createdButton = document.createElement('button')
        createdButton.classList = `p-2 rounded text-dark my-2 grey-color target-this ${retrievedData[i]}`
        createdButton.textContent = `${retrievedData[i]}`
        cityButtons.appendChild(createdButton)
    }
}

// GETTING THE WEATHER INFO 
let fetchUVindex = (lat, long, SearchInput) => {
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`)
.then((response) => {
    if (response.ok) {
        response.json()
        .then((data) => {
            console.log(data)
            displayCurrentWeather(data, SearchInput)
        })
    } 
    })
}

let getWeatherApi = (SearchInput) => {
    let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${SearchInput}&appid=${apiKey}&units=imperial`
    fetch(apiUrl1)
    .then((response) => {
        if (response.ok) {
            response.json()
            .then((data) => {
                fetchUVindex(data.coord.lat, data.coord.lon, SearchInput)
            })
        } else {
            alert(`Type In A Valid City Name Please!`)
        }
    })
    .catch((error) => {
        console.log(error);
        });
}

let formSubmitHandler = (e) => {
    e.preventDefault()
    let cityName = SearchInput.value.trim().toLowerCase()
    if (cityName) {
        getWeatherApi(cityName)
    } else {
        
    }
    cityNameInput.value = "";
}

let displayCurrentWeather = (res, city) => {
    resultsColumn.innerHTML = ""
        let timeNow = String(new Date)
        let timeSplit = timeNow.split(' ')
    // create items for current weather  
    let mainInfo = document.createElement('div')
        mainInfo.classList = `col p-2 rounded shadow-sm` 
    let title = document.createElement("h2")
    let cityCapitalized = city.charAt(0).toUpperCase() + city.slice(1)
        title.innerHTML = `${cityCapitalized} (${timeSplit[1]}/${timeSplit[2]}/${timeSplit[3]})<img src="https://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png">`;
        title.classList = `heavyWeight`
    let firstP = document.createElement('p');
        firstP.textContent = `Temp: ${res.current.temp}°F`
    let secondP = document.createElement('p')
        secondP.textContent = `Wind: ${res.current.wind_speed} MPH`
    let thirdP = document.createElement('p')
        thirdP.textContent = `Humidity: ${res.current.humidity} %`
    let forthP = document.createElement('p')
        forthP.innerHTML = `UV Index: <span class='colored'>${res.current.uvi}</span>`  
        if (2  >= Math.floor(res.current.uvi)) {
            forthP.classList = "bg-success d-inline border rounded-2 p-1 text-white"
        } else if (5  >= Math.floor(res.current.uvi)) {
            forthP.classList = 'bg-warning d-inline border rounded-2 p-1 text-white'
        } else {
            forthP.classList = 'bg-danger d-inline border rounded-2 p-1 text-white'
        }
    mainInfo.appendChild(title)
    mainInfo.appendChild(firstP)
    mainInfo.appendChild(secondP)
    mainInfo.appendChild(thirdP)
    mainInfo.appendChild(forthP)
    resultsColumn.appendChild(mainInfo);

    // check to see if this button is already created then continue
    if (localStorage.length > 0) {
        var checkButtons = localStorage.getItem('savedButtons')
        if (checkButtons.includes(city)) {
            // displaying buttons to page function
            displayFiveDays(res)
        } else {
        displayButton(res, city)
        }
    } else {
        displayButton(res, city)
    }
}

let displayButton = (res, city) => {
    let cityButton = document.createElement('button')
    let cityCapitalized = `${city.charAt(0).toUpperCase()}${city.slice(1)}`
        cityButton.textContent = cityCapitalized
        cityButton.classList = `p-2 rounded text-dark my-2 grey-color target-this ${city}` 
            cityButtons.appendChild(cityButton);
    var retrievedData = JSON.parse(localStorage.getItem("savedButtons")) || []
        retrievedData.push(city)
    // send this button to localStorage 
    localStorage.setItem('savedButtons', JSON.stringify(retrievedData))
    displayFiveDays(res)
}

let displayFiveDays = (res) => {
    let createTitle = document.createElement("div")
        createTitle.classList = 'col'
    let createH2 = document.createElement('h2')
        createH2.textContent = `Five-Day Forecast:`
        createH2.classList = 'heavyWeight'
            createTitle.appendChild(createH2)
                resultsColumn.appendChild(createTitle)
    let createGrid = document.createElement("div")
        createGrid.classList = 'row w-100'
    for (i = 0; i < 5; i++) {
        let nextDay = document.createElement('div')
        if (i === 0) {
            nextDay.classList = 'col-md m-1 five-day-item p-3'
        } else {
            nextDay.classList = 'col m-1 five-day-item p-3'
        }
        let forecastDate = document.createElement('p')
            let resDate = moment.unix(res.daily[i].dt)
                let formattedDate = resDate.format("L")
            forecastDate.textContent = `${formattedDate}`
            forecastDate.classList = 'heavyWeight fs-3'
        let forecastEmoji = document.createElement('p')
            forecastEmoji.innerHTML = `<img src="https://openweathermap.org/img/wn/${res.daily[i].weather[0].icon}@2x.png">`
            forecastEmoji.classList = 'fs-4'
        let forecastTemp = document.createElement('p')
            forecastTemp.textContent = `Temp: ${res.daily[i].temp.max}°F`
        let forecastWind = document.createElement('p')
            forecastWind.textContent = `Wind: ${res.daily[i].wind_speed} MPH`
        let forecastHumidity = document.createElement('p')
            forecastHumidity.textContent = `Humidity: ${res.daily[i].humidity} %`
        nextDay.appendChild(forecastDate)
        nextDay.appendChild(forecastEmoji)
        nextDay.appendChild(forecastTemp)
        nextDay.appendChild(forecastWind)
        nextDay.appendChild(forecastHumidity)
            createGrid.appendChild(nextDay);
                resultsColumn.appendChild(createGrid)
    }
}

let buttonsHandler = (event) => {
    let targetEl = event.target.textContent
    targetEl = targetEl.toLowerCase()
    getWeatherApi(targetEl)
}

// When clicking saved and loaded buttons 
cityButtons.addEventListener('click', buttonsHandler)
// When you submit a new city
searchFormEl.addEventListener('submit', formSubmitHandler)



                   

 
 
                 

