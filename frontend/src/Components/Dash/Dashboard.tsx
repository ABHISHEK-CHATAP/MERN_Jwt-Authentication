import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../ContextApi/Context";

const Dashboard = () => {
  const navigate = useNavigate();

   const {loginData, setLoginData} = useContext(LoginContext);
   console.log("logindata : ", loginData)


  const DashboardValid = async (): Promise<void> => {
    const token = await localStorage.getItem("token");
    // console.log("dash token :", token)

    const res = await fetch("http://localhost:3009/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    console.log("Dashboard data :",data);

    // after removing token from localStorage, you will jump on error page i,e., (signOut), else logged-in (dashboard)
    if (!data || data.status == 401) {
      console.log("error page redirected");
      navigate("*");
    } else {
      console.log("user logged in");
        // setLoginData(data)
        setLoginData(data.ValidUserOne)
      //   i can also dispach (data) into redux state and get wherver we want
    //   navigate("/dash");
    }
  };


  useEffect(() => {
DashboardValid()

  }, []);
// console.log("myEmail :",loginData.ValidUserOne.email)
  return (
    <>
      <div className="" style={{ position: "absolute", top: 100, left: 550 }}>
        <img
          src="https://img.freepik.com/premium-vector/young-man-sitting-desk-surfing-internet-computer-male-character-spending-time-home-evening-scene-from-daily-life-ordinary-person-vector-illustration-flat-cartoon-style_198278-7498.jpg?w=2000"
          style={{ width: 300, height: 300 }}
        />
        <h1>
          <b className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
            Welcome, to Dash Board Page{" "}
          </b>
        </h1>
        <br />
        {/* <h1 className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
          {" "}
          Your E-mail : {loginData.ValidUserOne.email}
        </h1> */}
      </div>
    </>
  );
};

export default Dashboard;
