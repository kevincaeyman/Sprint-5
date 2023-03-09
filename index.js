document.getElementById("nextJoke").addEventListener("click", printJoke)
document.getElementById("nextJoke").addEventListener("click", showButtons)
document.getElementById("ratingButton1").addEventListener("click", function () { jokeRating(1) })
document.getElementById("ratingButton2").addEventListener("click", function () { jokeRating(2) })
document.getElementById("ratingButton3").addEventListener("click", function () { jokeRating(3) })
import { weatherConditionsArray } from "./weatherConditions.js"

let joke = ""
let currentTemperature = ""
let weatherIcon = ""
let weatherIconIndex = ""
let weatherTimestamp = ""
const jokeReport = []


async function printJoke() {
    const index = Math.ceil(Math.random() * 20)

    if (index % 2 == 0) {
        await fetch("https://icanhazdadjoke.com/", {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => { return res.json() })
            .then(data => {
                joke = data.joke;
                console.log(joke);
                document.getElementById("jokeDOM").innerHTML = `${joke} <br><br>`
            })
    }
    else {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-RapidAPI-Key': 'd0dcabd082msh388012e7b29cd9cp1d1ac9jsnc2f0f1c9e449',
                'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
            }
        };

        await fetch('https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random', options)
            .then(response => response.json())
            .then(data => {
                joke = data.value;
                console.log(joke)
                document.getElementById("jokeDOM").innerHTML = `${joke} <br><br>`
            })
            .catch(err => console.error(err));
    }
}


function jokeRating(rating) {
    const timestamp = new Date().toISOString()
    const index = jokeReport.findIndex((j) => j.joke === joke);
    const obj = {
        joke: joke,
        rating: rating,
        timestamp: timestamp
    }

    if (index !== -1) {
        jokeReport[index].rating = rating;
    }
    else {
        jokeReport.push(obj)
    }

    console.log(jokeReport)
}

function showButtons() {
    document.getElementById("ratingButton1").innerHTML = '<button id="ratingButton1" class="ratingButton"> <img src="./images/anxious_emoji.svg"> </button>'
    document.getElementById("ratingButton2").innerHTML = '<button id="ratingButton2" class="ratingButton"><img src="./images/awkward_emoji.svg"></button>'
    document.getElementById("ratingButton3").innerHTML = '<button id="ratingButton3" class="ratingButton"> <img src="./images/laughing_emoji.svg"></button>'
}

const weatherOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd0dcabd082msh388012e7b29cd9cp1d1ac9jsnc2f0f1c9e449',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};

fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Barcelona', weatherOptions)
    .then(res => { return res.json() })
    .then(data => {
        console.log(data)
        currentTemperature = data.current.feelslike_c;
        weatherIconIndex = data.current.condition.code
        weatherIconIndex = weatherConditionsArray.findIndex(c => c.code === weatherIconIndex)
        weatherIcon = weatherConditionsArray[weatherIconIndex].icon

        weatherTimestamp = new Date().getHours()

        if (weatherTimestamp > 6 && weatherTimestamp < 20) {
            document.getElementById("currentWeater").innerHTML = `<img src="weather/64x64/day/${weatherIcon}.png" width="64" height="64">${currentTemperature} °C`

        }
        else { document.getElementById("currentWeater").innerHTML = `<img src="weather/64x64/night/${weatherIcon}.png" width="64" height="64">${currentTemperature} °C` }
    })
