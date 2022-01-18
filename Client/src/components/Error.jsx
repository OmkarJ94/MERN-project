import React from "react";
import { Link } from "react-router-dom";
import "./error.css";
const Error = () => {
  return (
    <>
      <div class="container con">
        <div class="row text-center">
          <div class="col-lg-6 offset-lg-3 col-sm-6 offset-sm-3 col-12 p-3 error-main ">
            <div class="row">
              <div class="col-lg-8 col-12 col-sm-10 offset-lg-2 offset-sm-1 ">
                <h1 class="m-0">404</h1>
                <h6>Page not found</h6>
                <button class="btn btn-primary" style={{borderRadius:"15px"}}>
               <Link to="/" style={{color:"aliceblue",padding:"10px",decoration: "none"}}>Go To Home</Link>
               </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
