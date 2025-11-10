
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const reelsData = [
  { id: 1, video: "/videos/37585-414024825_medium.mp4", name: "Bgmi" },
  { id: 2, video: "/videos/37585-414024825_medium.mp4", name: "Valorant" },
];

export default function ReelsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentIndex = reelsData.findIndex((r) => r.id === parseInt(id));

  return (
    <div className="w-screen h-screen bg-black overflow-y-scroll snap-y snap-mandatory">
      {reelsData.map((reel, index) => (
        <div
          key={reel.id}
          className="w-full h-screen flex items-center justify-center snap-start relative"
        >
          <video
            src={reel.video}
            autoPlay={index === currentIndex}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-10 left-6 text-white">
            <h1 className="text-xl font-bold">{reel.name}</h1>
          </div>

          {/* Exit Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-5 left-5 bg-black/50 px-3 py-1 rounded-lg text-white hover:bg-red-600 transition"
          >
            Back
          </button>
        </div>
      ))}
    </div>
  );
}
