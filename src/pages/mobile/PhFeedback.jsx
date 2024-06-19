import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import employees from "../../employee.json"; // Ensure the path to the JSON file is correct
import "../../index.css";

const PhFeedback = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(0);
  const [modal2, setModal2] = useState(0);
  const modalRef = useRef();
  const inputRef = useRef(null);
  const [btn, setBtn] = useState(false);
  const navigate = useNavigate();

  // modal
  const [startCheck, setStartCheck] = useState(1);
  const [startOnGoing, setStartOngGoing] = useState(1);
  const [placed, setPlaced] = useState("");

  //start
  const [start1, setStart1] = useState("хэрэгжүүлж эхлэх зүйл");
  const [start2, setStart2] = useState("гарах үр дүн");
  const [startWrite, setStartWrite] = useState("");
  const [shouldAnimate, setShouldAnimate] = useState(false);

  //continue
  const [continue1, setContinue1] = useState("үргэлжлүүлэх зүйл");
  const [continue2, setContinue2] = useState("гарах үр дүн");
  const [continueWrite, setContinueWrite] = useState("");
  const [shouldAnimate2, setShouldAnimate2] = useState(false);

  //stop
  const [stop1, setStop1] = useState("зогсоох зүйл");
  const [stop2, setStop2] = useState("гарах үр дүн");
  const [stopWrite, setStopWrite] = useState("");
  const [shouldAnimate3, setShouldAnimate3] = useState(false);

  useEffect(() => {
    const employeeId = parseInt(id, 10);

    const foundEmployee = employees.find((emp) => emp.id === employeeId);

    setData(foundEmployee);
  }, [id]);

  useEffect(() => {
    if (modal2 !== 0 && (startOnGoing === 1 || startOnGoing === 2)) {
      setPlaced("");
      inputRef.current.focus();
    }
  }, [modal2, startOnGoing]);

  useEffect(() => {
    let timer;
    if (
      (start1 !== "хэрэгжүүлж эхлэх зүйл" &&
        start2 !== "гарах үр дүн" &&
        start1 !== "" &&
        start2 !== "") ||
      startWrite !== ""
    ) {
      setBtn(true);
      timer = setTimeout(() => {
        setShouldAnimate(true);
      }, 1000);
    } else {
      setShouldAnimate(false);
    }
    return () => clearTimeout(timer);
  }, [start1, start2, startWrite]);

  useEffect(() => {
    let timer;
    if (
      (continue1 !== "үргэлжлүүлэх зүйл" &&
        continue2 !== "гарах үр дүн" &&
        continue1 !== "" &&
        continue2 !== "") ||
      continueWrite !== ""
    ) {
      setBtn(true);
      timer = setTimeout(() => {
        setShouldAnimate2(true);
      }, 1000);
    } else {
      setShouldAnimate2(false);
    }
    return () => clearTimeout(timer);
  }, [continue1, continue2, continueWrite]);

  useEffect(() => {
    let timer;
    if (
      (stop1 !== "үргэлжлүүлэх зүйл" &&
        stop2 !== "гарах үр дүн" &&
        stop1 !== "" &&
        stop2 !== "") ||
      stopWrite !== ""
    ) {
      setBtn(true);
      timer = setTimeout(() => {
        setShouldAnimate3(true);
      }, 1000);
    } else {
      setShouldAnimate3(false);
    }
    return () => clearTimeout(timer);
  }, [stop1, stop2, stopWrite]);

  const handleModalClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModal(0);
      setModal2(0);
    }
  };

  const handleContinue = () => {
    if (startOnGoing === 1) {
      setStartOngGoing(2);
    } else {
      setModal2(0);
      setStartOngGoing(1);
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
      {console.log(shouldAnimate2)}
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
              className={`border border-[#C6C6C6] rounded-full w-[190px] h-[190px] flex flex-col items-center justify-center pb-3 ${
                shouldAnimate ? "fill-animation-bottom-left" : ""
              }`}
              style={{
                background: shouldAnimate ? "" : "white",
              }}
            >
              <img src="/img/icons/bIcon1.svg" alt="icon" />
              <p
                className={`text-[20px] font-semibold mt-2 ${
                  shouldAnimate ? "text-white-animation" : "text-[#636466]"
                }`}
              >
                START
              </p>
              <p
                className={`text-xs text-center w-[152px] ${
                  shouldAnimate ? "text-white-animation" : "text-[#A1A1A1]"
                }`}
              >
                Цаашид юуг{" "}
                <span className="font-semibold">хэрэгжүүлж эхэлбэл </span>
                зохистой тухай зөвлөнө үү.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div
              onClick={() => {
                setModal(2);
              }}
              className={`border border-[#C6C6C6] rounded-full w-[190px] h-[190px] flex flex-col items-center justify-center pb-3 ${
                shouldAnimate2 ? "fill-animation-bottom-top-left" : ""
              }`}
              style={{
                background: shouldAnimate2 ? "" : "white",
              }}
            >
              <img src="/img/icons/bIcon2.svg" alt="icon" />
              <p
                className={`text-[20px] font-semibold mt-2 ${
                  shouldAnimate2 ? "text-white-animation" : "text-[#636466]"
                }`}
              >
                Continue
              </p>
              <p
                className={`text-xs text-center w-[152px] ${
                  shouldAnimate2 ? "text-white-animation" : "text-[#A1A1A1]"
                }`}
              >
                Цаашид юуг{" "}
                <span className="font-semibold">
                  үргэлжлүүлэн хэрэгжүүлвэл{" "}
                </span>
                зохистой тухай зөвлөнө үү.
              </p>
            </div>
          </div>
          <div className="flex justify-start">
            <div
              onClick={() => {
                setModal(3);
              }}
              className={`border border-[#C6C6C6] rounded-full w-[190px] h-[190px] flex flex-col items-center justify-center pb-3 ${
                shouldAnimate3 ? "fill-animation-bottom-top" : ""
              }`}
              style={{
                background: shouldAnimate3 ? "" : "white",
              }}
            >
              <img src="/img/icons/bIcon3.svg" alt="icon" />
              <p
                className={`text-[20px] font-semibold mt-2 ${
                  shouldAnimate3 ? "text-white-animation" : "text-[#636466]"
                }`}
              >
                STOP{" "}
              </p>
              <p
                className={`text-xs text-center w-[152px] ${
                  shouldAnimate3 ? "text-white-animation" : "text-[#A1A1A1]"
                }`}
              >
                Цаашид юуг{" "}
                <span className="font-semibold">хийхээ зогсоовол </span>
                зохистой тухай зөвлөнө үү.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mx-6 mb-6">
          {btn && (
            <button
              onClick={() => {
                navigate("/ph/sended");
              }}
              className="px-6  py-2  w-[300px]  text-sm text-white font-semibold bg-[#222] rounded-lg"
            >
              илгээх
            </button>
          )}
        </div>
      </div>
      {modal === 1 && (
        <div
          onClick={handleModalClickOutside}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
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
            {startCheck === 1 ? (
              <div className="mt-4">
                <div
                  onClick={() => {
                    setModal2(1);
                    setModal(0);
                  }}
                  className="flex items-start gap-2"
                >
                  <div
                    className={`h-4 w-4 rounded-full border-2 mt-2 ${
                      startCheck === 1 ? "border-blue-600" : "border-gray-300"
                    }`}
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
                        <span className="text-[#7278ff] opacity-100">
                          {data.firstname}
                        </span>{" "}
                        та цаашид
                        <span className="underline-gradient  font-semibold opacity-100">
                          {" "}
                          хэрэгжүүлж эхлэх зүйл
                        </span>
                        -г хийж эхэлвэл
                        <span className="underline-gradient  font-semibold opacity-100">
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

                <div
                  onClick={() => {
                    setStartCheck(2);
                  }}
                  className="flex items-start gap-2 mt-4"
                >
                  <div
                    className={`h-4 w-4 rounded-full border-2 mt-2 ${
                      startCheck === 2 ? "border-blue-600" : "border-gray-300"
                    }`}
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
                        value={startWrite}
                        className="mt-1 block w-full text-[12px] h-[100px]"
                        placeholder="Энд бичнэ үү."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <div className="flex items-start gap-2">
                  <div
                    className={`h-4 w-4 rounded-full border-2 mt-2 ${
                      startCheck === 2 ? "border-blue-600" : "border-gray-300"
                    }`}
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
                        onChange={(e) => {
                          setStartWrite(e.target.value);
                        }}
                        rows="3"
                        className="mt-1 block w-full text-[12px] h-[100px]"
                        placeholder="Энд бичнэ үү."
                        value={startWrite}
                      ></textarea>
                    </div>
                  </div>
                </div>
                {startWrite !== "" ? (
                  <button
                    onClick={() => {
                      setModal(0);
                    }}
                    className="w-full rounded-xl mx-3 mt-3 py-3 text-white bg-[#222] text-xs"
                  >
                    үргэлжлүүлэх
                  </button>
                ) : (
                  <div
                    onClick={() => {
                      setStartCheck(1);
                    }}
                    className="flex items-start gap-2 mt-4"
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
                            startCheck === 1
                              ? "text-[#0752DF]"
                              : "text-[#A4A4A4]"
                          }`}
                        >
                          Та дараах өгүүлбэрийг нөхнө үү.
                        </p>

                        <p className="mt-2 text-xs text-[#222] opacity-70">
                          <span className="text-[#7278ff] opacity-100">
                            {data.firstname}
                          </span>{" "}
                          та цаашид
                          <span className="underline-gradient  font-semibold opacity-100">
                            {" "}
                            хэрэгжүүлж эхлэх зүйл
                          </span>
                          -г хийж эхэлвэл
                          <span className="underline-gradient  font-semibold opacity-100">
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
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {modal === 2 && (
        <div
          onClick={handleModalClickOutside}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div ref={modalRef} className="bg-white rounded-xl py-8 px-4">
            <div className="flex items-center gap-2">
              <img
                className="h-[48px] w-[48px]"
                src="/img/icons/bIcon2.svg"
                alt="icon"
              />
              <p className="font-semibold">Continue</p>
            </div>
            <p className="text-xs opacity-70 w-[325px] mt-2">
              Тухайн ажилтны одоо хийж байгаа бүтэмжтэй, таатай хандлагыг
              урамшуулж цаашдаа энэхүү хандлагаа тогтоон барихад туслах feedbaсk
              бичнэ үү.
            </p>
            {startCheck === 1 ? (
              <div className="mt-4">
                <div
                  onClick={() => {
                    setModal2(2);
                    setModal(0);
                  }}
                  className="flex items-start gap-2"
                >
                  <div
                    className={`h-4 w-4 rounded-full border-2 mt-2 ${
                      startCheck === 1 ? "border-blue-600" : "border-gray-300"
                    }`}
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
                        <span className="text-[#7278ff] opacity-100">
                          {data.firstname}
                        </span>{" "}
                        та цаашид
                        <span className="underline-gradient  font-semibold opacity-100">
                          {" "}
                          үргэлжлүүлэх зүйл
                        </span>
                        -ээ идэвхитэй үргэлжлүүлвэл
                        <span className="underline-gradient  font-semibold opacity-100">
                          {" "}
                          гарах үр дүн
                        </span>
                        -ж чадна. Keep going!
                        <span role="img" aria-label="smiley face">
                          {" "}
                          ✨
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setStartCheck(2);
                  }}
                  className="flex items-start gap-2 mt-4"
                >
                  <div
                    className={`h-4 w-4 rounded-full border-2 mt-2 ${
                      startCheck === 2 ? "border-blue-600" : "border-gray-300"
                    }`}
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
                        value={continueWrite}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <div className="flex items-start gap-2">
                  <div
                    className={`h-4 w-4 rounded-full border-2 mt-2 ${
                      startCheck === 2 ? "border-blue-600" : "border-gray-300"
                    }`}
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
                        onChange={(e) => {
                          setContinueWrite(e.target.value);
                        }}
                        rows="3"
                        className="mt-1 block w-full text-[12px] h-[100px]"
                        placeholder="Энд бичнэ үү."
                        value={continueWrite}
                      ></textarea>
                    </div>
                  </div>
                </div>
                {continueWrite !== "" ? (
                  <button
                    onClick={() => {
                      setModal(0);
                    }}
                    className="w-full rounded-xl mx-3 mt-3 py-3 text-white bg-[#222] text-xs"
                  >
                    үргэлжлүүлэх
                  </button>
                ) : (
                  <div
                    onClick={() => {
                      setStartCheck(1);
                    }}
                    className="flex items-start gap-2 mt-4"
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
                            startCheck === 1
                              ? "text-[#0752DF]"
                              : "text-[#A4A4A4]"
                          }`}
                        >
                          Та дараах өгүүлбэрийг нөхнө үү.
                        </p>

                        <p className="mt-2 text-xs text-[#222] opacity-70">
                          <span className="text-[#7278ff] opacity-100">
                            {data.firstname}
                          </span>{" "}
                          та цаашид
                          <span className="underline-gradient  font-semibold opacity-100">
                            {" "}
                            үргэлжлүүлэх зүйл
                          </span>
                          -ээ идэвхитэй үргэлжлүүлвэл
                          <span className="underline-gradient  font-semibold opacity-100">
                            {" "}
                            гарах үр дүн
                          </span>
                          -ж чадна. Keep going!
                          <span role="img" aria-label="smiley face">
                            {" "}
                            ✨
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {modal === 3 && (
        <div
          onClick={handleModalClickOutside}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div ref={modalRef} className="bg-white rounded-xl py-8 px-4">
            <div className="flex items-center gap-2">
              <img
                className="h-[48px] w-[48px]"
                src="/img/icons/bIcon3.svg"
                alt="icon"
              />
              <p className="font-semibold">STOP</p>
            </div>
            <p className="text-xs opacity-70 w-[325px] mt-2">
              Тухайн ажилтны одоо гаргаж буй таагүй, цухалдуулам хандлага,
              үйлдлийг зогсооход чиглэсэн feedback өгөх ба ингэснээрээ ямар үр
              дүнд хүрж болохыг эелдгээр илэрхийлнэ үү.
            </p>
            {startCheck === 1 ? (
              <div className="mt-4">
                <div
                  onClick={() => {
                    setModal2(3);
                    setModal(0);
                  }}
                  className="flex items-start gap-2"
                >
                  <div
                    className={`h-4 w-4 rounded-full border-2 mt-2 ${
                      startCheck === 1 ? "border-blue-600" : "border-gray-300"
                    }`}
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
                        <span className="text-[#7278ff] opacity-100">
                          {data.firstname}
                        </span>{" "}
                        та цаашид
                        <span className="underline-gradient  font-semibold opacity-100">
                          {" "}
                          зогсоох зүйл
                        </span>
                        -ээ больж чадвал
                        <span className="underline-gradient  font-semibold opacity-100">
                          {" "}
                          гарах үр дүн{" "}
                        </span>
                        Амжилт!
                        <span role="img" aria-label="smiley face">
                          {" "}
                          😎
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setStartCheck(2);
                  }}
                  className="flex items-start gap-2 mt-4"
                >
                  <div
                    className={`h-4 w-4 rounded-full border-2 mt-2 ${
                      startCheck === 2 ? "border-blue-600" : "border-gray-300"
                    }`}
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
                        value={stopWrite}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <div className="flex items-start gap-2">
                  <div
                    className={`h-4 w-4 rounded-full border-2 mt-2 ${
                      startCheck === 2 ? "border-blue-600" : "border-gray-300"
                    }`}
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
                        onChange={(e) => {
                          setStopWrite(e.target.value);
                        }}
                        rows="3"
                        className="mt-1 block w-full text-[12px] h-[100px]"
                        placeholder="Энд бичнэ үү."
                        value={stopWrite}
                      ></textarea>
                    </div>
                  </div>
                </div>
                {stopWrite !== "" ? (
                  <button
                    onClick={() => {
                      setModal(0);
                    }}
                    className="w-full rounded-xl mx-3 mt-3 py-3 text-white bg-[#222] text-xs"
                  >
                    үргэлжлүүлэх
                  </button>
                ) : (
                  <div
                    onClick={() => {
                      setStartCheck(1);
                    }}
                    className="flex items-start gap-2 mt-4"
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
                            startCheck === 1
                              ? "text-[#0752DF]"
                              : "text-[#A4A4A4]"
                          }`}
                        >
                          Та дараах өгүүлбэрийг нөхнө үү.
                        </p>

                        <p className="mt-2 text-xs text-[#222] opacity-70">
                          <span className="text-[#7278ff] opacity-100">
                            {data.firstname}
                          </span>{" "}
                          та цаашид
                          <span className="underline-gradient  font-semibold opacity-100">
                            {" "}
                            зогсоох зүйл
                          </span>
                          -ээ больж чадвал
                          <span className="underline-gradient  font-semibold opacity-100">
                            {" "}
                            гарах үр дүн
                          </span>
                          -ж чадна. Амжилт!
                          <span role="img" aria-label="smiley face">
                            {" "}
                            😎
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {modal2 !== 0 && (
        <div
          onClick={handleModalClickOutside}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div ref={modalRef} className="bg-white rounded-xl py-8 px-4">
            <div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-[300px] border px-2 py-2 rounded-xl border-[#F2F2F2]`}
                >
                  <p className="mt-2 text-xs text-[#222] opacity-70">
                    <span className="text-[#7278ff] opacity-100">Амар</span> та
                    цаашид{" "}
                    <span
                      className={`underline-gradient  font-semibold text-[#222] ${
                        modal2 === 1
                          ? startOnGoing === 1
                            ? start1 === "хэрэгжүүлж эхлэх зүйл"
                              ? "opacity-30"
                              : "opacity-100"
                            : "opacity-100"
                          : modal2 === 2
                          ? startOnGoing === 1
                            ? continue1 === "үргэлжлүүлэх зүйл"
                              ? "opacity-30"
                              : "opacity-100"
                            : "opacity-100"
                          : modal2 === 3
                          ? startOnGoing === 1
                            ? stop1 === "зогсоох зүйл"
                              ? "opacity-30"
                              : "opacity-100"
                            : "opacity-100"
                          : ""
                      } `}
                    >
                      {modal2 === 1
                        ? start1
                        : modal2 === 2
                        ? continue1
                        : modal2 === 3
                        ? stop1
                        : ""}
                    </span>
                    {modal2 === 1
                      ? "-г хийж эхэлвэл "
                      : modal2 === 2
                      ? "-ээ идэвхитэй үргэлжлүүлвэл "
                      : modal2 === 3
                      ? "-ээ больж чадвал "
                      : ""}
                    <span
                      className={`underline-gradient  font-semibold text-[#222] ${
                        modal2 === 1
                          ? startOnGoing === 2
                            ? start2 === "гарах үр дүн"
                              ? "opacity-30"
                              : "opacity-100"
                            : "opacity-100"
                          : modal2 === 2
                          ? startOnGoing === 2
                            ? continue2 === "гарах үр дүн"
                              ? "opacity-30"
                              : "opacity-100"
                            : "opacity-100"
                          : modal2 === 3
                          ? startOnGoing === 2
                            ? stop2 === "гарах үр дүн"
                              ? "opacity-30"
                              : "opacity-100"
                            : "opacity-100"
                          : ""
                      } `}
                    >
                      {" "}
                      {modal2 === 1
                        ? start2
                        : modal2 === 2
                        ? continue2
                        : modal2 === 3
                        ? stop2
                        : ""}
                    </span>
                    {modal2 === 1
                      ? "-д хүрч чадна. Би таныг чадна гэдэгт итгэлтэй байна 🤗"
                      : modal2 === 2
                      ? "-ж чадна. Keep going!✨ "
                      : modal2 === 3
                      ? "-ж чадна. Амжилт!😎"
                      : ""}
                  </p>
                </div>
              </div>
              <p className="text-xs mt-6 px-3 mb-2">
                Эдгээрээс сонгох болон өөрийн бодлоо бичгээр буулгах боломжтой.
              </p>
              {startOnGoing === 1 ? (
                <div className="px-3">
                  <p
                    onClick={() => {
                      if (modal2 === 1) {
                        setStart1("ажилдаа өөриймсөг ханддаг");
                        setStartOngGoing(2);
                      } else if (modal2 === 2) {
                        setContinue1("ажилдаа өөриймсөг ханддаг");
                        setStartOngGoing(2);
                      } else if (modal2 === 3) {
                        setStop1("ажилдаа өөриймсөг ханддаг");
                        setStartOngGoing(2);
                      }
                    }}
                    className="py-0.5 px-1 rounded-xl border border-[#A7A7A7] text-xs text-[#000] opacity-70 mb-2 w-[190px] text-center"
                  >
                    ажилдаа өөриймсөг ханддаг
                  </p>
                  <p
                    onClick={() => {
                      if (modal2 === 1) {
                        setStart1("бусдад үлгэр дуурайлал үзүүдэг");
                        setStartOngGoing(2);
                      } else if (modal2 === 2) {
                        setContinue1("бусдад үлгэр дуурайлал үзүүдэг");
                        setStartOngGoing(2);
                      } else if (modal2 === 3) {
                        setStop1("бусдад үлгэр дуурайлал үзүүдэг");
                        setStartOngGoing(2);
                      }
                    }}
                    className="py-0.5 px-1 rounded-xl border border-[#A7A7A7] text-xs text-[#000] opacity-70 mb-2 w-[205px] text-center"
                  >
                    бусдад үлгэр дуурайлал үзүүдэг
                  </p>
                  <p
                    onClick={() => {
                      if (modal2 === 1) {
                        setStart1("итгэл даахуйц, найдвартай байдаг");
                        setStartOngGoing(2);
                      } else if (modal2 === 2) {
                        setContinue1("итгэл даахуйц, найдвартай байдаг");
                        setStartOngGoing(2);
                      } else if (modal2 === 3) {
                        setStop1("итгэл даахуйц, найдвартай байдаг");
                        setStartOngGoing(2);
                      }
                    }}
                    className="py-0.5 px-1 rounded-xl border border-[#A7A7A7] text-xs text-[#000] opacity-70 mb-2 w-[220px] text-center"
                  >
                    итгэл даахуйц, найдвартай байдаг
                  </p>
                  <p
                    onClick={() => {
                      if (modal2 === 1) {
                        setStart1("шинийг санаачилдаг");
                        setStartOngGoing(2);
                      } else if (modal2 === 2) {
                        setContinue1("шинийг санаачилдаг");
                        setStartOngGoing(2);
                      } else if (modal2 === 3) {
                        setStop1("шинийг санаачилдаг");
                        setStartOngGoing(2);
                      }
                    }}
                    className="py-0.5 px-1 rounded-xl border border-[#A7A7A7] text-xs text-[#000] opacity-70 mb-2 w-[140px] text-center"
                  >
                    шинийг санаачилдаг
                  </p>
                </div>
              ) : (
                <div className="px-3">
                  <p
                    onClick={() => {
                      if (modal2 === 2) {
                        setContinue2("амжилтад хүрэх");
                      } else if (modal2 === 1) {
                        setStart2("амжилтад хүрэх");
                      } else if (modal2 === 3) {
                        setStop2("амжилтад хүрэх");
                      }
                    }}
                    className="py-0.5 px-1 rounded-xl border border-[#A7A7A7] text-xs text-[#000] opacity-70 mb-2 w-[114px] text-center"
                  >
                    амжилтад хүрэх
                  </p>
                  <p
                    onClick={() => {
                      if (modal2 === 2) {
                        setContinue2("төсөл амжилттай хэрэгжих");
                      } else if (modal2 === 1) {
                        setStart2("төсөл амжилттай хэрэгжих");
                      } else if (modal2 === 3) {
                        setStop2("төсөл амжилттай хэрэгжих");
                      }
                    }}
                    className="py-0.5 px-1 rounded-xl border border-[#A7A7A7] text-xs text-[#000] opacity-70 mb-2 w-[175px] text-center"
                  >
                    төсөл амжилттай хэрэгжих
                  </p>
                  <p
                    onClick={() => {
                      if (modal2 === 2) {
                        setContinue2("хамт олонтойгоо дотносох");
                      } else if (modal2 === 1) {
                        setStart2("хамт олонтойгоо дотносох");
                      } else if (modal2 === 3) {
                        setStop2("хамт олонтойгоо дотносох");
                      }
                    }}
                    className="py-0.5 px-1 rounded-xl border border-[#A7A7A7] text-xs text-[#000] opacity-70 mb-2 w-[175px] text-center"
                  >
                    хамт олонтойгоо дотносох
                  </p>
                  <p
                    onClick={() => {
                      if (modal2 === 2) {
                        setContinue2("бүтээмж өндөртэй ажилтан болох");
                      } else if (modal2 === 1) {
                        setStart2("бүтээмж өндөртэй ажилтан болох");
                      } else if (modal2 === 3) {
                        setStop2("бүтээмж өндөртэй ажилтан болох");
                      }
                    }}
                    className="py-0.5 px-1 rounded-xl border border-[#A7A7A7] text-xs text-[#000] opacity-70 mb-2 w-[214px] text-center"
                  >
                    бүтээмж өндөртэй ажилтан болох
                  </p>
                </div>
              )}
              {modal2 === 1 ? (
                (start1 !== "хэрэгжүүлж эхлэх зүйл" && startOnGoing === 1) ||
                (start2 !== "гарах үр дүн" && startOnGoing === 2) ? (
                  <button
                    onClick={handleContinue}
                    className="w-full rounded-xl mx-3 mt-3 py-3 text-white bg-[#222] text-xs"
                  >
                    үргэлжлүүлэх
                  </button>
                ) : (
                  ""
                )
              ) : modal2 === 2 ? (
                (continue1 !== "үргэлжлүүлэх зүйл" && startOnGoing === 1) ||
                (continue2 !== "гарах үр дүн" && startOnGoing === 2) ? (
                  <button
                    onClick={handleContinue}
                    className="w-full rounded-xl mx-3 mt-3 py-3 text-white bg-[#222] text-xs"
                  >
                    үргэлжлүүлэх
                  </button>
                ) : (
                  ""
                )
              ) : modal2 === 3 ? (
                (stop1 !== "зогсоох зүйл" && startOnGoing === 1) ||
                (stop2 !== "гарах үр дүн" && startOnGoing === 2) ? (
                  <button
                    onClick={handleContinue}
                    className="w-full rounded-xl mx-3 mt-3 py-3 text-white bg-[#222] text-xs"
                  >
                    үргэлжлүүлэх
                  </button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4">
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                backgroundImage: "linear-gradient(to right, #7277FF, #A55FFF)",
              }}
            ></div>
            <input
              ref={inputRef}
              type="text"
              value={placed}
              placeholder={
                startOnGoing === 1 ? "үргэлжлүүлэх зүйл " : "гарах үр дүн"
              }
              onChange={(e) => {
                if (modal2 === 1) {
                  if (startOnGoing === 1) {
                    setPlaced(e.target.value);
                    setStart1(e.target.value);
                  } else {
                    setPlaced(e.target.value);
                    setStart2(e.target.value);
                  }
                } else if (modal2 === 2) {
                  if (startOnGoing === 1) {
                    setPlaced(e.target.value);
                    setContinue1(e.target.value);
                  } else {
                    setPlaced(e.target.value);
                    setContinue2(e.target.value);
                  }
                } else if (modal2 === 3) {
                  if (startOnGoing === 1) {
                    setPlaced(e.target.value);
                    setStop1(e.target.value);
                  } else {
                    setPlaced(e.target.value);
                    setStop2(e.target.value);
                  }
                }
              }}
              className="w-full px-4 py-2 border rounded-t-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhFeedback;
