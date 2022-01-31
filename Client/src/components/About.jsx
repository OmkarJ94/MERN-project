import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const About = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    Proffesion: "",
  });
  const history = useNavigate();
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

      setUserData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        Proffesion: data.work,
      });

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
  }, []);
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
