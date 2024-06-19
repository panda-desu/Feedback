import React from "react";
import { useNavigate } from "react-router-dom";

const PhEndingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="h-full">
        <div className="mb-10 text-center">
          <p className="text-3xl font-bold px-3">
            Feedback амжилттай илгээгдлээ.
          </p>
          <img className="mt-6" src="/img/endPage.png" alt="img" />
        </div>
      </div>
      <div className="absolute bottom-0 text-center pb-8">
        <button
          onClick={() => {
            navigate("/");
          }}
          className=" py-2 rounded-xl w-[250px] text-white bg-[#222] text-sm font-semibold"
        >
          Буцах
        </button>
      </div>
    </div>
  );
};

export default PhEndingPage;
