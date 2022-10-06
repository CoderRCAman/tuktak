const videoPlayer = document.getElementsByTagName('video') ; 
console.log(videoPlayer) ;
for(let i=0;i<videoPlayer.length ; i++) {
     videoPlayer[i].addEventListener('mouseenter' , ()=>{
        videoPlayer[i].play()
        videoPlayer[i].loop = true ; 
     }) 
     videoPlayer[i].addEventListener('mouseleave' , ()=>{
        videoPlayer[i].pause()
     })
}