import React, { useContext, useEffect, useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { AuthContext } from '../../providers/AuthContext';
import MyPostedRoomCard from './myPostedRoomCard/MyPostedRoomCard';

const MyRoom = () => {
  useDocumentTitle('My Room');
  const { user } = useContext(AuthContext);
  const [myRoom, setMyRoom] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/my-rooms?email=${user?.email}`)
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          setMyRoom(data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [user]);
  return (
    <div>
      <h1 className="text-3xl mb-7 text-center font-bold font-serif">
        Your Posted Room
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myRoom.map(postedRoom => (
          <MyPostedRoomCard key={postedRoom._id} postedRoom={postedRoom} />
        ))}
      </div>
    </div>
  );
};

export default MyRoom;
