import React from "react";
import ParticipantItem from "./ParticipantItem";

const Participants = ({ participants }) => {
  return (
    <aside className="w-1/4 bg-white border-r border-gray-300 p-4 space-y-2">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Participants</h3>
      <ul className="space-y-1">
        {participants.map((p) => (
          <ParticipantItem key={p._id} participant={p} />
        ))}
      </ul>
    </aside>
  );
};
export default Participants