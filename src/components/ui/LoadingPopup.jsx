'use client';

import React from 'react';

const LoadingPopup = ({
  isLoading = false,
  spinnerColor = "purple"
}) => {
  if (!isLoading) return null;

  const colorClasses = {
    purple: {
      spinner: "border-purple-200 border-t-purple-600",
      dots: "bg-purple-600"
    },
    blue: {
      spinner: "border-blue-200 border-t-blue-600",
      dots: "bg-blue-600"
    },
    green: {
      spinner: "border-green-200 border-t-green-600",
      dots: "bg-green-600"
    },
    red: {
      spinner: "border-red-200 border-t-red-600",
      dots: "bg-red-600"
    }
  };

  const colors = colorClasses[spinnerColor] || colorClasses.purple;

  return (
    <div className=" flex items-center justify-center z-50">
      <div className=" p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <div className="text-center">
          {/* Loading Spinner */}
          <div className={`w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4 ${colors.spinner}`}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPopup;