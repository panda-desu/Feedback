import React, { useState } from "react";
import employe from "../../employee.json";
import { useNavigate } from "react-router-dom";

const EndingPage = () => {
  const employees = employe;
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.firstname.toLowerCase().includes(query.toLowerCase()) ||
      emp.lastname.toLowerCase().includes(query.toLowerCase())
  );

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
      <div className="h-screen flex items-center  justify-center">
        <div className="flex flex-col items-center pb-40">
          <p className="text-[36px] font-semibold mb-4">
            Feedback амжилттай илгээгдлээ.
          </p>
          <img src="./img/endPage.png" alt="img" />
          <button
            onClick={() => {
              navigate("/");
            }}
            className=" py-2 rounded-xl w-[200px] text-white bg-[#222] text-sm font-semibold mt-10"
          >
            Буцах
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndingPage;
