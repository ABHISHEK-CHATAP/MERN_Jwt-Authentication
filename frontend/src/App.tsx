import Dashboard from "./Components/Dash/Dashboard";
import Error from "./Components/Error/Error";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
{/* // This repository is taught by {{HArsh PAthak}} uTube channel JWT Authentication 4:50 Hrs */}
    
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dash" element={<Dashboard/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
