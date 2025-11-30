import React from "react";

const ParticipantItem = ({ participant }) => {
  return (
    <li className="text-gray-600 px-2 py-1 rounded hover:bg-gray-100">
      {participant.username}
    </li>
  );
};

export default ParticipantItem;