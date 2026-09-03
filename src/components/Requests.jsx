import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const requests = useSelector((store) => store.requests);

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, _id) => {
    try {
     await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      )
      dispatch(removeRequest(_id))
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error?.message);
    }
  };
  console.log(requests);
  if (!requests) return;
  if (requests.length === 0) return <h1 className="flex justify-center my-10">No Connection Requests Found</h1>;
  return (
    <div className="text-center my-10 flex flex-col">
      <h1 className="text-bold text-4xl align text-white">
        Connection Requests
      </h1>
      {requests?.map((request, index) => {
        const { firstName, lastName, photoUrl, about } = request.fromUserId;
        return (
          <div
            key={request._id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              {" "}
              <img
                src={photoUrl}
                className="w-20 h-20 rounded-full"
                alt="photo"
              />
            </div>
            <div className="text-left mx-4">
              {" "}
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary secondary mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
              <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
