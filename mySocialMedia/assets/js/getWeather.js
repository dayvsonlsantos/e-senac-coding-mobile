// Clima

const API_KEY = "9da3d3dbda52c7e75509b28dd8d99f60";

const getClima = document.querySelector("#getClima")

const nome = document.querySelector("#nome");
const temperatura = document.querySelector("#temperatura");
const weatherDescription = document.querySelector("#weatherDescription");
const time = document.querySelector("#time");
const velocidadeVento = document.querySelector("#velocidadeVento");
const umidade = document.querySelector("#umidade");
const divIcon = document.querySelector("#divIcon");

let minutos = ''

// Cria um novo elemento de imagem
let newImage = document.createElement('img');

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    getWeather(e);
});

getClima.addEventListener("click", async (e) => {
    e.preventDefault();
    getWeather(e);
})

const getWeather = async (e) => {

    try {
        let currentDate = new Date();
        let currentHour = currentDate.getHours();
        let currentMinute = currentDate.getMinutes();

        e.preventDefault();

        // getWeatherData();
        const data = await getWeatherData();
        nome.innerText = data.name;
        temperatura.innerText = `${Number(parseFloat(data.main.temp - 273.15).toFixed(1))}ºC`;
        weatherDescription.innerText = (data.weather[0].description).toUpperCase();

        if (currentMinute <= 9) {
            minutos = '0' + currentMinute
        } else {
            minutos = currentMinute
        }

        time.innerText = `${currentHour}:${minutos}`;
        velocidadeVento.innerText = `${(data.wind.speed * 3.6).toFixed(2)} km/h`;
        umidade.innerText = `${data.main.humidity}%`;

        icon = data.weather[0].icon;

        // Define o atributo src para o URL da imagem
        newImage.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        // Adiciona a imagem ao div com o id "imageContainer"
        document.getElementById('divIcon').appendChild(newImage);
    } catch (error) {
        console.error("Erro ao carregar o clima: ", error);
    }
};

const getWeatherData = async () => {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);

    if (!res.ok) {
        throw new Error("Failed to fetch weather data");
    }

    return res.json();
}

const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, error => {
            reject(new Error("Failed to get geolocation"));
        });
    });
}



