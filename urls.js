export const API_URLS = {
    CITY_URL: (cityName) => `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.OPEN_WEATHER_API_KEY}&lang=ua`,
    LOCATION_URL: (latitude, longitude) => `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}&lang=ua`,
    ZIP_CODE_URL: (zipCode) => `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${process.env.OPEN_WEATHER_API_KEY}&lang=ua`,
};