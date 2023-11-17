import * as Yup from "yup";









 export const signUpSchema = Yup.object({
  name : Yup.string().min(2).max(30).required("Enter your name"),
  email : Yup.string().email("Enter a valid email").required("Enter your email"),
  password : Yup.string().min(4).max(30).required("Enter your password"),
  confirm_password : Yup.string().oneOf([Yup.ref("password"), null], "Passwords do not match")
})

