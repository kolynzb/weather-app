const KEY = "CuNL5JOAlyMoup2fPS4TUKfXlxBSx0Ag";

const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";

  const query = `${id}?apikey=${KEY}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${KEY}&q=${city}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

getCity()
  .then((data) => {
    return getWeather(data.key);
  })
  .then((data) => {
    console.log(data.key);
  })
  .catch((err) => console.log(err));
