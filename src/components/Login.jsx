import React, { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const Login = () => {
  const [emailId, setEmailId] = useState("ravichandran.ashwin09@gmail.com");
  const [password, setPassword] = useState("Ashwin@09");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      // console.log(res.data)
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (error) {
      setError(error?.response?.data);
      console.error(error?.resonse?.data);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <div className="flex justify-center mt-8 mb-8">
      <div className="card bg-base-100 w-96 shadow-sm bg-black">
        <div className="card-body">
          <h2 className="card-title flex justify-center text-2xl">
            {login ? "Login" : "Signup"}
          </h2>
          <div className="p-5">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2">
                {!login && (
                  <div className="flex flex-col gap-2">
                    <label>FirstName </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                )}
                {!login && (
                  <div className="flex flex-col gap-2">
                    <label>LastName </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                )}
                <label>Email </label>
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Password </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="text-red-500 text-center">{error}</p>
        <div className="card-actions justify-center mb-4">
          <button
            className="btn btn-primary bg-blue-500 p-4 mb-4"
            onClick={login ? handleLogin : handleSignup}
          >
            {login ? "Login" : "Sign Up"}
          </button>
        </div>
        <p
          className="text-center cursor-pointer pb-4"
          onClick={() => setLogin((prev) => !prev)}
        >
          {login ? "New User Sign up here" : "Existing User Sign in here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
