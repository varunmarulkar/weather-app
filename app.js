
let input = document.querySelector("#search")
let button = document.querySelector("button")
let City = document.querySelector(".city")
let temp = document.querySelector(".temp")
let humid = document.querySelector(".humid")
let wind = document.querySelector(".wind")
let weather = document.querySelector(".weather")
let icon = document.querySelector(".icon")
let forecastBoxes = document.querySelectorAll(".box");


// const apiKey = "https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=57d7c3f2378a0968c990c8a592ff2aa8&units=metric"
// console.log(apiKey)

// async function showData() {
//     const apiKey = "57d7c3f2378a0968c990c8a592ff2aa8";
//     const url = `https://api.openweathermap.orxg/data/2.5/weather?q=pune&appid=${apiKey}&units=metric`;

//     const response = await fetch(url);
//     const data = await response.json();

//     console.log(data)
// }

// showData()

// console.log(data)



async function getWeather(city) {
    const apiKey = "57d7c3f2378a0968c990c8a592ff2aa8";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    City.innerText = `City: ${data.name}`;
    temp.innerText = `Temperature: ${data.main.temp}°C`;
    humid.innerText = `Humidity: ${data.main.humidity}°C`;
    wind.innerText = `Wind: ${data.wind.deg}°C`;

    let condition = data.weather[0].main.toLowerCase();


    let temperature = data.main.temp

    if (condition.includes("rain")) {
        weather.style.backgroundColor = "lightblue"; // Rainy weather
        icon.style.display = "block"
        icon.src = "https://cdn-icons-png.flaticon.com/128/4088/4088981.png"
    } else if (condition.includes("cloud")) {
        weather.style.backgroundColor = "gray"; // Cloudy weather
        icon.style.display = "block"
        icon.src = "https://cdn-icons-png.flaticon.com/128/3313/3313983.png"
    } else {
        weather.style.backgroundColor = "yellow"; // Sunny weather
        icon.style.display = "block"
        icon.src = "https://cdn-icons-png.flaticon.com/128/2698/2698213.png"
    }

}

async function getForecast(city) {
    const apiKey = "57d7c3f2378a0968c990c8a592ff2aa8";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    let forecastList = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);

    forecastList.forEach((day, index) => {
        let temp = day.main.temp;
        let condition = day.weather[0].main.toLowerCase();
        let bgColor = "";
        let iconUrl = "";


        if (condition.includes("rain")) {
            bgColor = "lightblue";
            iconUrl = "https://cdn-icons-png.flaticon.com/128/4088/4088981.png"; // Rainy Icon
        } else if (condition.includes("cloud")) {
            bgColor = "gray";
            iconUrl = "https://cdn-icons-png.flaticon.com/128/3313/3313983.png"; // Cloudy Icon
        } else if (condition.includes("clear")) {
            bgColor = "yellow";
            iconUrl = "https://cdn-icons-png.flaticon.com/128/2698/2698213.png"; // Sunny Icon
        } else {
            bgColor = "white"; // Default
            iconUrl = "https://cdn-icons-png.flaticon.com/128/1163/1163657.png"; // Default Icon
        }


        forecastBoxes[index].style.backgroundColor = bgColor;
        forecastBoxes[index].style.borderRadius = "10px";
        forecastBoxes[index].style.padding = "10px";
        forecastBoxes[index].style.textAlign = "center";

        forecastBoxes[index].innerHTML = `
            <h3>Day ${index + 1}</h3>
            <p>Temp: ${temp}°C</p>
            <p>Condition: ${condition}</p>
            <img src="${iconUrl}" alt="${condition}" style="width:50px; height:50px;">
        `;
    });
}


button.addEventListener("click", () => {
    let cityname = input.value.toLowerCase();
    getWeather(cityname);
    getForecast(cityname)
});


