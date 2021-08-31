let SearchInput = document.getElementById('cityNameInput')
let mainEl = document.getElementsByTagName("main")
let searchBtn = document.getElementById('searchBtn');
let searchFormEl = document.getElementById('searchFormEl');
let apiKey = 'a162d79bf40c41aa937d1346397ac5c6'
let dateHolder = "(Aug/22/2021)" // placebolder
let resultsColumn = document.getElementById('resultsColumn')
var fiveDays = []
let daysCount = 5;

let getWeatherApi = (SearchInput) => {
    debugger
    let apiUrl1 = `http://api.openweathermap.org/data/2.5/weather?q=${SearchInput}&appid=${apiKey}&units=imperial`
    let apiUrl2 = `http://api.openweathermap.org/data/2.5/forecast?q=${SearchInput}&appid=${apiKey}&units=imperial`
    fetch(apiUrl1)
    .then((response) => {
        if (response.ok) {
            response.json()
            .then((data) => {
                    console.log('1st')
                    console.log(data)
                displayCurrentWeather(data, SearchInput)
            })
        } else {
            alert(`Error: Information Not Found! (1)`)
        }
    })
    .catch((error) => {
        alert(error);
      });

    fetch(apiUrl2)
    .then((response) => {
        if (response.ok) {
            response.json()
            .then((data) => {
                for (i = 0; i < data.list.length; i += 8) {
                    fiveDays.push(data.list[i])
                }
                debugger
            })
        } else {
            alert('Error 2')
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

let formSubmitHandler = (e) => {
    debugger
    e.preventDefault()
    let cityName = SearchInput.value
    if (cityName) {
        console.log(cityName)
        getWeatherApi(cityName)
    } else {
        alert("Please Enter a Valid City Name!")
    }
    cityName.value = "";
}

let displayCurrentWeather = (res, city) => {
    resultsColumn.innerHTML = ""
    // create items for current weather  
    let mainInfo = document.createElement('div')
        mainInfo.classList = `col p-2 rounded shadow-sm bg-light` 
    let title = document.createElement("h2") //1.aa
        title.textContent = `${city} ${dateHolder}`;
        title.classList = `bold`
    let firstP = document.createElement('p');
        firstP.textContent = `Temp: ${res.main['temp']}°F`
    let secondP = document.createElement('p')
        secondP.textContent = `Wind: ${res.wind['speed']} MPH`
    let thirdP = document.createElement('p')
        thirdP.textContent = `Humidity: ${res.main['humidity']} %`
    let forthP = document.createElement('p')
        forthP.innerHTML = `<span class="iv-index">UV Index: 0.${res.main['humidity']}</span>`
    // append to page 
    mainInfo.appendChild(title)
    mainInfo.appendChild(firstP)
    mainInfo.appendChild(secondP)
    mainInfo.appendChild(thirdP)
    mainInfo.appendChild(forthP)
    resultsColumn.appendChild(mainInfo);
    // displaying buttons to page function
    displayButton(city)
    displayFivedays()
}

let displayButton = (city) => {
    let cityButtons = document.getElementById('cityButtons')
    let cityButton = document.createElement('button')
    cityButton.innerText = `${city}`
    cityButton.classList = 'bg-secondary p-2 rounded text-light my-2' 
    cityButtons.appendChild(cityButton);
}


let displayFivedays = () => {
    debugger
    let createTitle = document.createElement("div")
        createTitle.classList = 'col'
    let createH2 = document.createElement('h2')
        createH2.textContent = `Five-Day Forecast:`
    createTitle.appendChild(createH2)
    resultsColumn.appendChild(createTitle)
    let createGrid = document.createElement("div")
    createGrid.classList = 'row'
    for (i = 0; i < fiveDays.length; i++) {
        let nextDay = document.createElement('div')
        nextDay.classList = 'col m-1 five-day-item'
        let firstP = document.createElement('p')
        firstP.textContent = `${fiveDays[i].dt_text}`
        let secondP = document.createElement('p')
        secondP.textContent = `${fiveDays[i].weather[0].icon}`
        let thirdP = document.createElement('p')
        thirdP.textContent = `Temp: ${fiveDays[i].main['temp']}°F`
        let forthP = document.createElement('p')
        forthP.textContent = `Wind: ${fiveDays[i].wind['speed']} MPH`
        let fifthP = document.createElement('p')
        fifthP.textContent = `Humidity: ${fiveDays[i].main['humidity']} %`

        nextDay.appendChild(firstP)
        nextDay.appendChild(secondP)
        nextDay.appendChild(thirdP)
        nextDay.appendChild(forthP)
        nextDay.appendChild(fifthP)
        
        createGrid.appendChild(nextDay);
        resultsColumn.appendChild(createGrid)
    }
    fiveDays = []
    debugger
}

searchFormEl.addEventListener('submit', formSubmitHandler)


                   

 
 
                 

