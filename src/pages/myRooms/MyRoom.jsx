import React, { useContext, useEffect, useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { AuthContext } from '../../providers/AuthContext';

const MyRoom = () => {

  useDocumentTitle('My Room');
  const { user } = useContext(AuthContext);
  const [myRoom, setMyRoom] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/my-rooms?email=${user?.email}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setMyRoom(data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [user]);
  return (
    <div>
      <h2>{myRoom.length}</h2>
    </div>
  );
};

export default MyRoom;