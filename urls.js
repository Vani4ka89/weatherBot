export const API_URLS = {
    CITY_URL: (cityName) => `${process.env.WEATHER_URL}q=${cityName}${process.env.APP_ID}${process.env.OPEN_WEATHER_API_KEY}${process.env.LANG_UA}`,

    LOCATION_URL: (latitude, longitude) => `${process.env.WEATHER_URL}lat=${latitude}&lon=${longitude}${process.env.APP_ID}${process.env.OPEN_WEATHER_API_KEY}${process.env.LANG_UA}`,

    ZIP_CODE_URL: (zipCode) => `${process.env.WEATHER_URL}zip=${zipCode}${process.env.APP_ID}${process.env.OPEN_WEATHER_API_KEY}${process.env.LANG_UA}`,
};