console.log(" hi my name is naman");

let songs=[];  // an empty array make songs global            
let audio; // To store the audio  object
let isPlaying = false; // Track play state
let currentsongindex =0;

//fetch the songs
 async function playsongs() {

     let a =await fetch ("http://127.0.0.1:3000/songs/")
     let response =await a.text()
     console.log(response)
     let div= document.createElement("div")
     div.innerHTML=response;
     let as=div.getElementsByTagName("a")
     let songsList=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
    if(element.href.endsWith(".mp3")){
        songsList.push(element.href .split("/songs/")[1])
    }
    }
    return songsList
}
async function main() { 
    
  //Load and show the songs list
    let songs= await playsongs()
    console.log(songs) 
    
    let songUL=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for(const song of songs){
      songUL.innerHTML=songUL.innerHTML+`<li> ${song .replaceAll("%20" ," ")} </li>`;
    }

    // var audio = new Audio(songs[4]);
    // audio.play();
}
main()       


// Making an play/pause  button
document.getElementById("playBtn").addEventListener("click", async function () {
  const button = this;

  if (!audio) {
    // First time: fetch songs and create audio
    let songs = await playsongs();
    if (songs.length === 0) {
      alert("No songs found!");
      return;
    }
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

// making the next button
document.getElementById("nextBtn").addEventListener("click",async function () {
  
  
  // this below line check that if the length of an array is 0 then run playsongs() function in the songs array
  
  if(song.length === 0)songs= await playsongs();

  //Move to next song
  currentsongindex= (currentsongindex + 1)% song.length;

  // stop if current audio is exixts 
  if (audio) {
    audio.pause()
  }

  //Play new songs
  audio= new Audio(`http://127.0.0.1:3000/songs/${songs[currentSongIndex]}`);

  await audio.play()

  document.getElementById("playBtn").textContent="pause";


  isPlaying = true;


});

//Making the previous button

document.getElementById("prevBtn").addEventListener("click", async function () {
  if(songs.length === 0 ) songs=await playsongs();

  //Move to the previous song
  currentsongindex=(currentsongindex - 1 )% song.length;

  if (audio) {
    audio.pause();
  }

  //play the previous song
  audio =new Audio(`https://127.0.1:3000/songs/${songs[currentsongindex]}`);
  await audio.play();

  document.getElementById("playBtn").textContent ="Pause";
  isPlaying=true;
}); 