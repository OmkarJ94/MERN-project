import React, { useEffect, useContext } from "react";
import { UserContext } from "../App";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const History = useNavigate();
  const logoutPage = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res) {
        dispatch({ type: "USER", payload: false });
        History("/login");
        swal("Logout Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    logoutPage();
    // try {
    //   fetch("/logout", {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //   }).then((res) => {
    //     History("/");
    //   });
    // } catch (error) {}
    // eslint-disable-next-line
  }, []);

  return <>logout</>;
};

export default Logout;
