import React from "react";

function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <p className="text-4xl font-bold">
          <span className="text-[#ff0000]">404</span> - Page Not Found
        </p>
        <p className="text-xl mt-2">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
