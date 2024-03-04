import {Telegraf} from "telegraf";
import {code} from "telegraf/format"
import axios from "axios";
import {config} from "dotenv";
import {API_URLS} from "./urls.js";

config({path: ".env"});

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
bot.start((ctx) => ctx.reply('Привіт!🤗 напиши назву міста/країни або скинь геолокацію'));
bot.on("message", async (ctx) => {
    try {
        const cityName = ctx.message.text;
        const zipCode = cityName;
        const latitude = ctx.message.location ? ctx.message.location.latitude : undefined;
        const longitude = ctx.message.location ? ctx.message.location.longitude : undefined;

        let url = '';

        switch (true) {
            case cityName !== undefined && !/\d/.test(cityName):
                url = API_URLS.CITY_URL(cityName);
                break;
            case latitude !== undefined && longitude !== undefined:
                url = API_URLS.LOCATION_URL(latitude, longitude);
                break;
            case zipCode !== undefined && /\d/.test(zipCode):
                url = API_URLS.ZIP_CODE_URL(zipCode);
                break;
            default:
                console.error("URL Error!");
        }

        if (url) {
            const {data} = await axios.get(url);
            const city = data.name;
            const temp = Math.round(data.main['temp'] - 273.15);
            const feelsLike = Math.round(data.main['feels_like'] - 273.15);
            const description = data['weather'][0].description;
            const humidity = data.main['humidity'];
            const windSpeed = data['wind'].speed;
            const country = data.sys['country'];

            ctx.reply(`Вітаю!🤚Зараз у ${city} (${country}) ${description}, температура повітря 🌡 ${temp}ºC, відчувається як 🌡 ${feelsLike}ºC, вологість повітря становить 💧${humidity} % та швидкість вітру 💨${windSpeed} м/с 😉)`);

            new Promise(() => setTimeout(() => {
                ctx.reply(code('Привіт!🤗 введи назву міста/країни/zipcode або скинь геолокацію'));
            }, 2000));
        }
    } catch (e) {
        ctx.reply("Ви ввели неправильну назву міста/країни❗️Cпробуйте ще раз😉!");
    }
});

void bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));