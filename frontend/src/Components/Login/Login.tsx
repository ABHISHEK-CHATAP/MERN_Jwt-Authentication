import { useState } from "react";
import "./Login.css";
import { Link , useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
const navigate = useNavigate();


  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Enter your email"),
      password: Yup.string().min(4).max(30).required("Enter your password"),
    }),
    onSubmit: (val, action) => {
      console.log("formik data : ", val);

      axios
        .post("http://localhost:3009/login", {
          email: val.email,
          password: val.password,
        })
        .then((res) => {
          console.log("res : ", res);
          localStorage.setItem("token", res.data.result.token);
         navigate("/dash")
        })
        .catch((err) => console.log(err));

      action.resetForm();
    },
  });

  return (
    <>
      <main>
        <div className="loginDiv">
          <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
            <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
              Welcome back to <span className="text-[#7747ff]">Log In</span>
            </div>
            <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
              Hi, we're glad to have you back, please login
            </div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              {/* Email input div  */}
              <div className="block relative">
                <label
                  htmlFor="email"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  id="email"
                  className="rounded border border-2900 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                />
                {errors.email && touched.email ? (
                  <p className="text-sm text-[#ee1818]">{errors.email}</p>
                ) : null}
              </div>

              {/* password input div  */}
              <div className=" block relative">
                <label
                  htmlFor="password"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  Password
                </label>
                <div className="showHide">
                  <input
                    type={show ? "text" : "password"}
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                  />
                  <span
                    className="showPass"
                    onClick={() => setShow((show: any) => !show)}
                  >
                    {show ? "Hide" : "show"}
                  </span>
                </div>
                {errors.password && touched.password ? (
                  <p className="text-sm text-[#ee1818]">{errors.password}</p>
                ) : null}
              </div>
              <div>
                <a className="text-sm text-[#7747ff]" href="#">
                  Forgot your password?
                </a>
              </div>
              <button
                type="submit"
                className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
              >
                Log In
              </button>
            </form>
            <div className="text-sm text-center mt-[1.6rem] ">
              Don’t have an account yet?{" "}
              <Link to="/register" className="text-sm text-[#7747ff]">
                Sign up Here! 👈
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
