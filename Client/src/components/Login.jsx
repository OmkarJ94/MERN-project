import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { UserContext } from "../App";
import "./login.css";
import Spinner from "./Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(UserContext);
  // const { state, dispatch } = useContext(UserContext);
  const History = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(res.status);
    setLoading(false);
    if (res.status !== 200 || !res) {
      swal("Invalid Creadentials");
      setEmail("");
      setPassword("");
    } else {
      dispatch({ type: "USER", payload: true });
      swal("Log in successfully");
      History("/");
    }
  };
  // eslint-disable-next-line
  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            {loading && <Spinner />}
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
                className="img-fluid"
                alt="Sample"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form method="POST">
                <div className="form-outline mb-4">
                  <label className="form-label" for="form3Example3">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter email address"
                    style={{
                      border: "1px solid black",
                    }}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label" for="form3Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    style={{ border: "1px solid black" }}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <br />
                  <NavLink to="/Changepassword" className="link-danger">
                    <b>Forgot password?</b>
                  </NavLink>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: " 2.5rem", paddingRight: "2.5rem" }}
                    onClick={loginUser}
                  >
                    Login
                  </button>

                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    <span style={{ color: "black" }}>
                      {" "}
                      Don't have an account?
                    </span>
                    <NavLink to="/signup" className="link-danger">
                      Register
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
