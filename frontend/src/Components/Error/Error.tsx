import { useNavigate } from "react-router-dom"

const Error = () => {
const nav = useNavigate();

const BackToLogin =()=>{
  nav("/")
}

  return (
   <>
   <div style={{display:"flex", flexDirection:"row",justifyContent:"space-evenly"}}>
   <img src="https://4kwallpapers.com/images/wallpapers/404-error-404-not-6016x3384-9410.jpg"
     style={{width:600, height:450, position:"relative" ,top:50, left:200}} />
   
   <button type="button" onClick={()=>BackToLogin()} style={{color:"blue", fontWeight:"bolder"}} >click here to Login again ..</button>
   </div>
   </>
  )
}

export default Error
