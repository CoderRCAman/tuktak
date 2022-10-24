const App = () => {
  const [videoFile, setVideoFile] = React.useState(null);  
  const [title ,setTitle] = React.useState('') ; 
  const [musicUsed , setMusicUsed] = React.useState('')  ; 
  const onSubmit = async(e) => { 
    e.preventDefault() ;
    if(!videoFile ||!title ) return alert('Please make sure you fill all required fields!!') ;    
    const data = new FormData() ;
    data.append('file' , videoFile) ;
    data.append('title' ,title) ; 
    data.append('musicTitle',musicUsed) ;
    try {
      const res = await fetch('http://localhost:5000/upload' , {
        method: 'POST' , 
        credentials:'same-origin' , 
        body : data  
      }) 
      if(res.status ===200) {
        alert('You video was upload!') ; 
        window.location.href = '/'
      }
    } catch (error) {
       console.log(error) ;
    }
  }
  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form 
       onSubmit = {onSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }} 
        
      >
        {videoFile && (
          <div>
            <video src={URL.createObjectURL(videoFile)} controls>
              {" "}
            </video>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label style={{ fontSize: "20px", color: "pink" }}>
            Choose your video to upload!
          </label>
          <input
            style={{ color: "white", padding: "10px" }}
            type="file"
            accept="video/*"
            onChange={(e) => {
              setVideoFile(e.target.files[0]);
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            marginTop: "17px",
          }}
        >
          <label style={{ color: "pink" }}>Add Title!</label>
          <input
            style={{ height: "40px", width: "290px", outline: "none" }}
            type="text" 
            name = 'title'
            onChange = {e => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            marginTop: "20px",
          }}
        >
          <label style={{ color: "#EF4444" }}>Music title used (if any)</label>
          <input
            style={{ height: "40px", width: "290px", outline: "none" }}
            type="text" 
            onChange = {e => setMusicUsed(e.target.value)}
          />
        </div>
        <div>
          <button
            style={{
              backgroundColor: "rgba(65, 76, 89, 1)",
              padding: "10px 30px",
              border: "2px #CDCC23 solid",
              marginTop: "12px",
              fontSize: "15px",
              color: "#CDCC23",
              cursor: "pointer",
              marginBotton: "10px",
            }}
          > 
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
