document.getElementById("nextJoke").addEventListener("click", printJoke)
document.getElementById("nextJoke").addEventListener("click", showButtons)
document.getElementById("ratingButton1").addEventListener("click", function () { jokeRating(1) })
document.getElementById("ratingButton2").addEventListener("click", function () { jokeRating(2) })
document.getElementById("ratingButton3").addEventListener("click", function () { jokeRating(3) })

let joke = ""
const jokeReport = []


async function printJoke() {
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
    document.getElementById("ratingButton1").innerHTML = '<button id="ratingButton1" class="btn btn-info text-white m-1"> ⭐️ </button>'
    document.getElementById("ratingButton2").innerHTML = '<button id="ratingButton2" class="btn btn-info text-white m-1">⭐️ ⭐️</button>'
    document.getElementById("ratingButton3").innerHTML = '<button id="ratingButton3" class="btn btn-info text-white m-1">⭐️ ⭐️ ⭐️</button>'
}