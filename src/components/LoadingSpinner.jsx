import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] bg-gray-100">
      {/* Spinner Animado */}
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-200"></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-400"></div>
      </div>
      <p className="mt-4 text-gray-700 text-center text-sm md:text-base">
        Loading, please be patient...
      </p>
    </div>
  );
};

export default LoadingSpinner;
