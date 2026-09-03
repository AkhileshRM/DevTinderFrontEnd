import React, { use, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);

  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          about,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data?.data));
      setTimeout(() => {
        setSaved("");
      }, 3000);
      setSaved("Profile saved successfully");
      setError("");
    } catch (error) {
      setError(error?.response?.data);
      setSaved("");
    }
  };

  return (
    <>
      {saved && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{saved}</span>
          </div>
        </div>
      )}
      <div className="flex justify-center my-10">
        <div className="flex justify-center mt-8 mb-8 mx-10">
          <div className="card bg-base-100 w-96 shadow-sm bg-black">
            <div className="card-body">
              <h2 className="card-title flex justify-center text-2xl">
                Edit Profile
              </h2>
              <div className="p-5">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-2">
                    <label>FirstName: </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    {" "}
                    <label>LastName: </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>PhotoUrl: </label>
                    <input
                      type="text"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>About: </label>
                    <textarea
                      type="text"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="card-actions justify-center mb-4">
              <button
                className="btn btn-primary bg-blue-500 p-4 mb-4"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, photoUrl, about }} />
      </div>
    </>
  );
};

export default EditProfile;
