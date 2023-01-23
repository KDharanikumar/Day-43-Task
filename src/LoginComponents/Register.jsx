import { useFormik } from "formik";
import axios from "axios";
import { env } from "../config";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.name === "") {
        errors.name = "Please enter name ";
      }
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
        await axios.post(`${env.api}/register`, values);

        navigate("/");
      } catch (error) {
        alert(error.response.messsage);
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
                <h1 className="h4  myname">Register</h1>
              </div>
              <form className="user" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <input
                    className={`form-control mb-3 ${formik.errors.name ? `input-error` : ``}`}
                    type={"text"}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    name="name"
                    placeholder="Name"
                  />
                  <span style={{ color: "red" }}>{formik.errors.name}</span>
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
                    className={`form-control mb-3 ${formik.errors.password ? `input-error` : ``}`}
                    id="exampleInputPassword"
                    type={"password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Password"
                    name="Password"
                  />
                  <span style={{ color: "red" }}>{formik.errors.passwword}</span>
                </div>

                <button type="submit" className="btn btn-primary btn-user fw-bold btn-block myname">
                  REGISTER
                </button>
              </form>
              <div className="text-center fw-bold p-3 mt-2">
                <p>
                  Already a member?
                  <Link to={"/"}>Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
