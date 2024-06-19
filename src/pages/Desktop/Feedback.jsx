import React, { useEffect, useRef, useState } from "react";
import employe from "../../employee.json";
import { useNavigate, useParams } from "react-router-dom";

const Feedback = () => {
  const employees = employe;
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [btn, setBtn] = useState(false);
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  //modal
  const [modal, setModal] = useState(1);
  const [modal2, setModal2] = useState(0);
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

  useEffect(() => {
    const employeeId = parseInt(id, 10);

    const foundEmployee = employees.find((emp) => emp.id === employeeId);

    setData(foundEmployee);
  }, [id]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleContinue = () => {
    if (startOnGoing === 1) {
      setStartOngGoing(2);
    } else {
      if (modal2 === 1) {
        setModal(2);
        setModal2(0);
        setStartOngGoing(1);
      } else if (modal2 === 2) {
        setModal(3);
        setModal2(0);
        setStartOngGoing(1);
      }
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.firstname.toLowerCase().includes(query.toLowerCase()) ||
      emp.lastname.toLowerCase().includes(query.toLowerCase())
  );

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
    <div className="bg-[#F8F8F8]">
      <div className="w-full flex items-center justify-between px-8 py-4 bg-[#51A8FF]">
        <p className="text-[24px]">Logo</p>
        <div className="relative ">
          <input
            className="bg-[#fff] py-2 ps-12 rounded-full w-[427px]"
            placeholder="Ажилтны нэрийг бичнэ үү."
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 100)}
          />
          <div className="absolute z-20 top-10">
            {query && focused && (
              <div>
                {filteredEmployees.map((emp) => {
                  return (
                    <div
                      onClick={() => {
                        navigate(`/employee/${emp.id}`);
                      }}
                      className="bg-white w-[350px] rounded-b-xl ms-12 px-4"
                    >
                      <ul className="employee-list w-full">
                        <li
                          className="text-xs border-b py-2 px-6 border-[#D4D4D4]   flex items-center gap-2"
                          key={emp.id}
                        >
                          <img src="./img/pfp.svg" alt="img" />
                          {emp.firstname} {emp.lastname}
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="absolute left-6 inset-y-3 size-4"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="m-auto pt-10 w-10/12 min-h-screen relative">
        <div className="flex items-start justify-between">
          <div className="flex flex-col items-center relative w-[200px]">
            <img src="/img/pfpOnPf.svg" alt="aa" />
            <p className="text-center text-[20px] font-semibold">
              {data.firstname} {data.lastname}
            </p>
            <p className="text-[#171717]">
              {data.department} {data.position}
            </p>
          </div>
          <div className="flex justify-start ms-20">
            <div
              onClick={() => {
                setModal2(0);
                setModal(1);
              }}
              className={`border rounded-full flex flex-col items-center justify-center pb-3 ${
                shouldAnimate ? "fill-animation-bottom-left" : ""
              } ${
                modal === 1 || modal2 === 1
                  ? "border-[#51A8FF] w-[275px] h-[275px] shadow-xl"
                  : "border-[#C6C6C6] w-[200px] h-[200px]"
              }`}
              style={{
                background: shouldAnimate ? "" : "white",
              }}
            >
              <img
                className={`${
                  modal === 1 || modal2 === 1
                    ? "w-[69px] h-[69px]"
                    : "w-[60px] h-[60px]"
                }`}
                src="/img/icons/bIcon1.svg"
                alt="icon"
              />
              <p
                className={`font-semibold mt-4 ${
                  shouldAnimate ? "text-white-animation" : "text-[#636466]"
                } ${
                  modal === 1 || modal2 === 1 ? "text-[28px]" : "text-[20px]"
                }`}
              >
                START
              </p>
              <p
                className={` text-center  ${
                  shouldAnimate ? "text-white-animation" : "text-[#A1A1A1]"
                } ${
                  modal === 1 || modal2 === 1
                    ? "text-[17px] w-[217px]"
                    : "text-[12px] w-[160px]"
                }`}
              >
                Цаашид юуг{" "}
                <span className="font-semibold">хэрэгжүүлж эхэлбэл </span>
                зохистой тухай зөвлөнө үү.
              </p>
            </div>
          </div>
          <div className="flex justify-start absolute left-[240px] top-[240px]">
            <div
              onClick={() => {
                setModal2(0);
                setModal(2);
              }}
              className={`border border-[#C6C6C6] rounded-full w-[249px] h-[249px] flex flex-col items-center justify-center pb-3 ${
                shouldAnimate2 ? "fill-animation-bottom-top-left" : ""
              } ${
                modal === 2 || modal2 === 2
                  ? "border-[#51A8FF] w-[275px] h-[275px] shadow-xl"
                  : "border-[#C6C6C6] w-[200px] h-[200px]"
              }`}
              style={{
                background: shouldAnimate2 ? "" : "white",
              }}
            >
              <img
                className={`${
                  modal === 2 || modal2 === 2
                    ? "w-[69px] h-[69px]"
                    : "w-[60px] h-[60px]"
                }`}
                src="/img/icons/bIcon2.svg"
                alt="icon"
              />
              <p
                className={`font-semibold mt-2 ${
                  shouldAnimate2 ? "text-white-animation" : "text-[#636466]"
                } ${
                  modal === 2 || modal2 === 2 ? "text-[28px]" : "text-[20px]"
                }`}
              >
                Continue
              </p>
              <p
                className={`text-center ${
                  shouldAnimate2 ? "text-white-animation" : "text-[#A1A1A1]"
                } ${
                  modal === 2 || modal2 === 2
                    ? "text-[16px] w-[217px]"
                    : "text-[12px] w-[160px]"
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
          <div className="flex justify-start absolute left-[50px] top-[440px]">
            <div
              onClick={() => {
                setModal2(0);
                setModal(3);
              }}
              className={`border border-[#C6C6C6] rounded-full w-[214px] h-[214px] flex flex-col items-center justify-center pb-3 ${
                shouldAnimate3 ? "fill-animation-bottom-top" : ""
              } ${
                modal === 3 || modal2 === 3
                  ? "border-[#51A8FF] w-[270px] h-[270px] shadow-xl"
                  : "border-[#C6C6C6] w-[200px] h-[200px]"
              }`}
              style={{
                background: shouldAnimate3 ? "" : "white",
              }}
            >
              <img
                className={`${
                  modal === 3 || modal2 === 3
                    ? "w-[69px] h-[69px]"
                    : "w-[60px] h-[60px]"
                }`}
                src="/img/icons/bIcon3.svg"
                alt="icon"
              />
              <p
                className={` font-semibold mt-2 ${
                  shouldAnimate3 ? "text-white-animation" : "text-[#636466]"
                } ${
                  modal === 3 || modal2 === 3 ? "text-[28px]" : "text-[20px]"
                }`}
              >
                STOP{" "}
              </p>
              <p
                className={`text-center ${
                  shouldAnimate3 ? "text-white-animation" : "text-[#A1A1A1]"
                } ${
                  modal === 3 || modal2 === 3
                    ? "text-[14px] w-[200px]"
                    : "text-[12px] w-[160px]"
                }`}
              >
                Цаашид юуг{" "}
                <span className="font-semibold">хийхээ зогсоовол </span>
                зохистой тухай зөвлөнө үү.
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-[#fff]  py-4 w-[340px]">
            <div className="px-2">
              {modal === 1 ? (
                <div>
                  <div className="flex items-center gap-2">
                    <img
                      className="h-[48px] w-[48px]"
                      src="/img/icons/bIcon1.svg"
                      alt="icon"
                    />
                    <p className="font-semibold">Start</p>
                  </div>
                  <p className="text-xs opacity-70 w-[325px] mt-2">
                    Таны өгсөн feedback тухайн ажилтны ажлын бүтээмж, сэтгэлзүйд
                    шууд нөлөөлөх боломжтой тул та эелдгээр зохистой,
                    хэрэгцээтэй зөвлөмжийг өгнө үү.
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
                            startCheck === 1
                              ? "border-blue-600"
                              : "border-gray-300"
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

                      <div
                        onClick={() => {
                          setStartCheck(2);
                        }}
                        className="flex items-start gap-2 mt-4"
                      >
                        <div
                          className={`h-4 w-4 rounded-full border-2 mt-2 ${
                            startCheck === 2
                              ? "border-blue-600"
                              : "border-gray-300"
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
                                startCheck === 2
                                  ? "text-[#0752DF]"
                                  : "text-[#A4A4A4]"
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
                            startCheck === 2
                              ? "border-blue-600"
                              : "border-gray-300"
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
                                startCheck === 2
                                  ? "text-[#0752DF]"
                                  : "text-[#A4A4A4]"
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
                            setModal(2);
                            setStartCheck(1);
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
                              startCheck === 1
                                ? "border-blue-600"
                                : "border-gray-300"
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
              ) : modal === 2 ? (
                <div>
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
                    урамшуулж цаашдаа энэхүү хандлагаа тогтоон барихад туслах
                    feedbaсk бичнэ үү.
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
                            startCheck === 1
                              ? "border-blue-600"
                              : "border-gray-300"
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

                      <div
                        onClick={() => {
                          setStartCheck(2);
                        }}
                        className="flex items-start gap-2 mt-4"
                      >
                        <div
                          className={`h-4 w-4 rounded-full border-2 mt-2 ${
                            startCheck === 2
                              ? "border-blue-600"
                              : "border-gray-300"
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
                                startCheck === 2
                                  ? "text-[#0752DF]"
                                  : "text-[#A4A4A4]"
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
                            startCheck === 2
                              ? "border-blue-600"
                              : "border-gray-300"
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
                                startCheck === 2
                                  ? "text-[#0752DF]"
                                  : "text-[#A4A4A4]"
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
                            setModal(3);
                            setStartCheck(1);
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
                              startCheck === 1
                                ? "border-blue-600"
                                : "border-gray-300"
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
              ) : modal === 3 ? (
                <div>
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
                    үйлдлийг зогсооход чиглэсэн feedback өгөх ба ингэснээрээ
                    ямар үр дүнд хүрж болохыг эелдгээр илэрхийлнэ үү.
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
                            startCheck === 1
                              ? "border-blue-600"
                              : "border-gray-300"
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
                            startCheck === 2
                              ? "border-blue-600"
                              : "border-gray-300"
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
                                startCheck === 2
                                  ? "text-[#0752DF]"
                                  : "text-[#A4A4A4]"
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
                            startCheck === 2
                              ? "border-blue-600"
                              : "border-gray-300"
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
                                startCheck === 2
                                  ? "text-[#0752DF]"
                                  : "text-[#A4A4A4]"
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
                        ""
                      ) : (
                        <div
                          onClick={() => {
                            setStartCheck(1);
                          }}
                          className="flex items-start gap-2 mt-4"
                        >
                          <div
                            className={`h-4 w-4 rounded-full border-2 mt-2 ${
                              startCheck === 1
                                ? "border-blue-600"
                                : "border-gray-300"
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
              ) : (
                ""
              )}
              {modal2 !== 0 && (
                <div>
                  <div>
                    <div>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-[300px] border px-2 py-2 rounded-xl border-[#F2F2F2]`}
                        >
                          <p className="mt-2 text-xs text-[#222] opacity-70">
                            <span className="text-[#7278ff] opacity-100">
                              Амар
                            </span>{" "}
                            та цаашид{" "}
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
                        Эдгээрээс сонгох болон өөрийн бодлоо бичгээр буулгах
                        боломжтой.
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
                                setContinue1(
                                  "итгэл даахуйц, найдвартай байдаг"
                                );
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
                    </div>
                  </div>

                  <div className="relative">
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #7277FF, #A55FFF)",
                      }}
                    ></div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={placed}
                      placeholder={
                        startOnGoing === 1
                          ? "үргэлжлүүлэх зүйл "
                          : "гарах үр дүн"
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
                      className="w-full px-4 py-2 border-none rounded-none"
                    />
                  </div>
                  <div className="flex justify-center">
                    {modal2 === 1 ? (
                      (start1 !== "хэрэгжүүлж эхлэх зүйл" &&
                        startOnGoing === 1) ||
                      (start2 !== "гарах үр дүн" && startOnGoing === 2) ? (
                        <button
                          onClick={handleContinue}
                          className="w-full mt-4 rounded-xl mx-3 py-3 text-white bg-[#222] text-xs"
                        >
                          үргэлжлүүлэх
                        </button>
                      ) : (
                        ""
                      )
                    ) : modal2 === 2 ? (
                      (continue1 !== "үргэлжлүүлэх зүйл" &&
                        startOnGoing === 1) ||
                      (continue2 !== "гарах үр дүн" && startOnGoing === 2) ? (
                        <button
                          onClick={handleContinue}
                          className="w-full mt-4 rounded-xl mx-3 py-3 text-white bg-[#222] text-xs"
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
                          className="w-full mt-4 rounded-xl mx-3 py-3 text-white bg-[#222] text-xs"
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
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center mx-6 mb-6 absolute bottom-20 right-20">
          {btn && (
            <button
              onClick={() => {
                navigate("/ph/sended");
              }}
              className="px-6  py-2  w-[150px]  text-sm text-white font-semibold bg-[#222] rounded-lg"
            >
              илгээх
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
