import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import employees from "../employee.json"; // Ensure the path to the JSON file is correct

const Feedback = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(0);
  const [startCheck, setStartCheck] = useState(0);

  const modalRef = useRef();
  useEffect(() => {
    const employeeId = parseInt(id, 10);

    const foundEmployee = employees.find((emp) => emp.id === employeeId);

    setData(foundEmployee);
  }, [id]);

  const handleModalClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModal(0);
    }
  };

  if (data === null) {
    return (
      <div className="h-screen m-auto">
        <p className="text-[32px]">Loading...</p>
      </div>
    );
  }

  if (data === undefined) {
    return (
      <div className="h-screen m-auto">
        <p className="text-[32px]">Employee not found</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative flex items-center justify-center">
        <img
          className="absolute top-0 left-0"
          src="/img/Container.svg"
          alt="bg"
        />
        <div className=" relative mt-10 flex flex-col items-center">
          <img
            className="h-[86px] w-[86px] "
            src="/img/pfpOnPf.svg"
            alt="pfp"
          />
          <p className="text-center text-[#fff] text-[20px] font-semibold mt-2">
            {data.firstname}, {data.lastname}
          </p>
          <p className="text-center text-[#fff] text-[16px]">
            {data.department} {data.position}
          </p>
        </div>
      </div>
      <div className="mt-7 px-4">
        <p className="text-xs text-[#222] text-center">
          Дараах 3 төрлөөр Дизайнер Амар-д feedback өгнө үү.{" "}
        </p>
        <div className="my-6">
          <div className="flex justify-start">
            <div
              onClick={() => {
                setModal(1);
              }}
              className="border border-[#C6C6C6] rounded-full w-[190px] h-[190px] flex flex-col items-center justify-center pb-3"
            >
              <img src="/img/icons/bIcon1.svg" alt="icon" />
              <p className="text[#636466] text-[20px] font-semibold mt-2">
                START
              </p>
              <p className="text-[#A1A1A1] text-xs text-center w-[152px]">
                Цаашид юуг{" "}
                <span className="font-semibold">хэрэгжүүлж эхэлбэл </span>
                зохистой тухай зөвлөнө үү.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="border border-[#C6C6C6] rounded-full w-[190px] h-[190px] flex flex-col items-center justify-center mt-[-35px] pb-3">
              <img src="/img/icons/bIcon2.svg" alt="icon" />
              <p className="text[#636466] text-[20px] font-semibold mt-2">
                Continue
              </p>
              <p className="text-[#A1A1A1] text-xs text-center w-[150px]">
                Цаашид юуг{" "}
                <span className="font-semibold">
                  үргэлжлүүлэн хэрэгжүүлвэл{" "}
                </span>
                зохистой тухай зөвлөнө үү.
              </p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="border border-[#C6C6C6] rounded-full w-[190px] h-[190px] flex flex-col items-center justify-center mt-[-35px] pb-3">
              <img src="/img/icons/bIcon3.svg" alt="icon" />
              <p className="text[#636466] text-[20px] font-semibold mt-2">
                STOP{" "}
              </p>
              <p className="text-[#A1A1A1] text-xs text-center w-[150px]">
                Цаашид юуг{" "}
                <span className="font-semibold">хийхээ зогсоовол </span>
                зохистой тухай зөвлөнө үү.
              </p>
            </div>
          </div>
        </div>
      </div>
      {modal === 1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={modalRef} className="bg-white rounded-xl py-8 px-4">
            <div className="flex items-center gap-2">
              <img
                className="h-[48px] w-[48px]"
                src="/img/icons/bIcon1.svg"
                alt="icon"
              />
              <p className="font-semibold">Start</p>
            </div>
            <p className="text-xs opacity-70 w-[325px] mt-2">
              Таны өгсөн feedback тухайн ажилтны ажлын бүтээмж, сэтгэлзүйд шууд
              нөлөөлөх боломжтой тул та эелдгээр зохистой, хэрэгцээтэй
              зөвлөмжийг өгнө үү.
            </p>
            <div className="mt-4">
              <div
                onClick={() => {
                  if (startCheck === 1) {
                  } else {
                    setStartCheck(0);
                  }
                }}
                className="flex items-start gap-2"
              >
                <div
                  className={`h-4 w-4 rounded-full border-2 mt-2 ${
                    startCheck === 1 ? "border-blue-600" : "border-gray-300"
                  }`}
                  onClick={() => {
                    setStartCheck(1);
                  }}
                />
                <div>
                  <div
                    className={`w-[300px] border px-2 py-2 rounded-xl ${
                      startCheck === 1
                        ? "border-[#0752DF]"
                        : "border-[#f2f2f2] "
                    }`}
                  >
                    <p
                      className={`text-xs ${
                        startCheck === 1 ? "text-[#0752DF]" : "text-[#A4A4A4]"
                      }`}
                    >
                      Та дараах өгүүлбэрийг нөхнө үү.
                    </p>

                    <p className="mt-2 text-xs text-[#222] opacity-70">
                      <span className="text-[#7278ff] opacity-100">Амар</span>{" "}
                      та цаашид
                      <span className="font-semibold opacity-100">
                        {" "}
                        хэрэгжүүлж эхлэх зүйл
                      </span>
                      -г хийж эхэлвэл
                      <span className="underline font-semibold opacity-100">
                        {" "}
                        гарах үр дүн
                      </span>
                      -д хүрч чадна.
                    </p>
                    <p className="text-xs text-[#222] opacity-70 my-3">
                      Би таныг чадна гэдэгт итгэлтэй байна
                      <span role="img" aria-label="smiley face">
                        {" "}
                        🤗
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 mt-4">
                <div
                  className={`h-4 w-4 rounded-full border-2 mt-2 ${
                    startCheck === 2 ? "border-blue-600" : "border-gray-300"
                  }`}
                  onClick={() => {
                    setStartCheck(2);
                  }}
                />
                <div>
                  <div
                    className={`w-[300px] border px-2 py-2 rounded-xl ${
                      startCheck === 2
                        ? "border-[#0752DF]"
                        : "border-[#f2f2f2] "
                    }`}
                  >
                    <p
                      className={`text-xs ${
                        startCheck === 2 ? "text-[#0752DF]" : "text-[#A4A4A4]"
                      }`}
                    >
                      Feedback өгөх
                    </p>

                    <textarea
                      id="feedback"
                      name="feedback"
                      rows="3"
                      className="mt-1 block w-full text-[12px] h-[100px]"
                      placeholder="Энд бичнэ үү."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
