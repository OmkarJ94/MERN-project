import React, { useState, useEffect } from "react";

import "./Home.css";
const Home = () => {
  const [userData, setUserData] = useState();
  const Homepage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(res);

      const data = await res.json();

      setUserData(data.name);

    } catch (error) {

    }
  };
  useEffect(() => {
    Homepage();
    //eslint-disable-next-line
  }, [userData]);

  return (
    <>
      <div
        className="outer"
        style={{ height: "100vh", backgroundColor: "black" }}
      >
        <div className="center">
          <p>
            <h4>
              <strong>WELCOME</strong>
            </h4>
          </p>

          <h1 style={{ color: "white" }}>{userData}</h1>
          <h1>
            <b>
              <span style={{ color: "aliceblue" }}>We Are The</span>{" "}
              <span style={{ color: "red" }}>MERN</span>{" "}
              <span style={{ color: "aliceblue" }}>Devloper</span>
            </b>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
