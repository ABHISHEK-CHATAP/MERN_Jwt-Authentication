import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { initialvalues } from "../../vite-env";
import { signUpSchema } from "../../Screens/Schemas";
// import axios from "axios";

const Register = () => {
  const [show1, setShow1] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const initial : initialvalues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const { values, touched, handleChange, errors, handleSubmit } = useFormik({
    initialValues: initial,
    validationSchema: signUpSchema,
    onSubmit: async (val, action) => {
      console.log("formik data : ", val);

    //  await axios.post(
    //       "http://localhost:3009/register",
    //       {
    //         name: val.name,
    //         email: val.email,
    //         password: val.password,
    //         confirm_password: val.confirm_password,
    //       })
    //     .then((res) => {
    //       console.log("res : ", res);
    //     })
    //     .catch((err) => console.log("err aaya :; ",err));

// {{{{{{{{{{{{{{{{{{  Both from axios and fech method post data is working 100% as expected }}}}}}}}}}}}}}}}}

     try {const signUpData = fetch("http://localhost:3009/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: val.name,
          email: val.email,
          password: val.password,
          confirm_password: val.confirm_password,
        }),
      });
      const res = (await signUpData).json();
      console.log("fetch method :",res)
    alert("user Registration Successfull..")
    }  catch(err){
      () =>console.log("err aaya :",err)
    }

      action.resetForm();

    },
  });

  // console.log("formik outer : ",errors)

  return (
    <>
      <main>
        <div className="loginDiv">
          <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
            <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
              Welcome <span className="text-[#7747ff]">Sign Up Here</span>
            </div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              {/* name input div  */}
              <div className="block relative">
                <label
                  htmlFor="name"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Enter your name "
                  id="name"
                  name="name"
                  className="rounded border border-2900 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                />
                {errors.name && touched.name ? (
                  <p className="text-sm text-[#ee1818]">{errors.name}</p>
                ) : null}
              </div>
              {/* email input  */}
              <div className="block relative">
                <label
                  htmlFor="email"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  id="email"
                  name="email"
                  className="rounded border border-2900 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                />
                {errors.email && touched.email ? (
                  <p className="text-sm text-[#ee1818]">{errors.email}</p>
                ) : null}
              </div>
              {/* password input div  */}
              <div className="block relative">
                <label
                  htmlFor="password"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  Password
                </label>
                <div className="showHide">
                  <input
                    type={show1 ? "text" : "password"}
                    id="password"
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                  />
                  <div
                    style={{ cursor: "pointer" }}
                    className="showPass"
                    onClick={() => setShow1((show: any) => !show)}
                  >
                    {show1 ? "Hide" : "show"}
                  </div>
                </div>
                {errors.password && touched.password ? (
                  <p className="text-sm text-[#ee1818]">{errors.password}</p>
                ) : null}
              </div>
              {/* confirm password input div  */}
              <div className="block relative">
                <label
                  htmlFor="password"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  Confirm Password
                </label>
                <div className="showHide">
                  <input
                    type={confirm ? "text" : "password"}
                    onChange={handleChange}
                    id="cpassword"
                    value={values.confirm_password}
                    placeholder="Confirm password"
                    name="confirm_password"
                    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                  />
                  <div
                    style={{ cursor: "pointer" }}
                    className="showPass"
                    onClick={() => setConfirm((show: any) => !show)}
                  >
                    {confirm ? "Hide" : "show"}
                  </div>
                </div>
                {errors.confirm_password && touched.confirm_password ? (
                  <p className="text-sm text-[#ee1818]">
                    {errors.confirm_password}
                  </p>
                ) : null}
              </div>
              {/* <div>
              <a className="text-sm text-[#7747ff]" href="#">
                Forgot your password?
              </a>
            </div> */}{" "}
              <button
                type="submit"
                className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
              >
                Sign Up
              </button>
            </form>
            <div className="text-sm text-center mt-[1.6rem] ">
              Already have an account{" "}
              <Link to="/" className="text-sm text-[#7747ff]">
                Log In to click! 👈
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
