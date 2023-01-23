import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { env } from "../components/config";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};

      if (values.email === "") {
        errors.email = "Please enter email";
      }
      if (values.password === "") {
        errors.password = "Please enter password";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        let loginData = await axios.post(`${env.api}/login`, values);
        console.log(loginData);

        if (loginData.data.token) {
          if (loginData.status === 200) {
            navigate("/portal/dashboard");
            window.localStorage.setItem("app-token", loginData.data.token);
          }
        } else {
          alert(loginData.data.message);
        }
      } catch (error) {
        alert(error.response.data.message);
        console.log(error);
      }
    },
  });
  return (
    <div className="container">
      <div className="row d-flex align-content-center justify-content-center ">
        <div className="col-lg-4 col-md-6 col-sm-9 pt-5 ">
          <div className="card o-hidden border-0 shadow-lg  mt-5 transp pt-2 d-flex align-content-center">
            <div className="card-body p-2">
              <div className=" card-header text-center mb-4">
                <h1 className="h4 name">Login</h1>
              </div>
              <form className="user" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <input
                    className={`form-control mb-3 ${formik.errors.email ? `input-error` : ``}`}
                    id="exampleInputEmail"
                    type={"email"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                    placeholder="Email"
                  />
                  <span style={{ color: "red" }}>{formik.errors.email}</span>

                  <input
                    className={`form-control ${formik.errors.password ? `input-error` : ``}`}
                    id="exampleInputPassword"
                    type={"password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Password"
                    name="password"
                  />
                  <span style={{ color: "red" }}>{formik.errors.password}</span>
                </div>

                <div className="form-group">
                  <div className="text-end  fw-bold ">
                    <Link to={"/resetpassword"} className=" ">
                      Forgot password
                    </Link>
                  </div>
                </div>

                <button type="submit" className="btn btn-outline-primary btn-user fw-bold btn-block myname">
                  LOGIN
                </button>
              </form>
              <div className="text-center p-3 fw-bold mt-2">
                <p>
                  Don't have an Account? <Link to={"/register"}>Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
