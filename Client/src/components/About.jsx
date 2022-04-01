import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Spinner from "./Spinner";

import { useNavigate } from "react-router-dom";
const About = () => {
  const History = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    Proffesion: "",
    _id: "",
  });

  const [loading, setLoading] = useState(false);
  const [updatedData, setUserUpdatedData] = useState({
    name: "",
    email: "",
    phone: "",
    Proffesion: "",
    _id: "",
  });

  const history = useNavigate();
  const updateUser = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserUpdatedData({ ...updatedData, [name]: value });
  };

  const setdata = () => {
    setUserUpdatedData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      Proffesion: userData.Proffesion,
      _id: userData._id,
    });
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, phone, Proffesion, _id } = updatedData;
      setLoading(true);

      const res = await fetch(`/updateuser/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          Proffesion,
        }),
      });
      // eslint-disable-next-line
      const result = await res.json();
      setLoading(false);
      if (res.status !== 201 || !res) {
        swal("Invalid Data");
        // setUser({
        //   name: "",
        //   email: "",
        //   phone: "",
        //   work: "",
        //   password: "",
        //   cpassword: "",
        // });
      } else {
        swal("Updated succesfully");
        History("/about");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const callAboutPage = async () => {
    try {
      const res = await fetch("/profilepage", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        Proffesion: data.work,
        _id: data._id,
      });
      console.log(userData);

      console.log(updatedData);
      if (!res.status === 200) {
        swal("error");
      }
    } catch (error) {
      console.log(error.message);
      history("/login");
      swal("You Must Be Logged In To View About Page");
    }
  };
  // eslint-disable-next-line
  useEffect(() => {
    callAboutPage();
    document.title = "MERN-About";
    // eslint-disable-next-line
  });
  return (
    <div>
      <div class="container mt-5">
        <div class="main-body">
          <div class="row">
            <div class="col-lg-4">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      alt="Admin"
                      class="rounded-circle p-1 bg-primary"
                      width="110"
                    />
                    <div class="mt-3">
                      <h4>{userData.name}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="card">
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Full Name</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input
                        type="text"
                        class="form-control"
                        value={userData.name}
                        style={{
                          borderTopStyle: "hidden",
                          borderRightStyle: "hidden",
                          borderLeftStyle: "hidden",
                          borderBottomStyle: "hidden",
                          cursor: "default",
                        }}
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input
                        type="text"
                        class="form-control"
                        value={userData.email}
                        style={{
                          borderTopStyle: "hidden",
                          borderRightStyle: "hidden",
                          borderLeftStyle: "hidden",
                          borderBottomStyle: "hidden",
                          cursor: "default",
                        }}
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Phone</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input
                        type="text"
                        class="form-control"
                        value={userData.phone}
                        style={{
                          borderTopStyle: "hidden",
                          borderRightStyle: "hidden",
                          borderLeftStyle: "hidden",
                          borderBottomStyle: "hidden",
                          cursor: "default",
                        }}
                      />
                    </div>
                  </div>

                  <div class="row mb-1">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Proffesion</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input
                        type="text"
                        class="form-control"
                        value={userData.Proffesion}
                        style={{
                          borderTopStyle: "hidden",
                          borderRightStyle: "hidden",
                          borderLeftStyle: "hidden",
                          borderBottomStyle: "hidden",
                          cursor: "default",
                        }}
                      />

                      <button
                        type="button"
                        class="btn btn-primary my-5"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          setdata();
                        }}
                      >
                        Edit
                      </button>

                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Edit Information
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <div class="input-group mb-3">
                                <input
                                  type="text"
                                  name="name"
                                  class="form-control"
                                  value={updatedData.name}
                                  onChange={updateUser}
                                />
                              </div>
                              <div class="input-group mb-3">
                                <input
                                  type="text"
                                  name="email"
                                  class="form-control"
                                  onChange={updateUser}
                                  value={updatedData.email}
                                />
                              </div>
                              <div class="input-group mb-3">
                                <input
                                  type="text"
                                  name="phone"
                                  class="form-control"
                                  onChange={updateUser}
                                  value={updatedData.phone}
                                />
                              </div>
                              <div class="input-group mb-3">
                                <input
                                  type="text"
                                  name="Proffesion"
                                  class="form-control"
                                  onChange={updateUser}
                                  value={updatedData.Proffesion}
                                />
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                class="btn btn-primary"
                                onClick={HandleSubmit}
                              >
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div class="row">
                <div class="col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="d-flex align-items-center mb-3">
                        Project Status
                      </h5>
                      <p>Web Design</p>
                      <div class="progress mb-3" style={{ height: "5px" }}>
                        <div
                          class="progress-bar bg-primary"
                          role="progressbar"
                          style={{
                            width: "80%",
                            ariaValuenow: "80",
                            ariaValuemin: "0",
                            ariaValuemax: "100",
                          }}
                        ></div>
                      </div>
                      <p>Website Markup</p>
                      <div class="progress mb-3" style={{ height: "5px" }}>
                        <div
                          class="progress-bar bg-danger"
                          role="progressbar"
                          style={{
                            width: "72%",
                            ariaValuenow: "72",
                            ariaValuemin: "0",
                            ariaValuemax: "100",
                          }}
                        ></div>
                      </div>
                      <p>One Page</p>
                      <div class="progress mb-3" style={{ height: " 5px" }}>
                        <div
                          class="progress-bar bg-success"
                          role="progressbar"
                          style={{
                            width: "89%",
                            ariaValuenow: "89",
                            ariaValuemin: "0",
                            ariaValuemax: "100",
                          }}
                        ></div>
                      </div>
                      <p>Mobile Template</p>
                      <div class="progress mb-3" style={{ height: "5px" }}>
                        <div
                          class="progress-bar bg-warning"
                          role="progressbar"
                          style={{
                            width: "55%",
                            ariaValuenow: "55",
                            ariaValuemin: "0",
                            ariaValuemax: "100",
                          }}
                        ></div>
                      </div>
                      <p>Backend API</p>
                      <div class="progress" style={{ height: "5px" }}>
                        <div
                          class="progress-bar bg-info"
                          role="progressbar"
                          style={{
                            width: "66%",
                            ariaValuenow: "66",
                            ariaValuemin: "0",
                            ariaValuemax: "100",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
