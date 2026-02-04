import { useState } from "react";

const RightSidebar = ({ selectedUser }) => {
  const imagesDummyData = [
    "../assets/pic1.png",
    "../assets/pic2.png",
    "../assets/pic3.png",
    "../assets/pic4.png",
    "../assets/pic1.png",
    "../assets/pic2.png",
  ];

  return (
    selectedUser && (
      <div
        className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}
      >
        <div className="pt-16 flex flex-col items-center gap-4 px-6 text-center">
          <img
            src="../assets/pic1.png"
            alt={selectedUser.fullName}
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/30 shadow-md"
          />

          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-green-500 ring-2 ring-green-500/30"></div>
              </div>
              <h1 className="text-xl font-semibold text-white">
                {selectedUser.fullName}
              </h1>
            </div>

            {selectedUser.bio && (
              <p className="text-sm text-gray-300 font-light leading-relaxed max-w-[85%] mt-1">
                {selectedUser.bio}
              </p>
            )}
          </div>
        </div>

        <hr className="border-[#ffffff50] my-4" />
        <div className="px-5 text-xs">
          <p>Media</p>
          <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
            {imagesDummyData.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded"
              >
                <img src={url} className="h-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
        <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-voilet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer">
          Logout
        </button>
      </div>
    )
  );
};

export default RightSidebar;
