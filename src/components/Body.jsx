import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();
  const userData = useSelector(store => store.user)

  useEffect(() => {
  !userData && fetchUser();
  }, []);
  const dispatch = useDispatch();

  const fetchUser = async () => {

    if(userData) return

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error(error);
    }
  };
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Body;
