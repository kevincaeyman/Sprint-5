document.getElementById("nextJoke").addEventListener("click", printJoke)

async function printJoke() {
    await fetch("https://icanhazdadjoke.com/", {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(joke => console.log(joke.json()))
}