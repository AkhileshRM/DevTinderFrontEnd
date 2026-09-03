import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import { addConnection } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connection);

  useEffect(() => {
    getConnections();
  }, []);

  const getConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });

    dispatch(addConnection(res?.data?.data));
  };

  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="text-center my-10 flex flex-col">
      <h1 className="text-bold text-4xl align text-white">Connections</h1>
      {connections?.map((connection, index) => {
        const { firstName, lastName, photoUrl, about } = connection;
        return (
          <div
            key={connection._id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
