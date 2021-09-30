const cityForm = document.querySelector("form");
const card = document.querySelector(".weather-card");
const details = document.querySelector(".details");
const bkgrndImg = document.querySelector(".background-img");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon >img");

const updateUi = (data) => {
  const { cityDets, weather } = data;

  details.innerHTML = `  
    <h5 class="city-name">${cityDets.EnglishName}</h5>
    <div class="weather-cond">${weather.WeatherText}</div>
    <div class="temp">
    <span>${weather.Temperature.Metric.Value}</span>
    <span> &deg;C </span>
    </div>`;
  bkgrndImg.setAttribute(
    "src",
    `https://source.unsplash.com/1600x900/?${cityDets.EnglishName}`
  );
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  let timeSrc = null;
  weather.IsDayTime ? (timeSrc = "img/day.svg") : (timeSrc = "img/night.svg");
  time.setAttribute("src", timeSrc);

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
};
const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  return {
    cityDets,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  localStorage.setItem("city", city);
  cityForm.reset();
  updateCity(city)
    .then((data) => updateUi(data))
    .catch((err) => console.log(err));
});
if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUi(data))
    .catch((err) => console.log(err));
}
