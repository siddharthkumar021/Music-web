console.log("Welcome to Spotify");


// search bar 
const nav = document.querySelector(".nav"),
searchIcon = document.querySelector("#searchIcon");

searchIcon.addEventListener("click",() =>{
    nav.classList.toggle("openSearch");
    if(nav.classList.contains("openSearch")){
       return searchIcon.classList.replace("fa-solid fa-magnifying-glass","fa-sharp fa-regular fa-xmark");

    }
    searchIcon.classList.replace("fa-sharp fa-regular fa-xmark","fa-solid fa-magnifying-glass");
});

// Initialize the variable
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "Mulaqat - prateek kuhad", filePath: "song/1.mp3", coverPath: "cover/1.jpg" },
    { songName: " Sparkle - your name", filePath: "song/2.mp3", coverPath: "cover/2.jpg" },
    { songName: "Baarishein - anuv jain", filePath: "song/3.mp3", coverPath: "cover/3.jpg" },
    { songName: "Co2 - prateek kuhad", filePath: "song/4.mp3", coverPath: "cover/4.jpg" },
    { songName: "All I Want - kodaline", filePath: "song/5.mp3", coverPath: "cover/5.jpg" },
    { songName: "Behind the cloud - yaeow", filePath: "song/6.mp3", coverPath: "cover/6.jpg" },
    { songName: "Sajni - Jal-The Band", filePath: "song/7.mp3", coverPath: "cover/7.webp" },
    { songName: "Roz-Roz - The yellow dairy", filePath: "song/8.mp3", coverPath: "cover/8.webp" },
    { songName: "Choo-lo - The local Train", filePath: "song/9.mp3", coverPath: "cover/9.webp" },
];

songItems.forEach((element, i) => {

    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Handle Play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-sharp', 'fa-regular', 'fa-circle-play');
        masterPlay.classList.add('fa-regular', 'fa-circle-pause');
        gif.style.opacity = 1;

    } else {
        audioElement.pause(); // Use pause() instead of paused()
        masterPlay.classList.remove('fa-regular', 'fa-circle-pause');
        masterPlay.classList.add('fa-sharp', 'fa-regular', 'fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to the timeupdate event
audioElement.addEventListener('timeupdate', () => {

    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressbar.value = progress;
});

myProgressbar.addEventListener('change', () => {
    audioElement.currentTime = myProgressbar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.classList.remove('fa-regular', 'fa-circle-pause');
        element.classList.add('fa-sharp', 'fa-regular', 'fa-circle-play');
    })
    }
Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-sharp', 'fa-regular', 'fa-circle-play');
            e.target.classList.add('fa-regular', 'fa-circle-pause');
            audioElement.src = `song/${songIndex }.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-sharp', 'fa-regular', 'fa-circle-play');
            masterPlay.classList.add('fa-regular', 'fa-circle-pause');
        

        })
    })

    document.getElementById('next').addEventListener('click',()=>{
        if(songIndex>=9){
            songIndex = 0
        }
        else{
            songIndex += 1;
        }
        audioElement.src = `song/${songIndex }.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-sharp', 'fa-regular', 'fa-circle-play');
        masterPlay.classList.add('fa-regular', 'fa-circle-pause');
    })

    document.getElementById('previous').addEventListener('click',()=>{
        if(songIndex<=0){
            songIndex = 0
        }
        else{
            songIndex -= 1;
        }
        audioElement.src = `song/${songIndex }.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-sharp', 'fa-regular', 'fa-circle-play');
        masterPlay.classList.add('fa-regular', 'fa-circle-pause');
    })