import React, { useState } from "react";
import "./Signup.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
const Signup = () => {
  const History = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false);
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    setLoading(true);
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    // eslint-disable-next-line
    const result = await res.json();
    setLoading(false);
    if (res.status !== 201 || !res) {
      swal("Invalid Registeration");
      setUser({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: "",
      });
    } else {
      swal("Registeration succesfull");
      History("/login");
    }
  };
  return (
    <>
      <section class="h-100 bg-dark">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col">
              <div class="card card-registration my-4">
                <div class="row g-0">
                  <div class="col-xl-6 d-none d-xl-block">
                    <img
                      src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/img4.jpg"
                      alt="Sample"
                      class="img-fluid"
                      style={{
                        borderTopLeftRadius: ".25rem",
                        borderBottomLeftRadius: ".25rem",
                      }}
                    />
                  </div>
                  <div class="col-xl-6">
                    <div class="card-body p-md-5 text-black">
                      <h3 class="mb-5 text-uppercase">
                        {loading && <Spinner />}
                        User{" "}
                        <span style={{ color: "rgb(17, 223, 17)" }}>
                          registration
                        </span>{" "}
                        form
                      </h3>
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example8">
                          Name
                        </label>
                        <input
                          type="text"
                          id="form3Example8"
                          class="form-control form-control-lg"
                          placeholder="Enter Name"
                          style={{ border: "1px solid black" }}
                          name="name"
                          value={user.name}
                          onChange={handleInputs}
                        />
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example8">
                          Email
                        </label>
                        <input
                          type="email"
                          id="form3Example8"
                          class="form-control form-control-lg"
                          placeholder="Enter  email address"
                          style={{ border: "1px solid black" }}
                          name="email"
                          value={user.email}
                          onChange={handleInputs}
                        />
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example97">
                          Phone Number
                        </label>
                        <input
                          type="Number"
                          id="form3Example97"
                          class="form-control form-control-lg"
                          style={{ border: "1px solid black" }}
                          placeholder="Enter phone"
                          name="phone"
                          value={user.phone}
                          onChange={handleInputs}
                        />
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example97">
                          Work
                        </label>
                        <input
                          type="text"
                          id="form3Example97"
                          class="form-control form-control-lg"
                          style={{ border: "1px solid black" }}
                          placeholder="Enter Work"
                          name="work"
                          value={user.work}
                          onChange={handleInputs}
                        />
                      </div>

                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example97">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form3Example97"
                          placeholder="Enter password"
                          class="form-control form-control-lg"
                          style={{ border: "1px solid black" }}
                          name="password"
                          value={user.password}
                          onChange={handleInputs}
                        />
                      </div>
                      <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example97">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="form3Example97"
                          class="form-control form-control-lg"
                          placeholder="Confirm Password"
                          style={{ border: "1px solid black" }}
                          name="cpassword"
                          value={user.cpassword}
                          onChange={handleInputs}
                        />
                      </div>
                      <div class="d-flex justify-content-end pt-3">
                        <button
                          type="button"
                          class="btn btn-light btn-lg"
                          onClick={() => {
                            setUser({
                              name: "",
                              email: "",
                              phone: "",
                              work: "",
                              password: "",
                              cpassword: "",
                            });
                          }}
                        >
                          Reset all
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning btn-lg ms-2"
                          onClick={postData}
                        >
                          Submit form
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
