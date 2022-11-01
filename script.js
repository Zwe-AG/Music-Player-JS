let playListContainerTag = document.getElementsByClassName("playListContainer")[0];
let audiotag = document.getElementsByClassName("audiotag")[0];
let currentAndTotleTimeTag = document.getElementsByClassName("currentAndTotleTime")[0];
let currentProgressTag = document.getElementById("currentProgress");
let  playButtonTag = document.getElementsByClassName("playButton")[0];
let  pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
let  previousButtonTag = document.getElementsByClassName("previousButton")[0];
let  nextButtonTag = document.getElementsByClassName("nextButton")[0];

let songs = [
    {songId : "./Music/song1.mp3" , title : "Its you - Ali Gate"},
    {songId : "./Music/song2.mp3" , title : "I Do - 911 Band" },
    {songId : "./Music/song3.mp3" , title : "Pademonium - Niki"},
    {songId : "./Music/song4.mp3" , title : "There for you - Martin Garrix and Troye Sivan"},
    {songId : "./Music/song5.mp3" , title : "Under / Over - Gracie Abrams"},
];

for(let i = 0 ; i < songs.length ; i++){
    let songTag = document.createElement("div");
    songTag.classList.add("songItem");
    songTag.addEventListener("click",()=>{
        // let songId = songs[i].songId;
        // audiotag.src = songId;
        // audiotag.play();
        // isPlaying = true;
        // updatePlayPauseButton();
        currentPlayingIndex = i;  
        playSong();  
    })
    let title  = (i + 1).toString() + ". " + songs[i].title;
    songTag.textContent = title;
    playListContainerTag.append(songTag);
}

let duration = 0;
let durationText = "00:00"
audiotag.addEventListener("loadeddata",()=>{
    duration = Math.floor(audiotag.duration); //123.0922
    // let minutes = Math.floor(duration/60);
    // let seconds = duration%60;

    // let minuteText = minutes < 10 ? "0" + minutes.toString() : minutes ;
    // let secondsText = seconds < 10 ? "0" + seconds.toString() : seconds ;
    // console.log(minuteText+ " " + secondsText)
    durationText = createMinutesAndSecondsText(duration);
})

audiotag.addEventListener("timeupdate",()=>{
    let currentTime = Math.floor(audiotag.currentTime); //123.0922
    // let minutes = Math.floor(currentTime/60);
    // let seconds = currentTime%60;

    // let minuteText = minutes < 10 ? "0" + minutes.toString() : minutes ;
    // let secondsText = seconds < 10 ? "0" + seconds.toString() : seconds ;
    // console.log(minuteText+ " " + secondsText)
    let currentTimeText = createMinutesAndSecondsText(currentTime);
    let currentTimeTextAndDurationText = currentTimeText + " / " + durationText;
    currentAndTotleTimeTag.textContent = currentTimeTextAndDurationText;
    updateCurrentProgress(currentTime);
})

let updateCurrentProgress = (currentTime)=>{
    let currentProgressWidth = (100/duration)*currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString() + "px";
    
}

let createMinutesAndSecondsText = (totalsecond) =>{
    let minutes = Math.floor(totalsecond/60);
    let seconds = totalsecond%60;

    let minuteText = minutes < 10 ? "0" + minutes.toString() : minutes ;
    let secondsText = seconds < 10 ? "0" + seconds.toString() : seconds ;
    return minuteText+ " : " + secondsText;
}

let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener("click",()=>{
    let currentTime = Math.floor(audiotag.currentTime);
    isPlaying = true;
    if(currentTime === 0){
        playSong();
    }else{
        audiotag.play();
        updatePlayPauseButton();
    }

})

previousButtonTag.addEventListener("click",()=>{
  if(currentPlayingIndex === 0){
      return;
  }
  currentPlayingIndex -= 1;
  playSong();
})

nextButtonTag.addEventListener("click",()=>{
    if(currentPlayingIndex === songs.length - 1){
        return;
    }
    currentPlayingIndex += 1;
    playSong()
})

pauseButtonTag.addEventListener("click",()=>{
    isPlaying = false;
    audiotag.pause();
    updatePlayPauseButton();
 })

 let playSong = () =>{
    let songIdToPlay = songs[currentPlayingIndex].songId;
    audiotag.src = songIdToPlay;
    audiotag.play();
    isPlaying =true;
    updatePlayPauseButton();
 }

let updatePlayPauseButton = ()=>{
  if(isPlaying){
    playButtonTag.style.display = "none";
    pauseButtonTag.style.display = "inline";
  }else{
    playButtonTag.style.display = "inline";
    pauseButtonTag.style.display = "none";
  }
}

