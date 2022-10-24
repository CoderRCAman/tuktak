const imageFile = document.getElementById('image') ;
const imageLoad = document.getElementById('image-load') ;  
const form = document.getElementById('form') ; 
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
imageFile.addEventListener('change' , (e)=> {
    const actualFile = e.target.files[0] ;
    imageLoad.src = URL.createObjectURL(actualFile) ;
})

form.addEventListener('submit',async(e)=>{
  e.preventDefault() ;
  const target = e.target ; 
  const file =  target[0].files[0] ; 
  const name = target[1].value ; 
  const formData = new FormData() ; 
  if(!file || !name) return alert('Please include all the fields') ;
  formData.append('file' , file) ; 
  formData.append('name' , name) ; 
  try {
    const res = await fetch('http://localhost:5000/profile/edit' , {
      method: 'POST' , 
      credentials:'same-origin' , 
      body : formData  
    }) 
    if(res.status ===200) {
      alert('Your Profile was updated') ; 
      window.location.replace('/home')
    }
  } catch (error) {
     console.log(error) ;
  }
})