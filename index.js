document.getElementById("nextJoke").addEventListener("click", printJoke)

async function printJoke() {
    await fetch("https://icanhazdadjoke.com/", {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => { return res.json() })
        .then(data => console.log(data.joke))
}