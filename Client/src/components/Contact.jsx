import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import swal from "sweetalert";
const Contact = () => {
  const History = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const callContactPage = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (!res.status === 200) {
        swal("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    callContactPage();
    document.title = "MERN-Contact";
    // eslint-disable-next-line
  }, []);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    if (res.status === 400 || !res) {
      swal("Invalid Creadentials");
    } else {
      swal("Message Sent");
      setUserData({ ...userData, message: "" });
      History("/");
    }
  };
  return (
    <div>
      <div class="wrapper">
        <div class="overlay">
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-9">
              <div class="contact-us text-center">
                <h3>Contact Us</h3>a
                <div class="row">
                  <div class="col-md-6">
                    <div class="mt-5 text-center px-3">
                      <div class="d-flex flex-row align-items-center">
                        <span class="icons">
                          <i class="fa fa-map-marker"></i>
                        </span>
                        <div class="address text-left">
                          <span style={{ color: "aliceblue" }}>Address</span>
                          <p>College Road Swami Prasad Bungalow,Rahuri</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center mt-3">
                        <span class="icons">
                          <i class="fa fa-phone"></i>
                        </span>
                        <div class="address text-left">
                          <span style={{ color: "aliceblue" }}>Phone</span>
                          <p>9146802544</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center mt-3">
                        {" "}
                        <span class="icons">
                          <i class="fas fa-envelope"></i>
                        </span>
                        <div class="address text-left">
                          {" "}
                          <span style={{ color: "aliceblue" }}>
                            Email Address
                          </span>
                          <p>ojadhav512@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="text-center px-1">
                      <div class="forms p-4 py-5 bg-white">
                        <h5>Get In Touch</h5>
                        <div class="mt-4 inputs">
                          {" "}
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Name"
                            name="name"
                            value={userData.name}
                            onChange={handleInputs}
                          />
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputs}
                          />
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Phone Number"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputs}
                          />
                          <textarea
                            class="form-control"
                            placeholder="Type your message"
                            value={userData.message}
                            name="message"
                            onChange={handleInputs}
                          ></textarea>{" "}
                        </div>
                        <div class="button mt-4 text-left">
                          {" "}
                          <button
                            type="submit"
                            class="btn btn-dark"
                            style={{ borderRadius: "20px", width: "100px" }}
                            onClick={contactForm}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
