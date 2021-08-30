let SearchInput = document.getElementById('cityNameInput')
let mainEl = document.getElementsByTagName("main")
let searchBtn = document.getElementById('searchBtn');
let searchFormEl = document.getElementById('searchFormEl');
let apiKey = 'a162d79bf40c41aa937d1346397ac5c6'
let dateHolder = "(Aug/22/2021)" 
let daysCount = 5;

let getWeatherApi = (SearchInput) => {
    let apiUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${SearchInput}&cnt=${daysCount}&appid=${apiKey}`
    fetch(apiUrl)
    .then((response) => {
        if (response.ok) {
            response.json()
            .then((data) => {
                if (console.error) {
                    alert(console.error)
                } else {
                    console.log('1st')
                    console.log(data)
                }
                displayCurrentWeather(data, SearchInput)
            })
        } else {
            alert(`Error: Information Not Found! (1)`)
        }
    })
    .catch((error) => {
        alert(error);
      });
}

let formSubmitHandler = (e) => {
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
    let resultsColumn = document.getElementById('resultsColumn') 
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

}

let displayButton = (city) => {
    let cityButtons = document.getElementById('cityButtons')
    let cityButton = document.createElement('button')
    cityButton.innerText = `${city}`
    cityButton.classList = 'bg-secondary p-2 rounded text-light my-2' 
    cityButtons.appendChild(cityButton);
}

searchFormEl.addEventListener('submit', formSubmitHandler)


                   

 
 
                 

