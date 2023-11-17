import "./Header.css";
import Avatar from "@mui/material/Avatar";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../ContextApi/Context";




const Header = () => { 
  const navigate = useNavigate();

  const {loginData, setLoginData} = useContext(LoginContext);
  console.log("headre :", loginData)
  //  const name = JSON.parse(loginData.ValidUserOne.name)
  //  console.log("namee : ",name)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => { navigate("/dash"); }

 const handleLogOut =async()=>{
  // localStorage.removeItem("token"); // if we use localStorage.removeItem and navigate to login page ,, then on avatar we can see user logged ,,
  // for that reason we can use API for Log-Out user  
  handleClose();

  const token = await localStorage.getItem("token");
  // console.log("dash token :", token)

  const res = await fetch("http://localhost:3009/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  console.log("log out data : ",data);

  // after removing token from localStorage, you will jump on error page i,e., (signOut), else logged-in (dashboard)
  if (data.status == 201) {
    console.log("user log out");
    localStorage.removeItem("token")
    navigate("/");
    setLoginData(false);
  } else {
   
   console.log("error");

  }

 }
  


  return (
    <>
      <header>
        <nav>
          <h2><b>LOGO</b></h2>
        </nav>

        {/* SessionLogin.ValidUserOne.email.charAt(0) // to get single charectar */}
        <div>
        {
          loginData ?   <Avatar style={{background:"blue"}} onClick={(event)=>handleClick(event)}>A</Avatar>
          : <Avatar style={{background:"blue"} }/>
        }
        </div>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          loginData ? (
            <div>
              <MenuItem onClick={()=>{
                goToProfile()
                 handleClose()}}>Profile</MenuItem>
              <MenuItem onClick={()=>{ handleLogOut()}}>Log Out</MenuItem>
              </div>
          ) : (
              <MenuItem onClick={handleClose}>Profile</MenuItem>
          )
        }
      </Menu>
      </header>
    </>
  );
};

export default Header;
