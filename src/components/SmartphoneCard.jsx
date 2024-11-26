import React from "react";

const SmartphoneCard = ({ smartphone }) => {
  return (
    <div className="group bg-white hover:bg-gray-50 transition-all duration-300 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl overflow-hidden transform hover:-translate-y-2">
      <div className="relative">
        <img
          src={smartphone.image}
          alt={smartphone.model}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/80 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
          ${smartphone.price}
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
          {smartphone.brand} - {smartphone.model}
        </h2>
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm3 2a1 1 0 100 2h8a1 1 0 100-2H6zm0 4a1 1 0 100 2h5a1 1 0 100-2H6z" />
            </svg>
            <span className="text-sm">{smartphone.brand}</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13 7H7v6h6V7z" />
              <path
                fillRule="evenodd"
                d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h2V2zM5 5h10v12H5V5zm2-2v2h2V3H7zm6 0v2h2V3h-2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{smartphone.processor}</span>
          </div>
          <div className="flex">
            <div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-purple-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              >
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
              </div>
            <span className="text-sm truncate">{smartphone.camera}</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-orange-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v2H4V6zm0 4h12v2H4v-2z" />
            </svg>
            <span className="text-sm">{smartphone.storageAndRam}</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h2v-2h-2zM7 11h6v4H7v-4zm8-2V5h2v4h-2zM5 5v4H3V5h2zm0 6H3v4h2v-4zm14 2v-2h-2v2h2zm-2-4h2V5h-2v4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{smartphone.display}</span>
          </div>
          <div className="flex items-center">
            <div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-indigo-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              >
              <path d="M3 6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V6zm12 2h1a1 1 0 011 1v2a1 1 0 01-1 1h-1V8z" />
            </svg>
              </div>
            <span className="text-sm truncate">{smartphone.batteryAndCharging}</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-teal-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 3a7 7 0 00-7 7 7 7 0 0014 0 7 7 0 00-7-7zm0 2a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5zm0 2a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
            <span className="text-sm truncate">{smartphone.sensors}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.5 10.5h-2a.5.5 0 01-.5-.5V10H9v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-2a.5.5 0 01.5-.5h2V8h-2a.5.5 0 01-.5-.5v-2a.5.5 0 01.5-.5h2V4.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5V6h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2v2a.5.5 0 01-.5.5z" />
            </svg>

            <span className="text-sm truncate">{smartphone.operatingSystem}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 3h14a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v10h12V5H4zm2 2h4a1 1 0 110 2H6a1 1 0 110-2zm0 4h8a1 1 0 110 2H6a1 1 0 110-2z" />
            </svg>

            <span className="text-sm truncate">{smartphone.dimensions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartphoneCard;