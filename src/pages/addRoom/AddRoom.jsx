import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const AddRoom = () => {
  useDocumentTitle('Add Room');
  return (
    <div>
      <h2 className="text-2xl">Add Room</h2>
    </div>
  );
};

export default AddRoom;