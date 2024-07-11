const searchLocationInput = document.getElementById("searchLocation");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;
    getWeatherData(`${lat} , ${long}`);
  });
} else {
  console.log("Not Allowed");
}

async function getWeatherData(query) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=c207b8456a834393bbf50621241007`
  );
  let data = await res.json();
  displayTodayWeather(data);
  displayTomWeather(data);
  displayAfterTomWeather(data);
  console.log(data);
}

searchLocationInput.addEventListener("input", function (e) {
  getWeatherData(e.target.value);
});

function displayTodayWeather(data) {
  const todayDate = data.current.last_updated;
  let date = new Date(todayDate);
  const todayWeekDay = date.toLocaleDateString("en-us", { weekday: "long" }); // إسم اليوم
  const todayDay = date.getDate(); // يوم كام في الشهر
  const todayMonth = date.toLocaleDateString("en-us", { month: "long" }); // اسم الشهر
  const cityName = data.location.name; // اسم البلد
  const todayDegree = data.current.temp_c; // درجه الحراره
  const todayCondition = data.current.condition.text; // حالة الطقس
  const humidity = data.current.humidity;
  todayWeekDayId.innerHTML = todayWeekDay;
  dateToday.innerHTML = `${todayDay} ${todayMonth}`;
  cityToday.innerHTML = cityName;
  tempToday.innerHTML = todayDegree;
  todayCond.innerHTML = todayCondition;
  imgToday.setAttribute("src", data.current.condition.icon);
  humidityToday.innerHTML = humidity;
  windSpeedToday.innerHTML = data.current.wind_kph;
  dirToday.innerHTML = data.current.wind_dir;
}

function displayTomWeather({ forecast }) {
  tomorrowDay.innerHTML = new Date(
    forecast.forecastday[1].date
  ).toLocaleDateString("en-us", { weekday: "long" });
  iconTomorrow.setAttribute("src", forecast.forecastday[1].day.condition.icon);
  tMaxTemp.innerHTML = forecast.forecastday[1].day.maxtemp_c;
  tMinTemp.innerHTML = forecast.forecastday[1].day.mintemp_c;
  tTomCond.innerHTML = forecast.forecastday[1].day.condition.text;
}
function displayAfterTomWeather({ forecast }) {
  afterTomorrow.innerHTML = new Date(
    forecast.forecastday[2].date
  ).toLocaleDateString("en-us", { weekday: "long" });
  iconAfterTom.setAttribute("src", forecast.forecastday[2].day.condition.icon);
  afterTomMaxTemp.innerHTML = forecast.forecastday[2].day.maxtemp_c;
  afterTomMinTemp.innerHTML = forecast.forecastday[2].day.mintemp_c;
  afterTomCond.innerHTML = forecast.forecastday[2].day.condition.text;
}
