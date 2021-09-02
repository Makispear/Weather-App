    // VARIABLES
    let SearchInput = document.getElementById('cityNameInput')
    let searchFormEl = document.getElementById('searchFormEl');
    const apiKey = 'a162d79bf40c41aa937d1346397ac5c6' // security hazard
    let cityButtons = document.getElementById('cityButtons')
    let cityNameInput = document.getElementById('cityNameInput')
    let resultsColumn = document.getElementById('resultsColumn')
    var fiveDays = []
    
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
    
    let getWeatherApi = (SearchInput) => {
        let apiUrl1 = `http://api.openweathermap.org/data/2.5/weather?q=${SearchInput}&appid=${apiKey}&units=imperial`
        let apiUrl2 = `http://api.openweathermap.org/data/2.5/forecast?q=${SearchInput}&appid=${apiKey}&units=imperial`
        fetch(apiUrl1)
        .then((response) => {
            if (response.ok) {
                response.json()
                .then((data) => {
                    displayCurrentWeather(data, SearchInput)
                })
            } else {
                alert(`Type In A Valid City Name Please!`)
            }
        })
        .catch((error) => {
            console(error);
          });
    
        fetch(apiUrl2)
        .then((response) => {
            if (response.ok) {
                response.json()
                .then((data) => {
                    for (i = 0; i < data.list.length; i += 8) {
                        fiveDays.push(data.list[i])
                    }
                    console.log(fiveDays)
                    displayFiveDays()
                })
            } else {
                console('fetch failed')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    let formSubmitHandler = (e) => {
        e.preventDefault()
        let cityName = SearchInput.value.trim().toLowerCase()
        console.log(cityName)
        if (cityName) {
            getWeatherApi(cityName)
        } else {
            alert("Please Enter a Valid City Name!")
        }
        cityNameInput.value = "";
    }
    
    let displayCurrentWeather = (res, city) => {
        resultsColumn.innerHTML = ""
            let timeNow = String(new Date)
            let timeSplit = timeNow.split(' ')
        // create items for current weather  
        let mainInfo = document.createElement('div')
            mainInfo.classList = `col p-2 rounded shadow-sm bg-light` 
        let title = document.createElement("h2")
        let cityCapitalized = city.charAt(0).toUpperCase() + city.slice(1)
            title.textContent = `${cityCapitalized} (${timeSplit[1]}/${timeSplit[2]}/${timeSplit[3]})`;
            title.classList = `heavyWeight`
        let firstP = document.createElement('p');
            firstP.textContent = `Temp: ${res.main['temp']}°F`
        let secondP = document.createElement('p')
            secondP.textContent = `Wind: ${res.wind['speed']} MPH`
        let thirdP = document.createElement('p')
            thirdP.textContent = `Humidity: ${res.main['humidity']} %`
        let forthP = document.createElement('p')
            forthP.innerHTML = `<span class="iv-index">UV Index: 0.${res.main['humidity']}</span>`
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
            } else {
            displayButton(city)
            }
        } else {
            displayButton(city)
        }
    }
    
    let displayButton = (city) => {
        let cityButton = document.createElement('button')
        let cityCapitalized = `${city.charAt(0).toUpperCase()}${city.slice(1)}`
            cityButton.textContent = cityCapitalized
            cityButton.classList = `p-2 rounded text-dark my-2 grey-color target-this ${city}` 
                cityButtons.appendChild(cityButton);
        var retrievedData = JSON.parse(localStorage.getItem("savedButtons")) || []
            retrievedData.push(city)
        // send this button to localStorage 
        localStorage.setItem('savedButtons', JSON.stringify(retrievedData))
    }
    
    let displayFiveDays = () => {
        let createTitle = document.createElement("div")
            createTitle.classList = 'col'
        let createH2 = document.createElement('h2')
            createH2.textContent = `Five-Day Forecast:`
            createH2.classList = 'heavyWeight'
                createTitle.appendChild(createH2)
                    resultsColumn.appendChild(createTitle)
        let createGrid = document.createElement("div")
            createGrid.classList = 'row'
        for (i = 0; i < fiveDays.length; i++) {
            let nextDay = document.createElement('div')
                nextDay.classList = 'col m-1 five-day-item p-3'
            let forecastDate = document.createElement('p')
                    // time formatting below 
                    let time = fiveDays[i].dt_txt.split(" ")
                    let time2 =  time[0].split("-")
                    let year = time2[0]
                    let days = time2[1]
                    let months = time2[2]
                let formattedDate = `${months}/${days}/${year}`
                forecastDate.textContent = `${formattedDate}`
                forecastDate.classList = 'heavyWeight fs-3'
            let forecastEmoji = document.createElement('p')
                forecastEmoji.innerHTML = `<img src="http://openweathermap.org/img/wn/${fiveDays[i].weather[0].icon}@2x.png">`
                forecastEmoji.classList = 'fs-4'
            let forecastTemp = document.createElement('p')
                forecastTemp.textContent = `Temp: ${fiveDays[i].main['temp']}°F`
            let forecastWind = document.createElement('p')
                forecastWind.textContent = `Wind: ${fiveDays[i].wind['speed']} MPH`
            let forecastHumidity = document.createElement('p')
                forecastHumidity.textContent = `Humidity: ${fiveDays[i].main['humidity']} %`
            nextDay.appendChild(forecastDate)
            nextDay.appendChild(forecastEmoji)
            nextDay.appendChild(forecastTemp)
            nextDay.appendChild(forecastWind)
            nextDay.appendChild(forecastHumidity)
                createGrid.appendChild(nextDay);
                    resultsColumn.appendChild(createGrid)
        }
        // emptying fiveDays array for next use
        fiveDays = []
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
    