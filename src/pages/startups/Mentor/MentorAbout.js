import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImageSvg from "../../../assets/images/image (1).svg";
import MentorTag from "../../../components/MentorTag";

const MentorAbout = ({
  onClose,
  mentor_name,
  about,
  expertise,
  mentor_logo,
  tag,
  hideVcTag = false,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-[700px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-[2000]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M1 13L13 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Banner section */}
        <div className="relative w-full h-44">
          <img
            src={ImageSvg}
            className="w-full h-full object-cover rounded-b-2xl"
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-70px]">
            <img
              src={mentor_logo || ImageSvg}
              className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-24 pb-10 max-w-4xl mx-auto text-center px-6">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <h2 className="text-2xl font-bold text-gray-900">{mentor_name}</h2>
            <MentorTag tag={tag} hideVcTag={hideVcTag} />
          </div>
          <div className="text-lg mt-2">
            <span className="font-semibold">Expertise: </span>
            <span className="text-[#45C74D] font-semibold">{expertise}</span>
          </div>
          <p className="mt-6 text-gray-700 text-justify leading-7">{about}</p>
        </div>
      </div>
    </div>
  );
};

export default MentorAbout;
