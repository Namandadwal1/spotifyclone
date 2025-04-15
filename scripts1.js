console.log(" hi my name is naman");

let songs = []; // ✅ Make songs global
let audio;
let isPlaying = false;
let currentsongindex = 0;

// Fetch songs
async function playsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songsList = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songsList.push(element.href.split("/songs/")[1]);
        }
    }

    return songsList;
}

// Load and show song list
async function main() {
    songs = await playsongs(); // ✅ Store globally
    console.log(songs);

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML += `<li>${song.replaceAll("%20", " ")}</li>`;
    }
}
main();

// Play / Pause Button
document.getElementById("playBtn").addEventListener("click", async function () {
    const button = this;

    if (!audio) {
        if (songs.length === 0) songs = await playsongs();
        audio = new Audio(`http://127.0.0.1:3000/songs/${songs[currentsongindex]}`);

        audio.addEventListener("ended", () => {
            isPlaying = false;
            button.textContent = "Play";
        });
    }

    if (isPlaying) {
        audio.pause();
        button.textContent = "Play";
    } else {
        await audio.play();
        button.textContent = "Pause";
    }

    isPlaying = !isPlaying;
});

// ✅ NEXT Button
document.getElementById("nextBtn").addEventListener("click", async function () {
    if (songs.length === 0) songs = await playsongs();

    // Move to next song
    currentsongindex = (currentsongindex + 1) % songs.length;

    // Stop current audio
    if (audio) {
        audio.pause();
    }

    // Play next song
    audio = new Audio(`http://127.0.0.1:3000/songs/${songs[currentsongindex]}`);
    await audio.play();

    document.getElementById("playBtn").textContent = "Pause";
    isPlaying = true;
});

//Making the previous button

document.getElementById("prevBtn").addEventListener("click", async function () {
    if(songs.length === 0 ) songs=await playsongs();
  
    //Move to the previous song
    currentsongindex=(currentsongindex - 1 )% songs.length;
  
    if (audio) {
      audio.pause();
    }
  
    //play the previous song
    audio =new Audio(`https://127.0.1:3000/songs/${songs[currentsongindex]}`);
    await audio.play();
  
    document.getElementById("playBtn").textContent ="Pause";
    isPlaying=true;
  });
