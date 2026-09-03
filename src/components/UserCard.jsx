import React from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import {useDispatch} from "react-redux"
import {removeUsersFromFeed} from "../utils/feedSlice"

const UserCard = ({ user }) => {
  const {_id, firstName, lastName, about, skills, gender, photoUrl } = user;

  const dispatch = useDispatch()


  const handleSendRequest = async (status, userId) => {
    try{
       const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, 
      {
      withCredentials:true
    }
  )
  dispatch(removeUsersFromFeed(userId))
    }
    catch(error){
      console.log(error?.message)
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt={firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {about && <p>{about}</p>}
        {gender && <p>{gender}</p>}
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary secondary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
