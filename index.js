document.getElementById("nextJoke").addEventListener("click", printJoke)

async function printJoke() {
    await fetch("https://icanhazdadjoke.com/", {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(res => { return res.json() })
        .then(data => {
            const joke = data.joke;
            console.log(joke);
            document.getElementById("joke").innerHTML = `${joke} <br><br>`
        })
}