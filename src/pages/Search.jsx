import React, { useState } from "react";
import employe from "../employee.json";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const employees = employe;
  const departments = [...new Set(employees.map((emp) => emp.department))];
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("Тавтай морилно уу");
  const [selectedDepartment, setSelectedDepartment] = useState(""); // State for selected department
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDepartmentClick = (dept) => {
    setSelectedDepartment(dept === selectedDepartment ? "" : dept); // Toggle department selection
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.firstname.toLowerCase().includes(query.toLowerCase()) ||
      emp.lastname.toLowerCase().includes(query.toLowerCase())
  );

  const departmentEmployees = selectedDepartment
    ? employees.filter((emp) => emp.department === selectedDepartment)
    : employees;

  const handleFocus = () => {
    setTitle("Ажлын хамтрагчдаа үнэлгээ өгцгөөе!");
    setFocused(true);
  };

  const handleBlur = () => {
    setTitle("Тавтай морилно уу");
    setTimeout(() => setFocused(false), 100);
  };

  return (
    <div>
      <div className="h-screen items-center justify-center relative hidden sm:hidden md:flex">
        {console.log(employees)}
        {console.log(departments)}
        <img
          className="blur-xs absolute w-screen"
          src="./img/search.svg"
          alt="bg"
        />
        <div className="w-screen h-screen bg-[#000] bg-opacity-35 z-10 absolute" />
        <div className="z-20">
          <p className="text-[36px] text-[#fff] font-bold text-center">
            Тавтай морилно уу
          </p>
          <p className="text-[24px] text-[#fff] font-semibold text-center">
            Ажлын хамтрагчдаа үнэлгээ өгцгөөе!
          </p>
          <div className="relative mt-6">
            <input
              className="bg-[#fff] py-2 ps-12 rounded-full w-[427px]"
              placeholder="Ажилтны нэрийг бичнэ үү."
              type="text"
              value={query}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 100)}
            />
            <div className="absolute top-10">
              {query && focused && (
                <div className="bg-white w-[350px] rounded-b-xl ms-12 px-4">
                  <ul className="employee-list w-full">
                    {filteredEmployees.map((emp) => (
                      <li
                        className="text-xs border-b py-2 px-6 border-[#D4D4D4]   flex items-center gap-2"
                        key={emp.id}
                        onClick={() => {
                          navigate(`/employee/${emp.id}`);
                        }}
                      >
                        <img src="./img/pfp.svg" alt="img" />
                        {emp.firstname} {emp.lastname}
                      </li>
                    ))}
                  </ul>
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
      </div>
      <div className="block sm:block md:hidden">
        <div>
          <div className="bg-[#51A8FF] w-full">
            <p
              className={`text-[#fff] font-semibold pt-8 ps-6 ${
                title === "Тавтай морилно уу"
                  ? "mb-4 text-[32px] "
                  : "mb-0 text-[18px] "
              }`}
            >
              {title}
            </p>

            <div className="flex justify-center pb-3">
              <div className="relative py-6">
                <input
                  className="bg-[#fff] py-2 ps-12 rounded-full w-[335px] relative"
                  placeholder="Ажилтны нэрийг бичнэ үү."
                  type="text"
                  value={query}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <div className="absolute top-14">
                  {query && focused && (
                    <div className="bg-white w-[320px] ms-2 rounded-b-xl px-4">
                      <ul className="employee-list w-full">
                        {filteredEmployees.map((emp) => (
                          <li
                            className="text-xs border-b py-2 px-6 border-[#D4D4D4]   flex items-center gap-2"
                            key={emp.id}
                            onClick={() => {
                              navigate(`/employee/${emp.id}`);
                            }}
                          >
                            <img src="./img/pfp.svg" alt="img" />
                            {emp.firstname} {emp.lastname}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <svg
                  className="absolute left-6 inset-y-9 size-4"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7578 11.2539H11.9678L11.6878 10.9839C12.6678 9.84391 13.2578 8.36391 13.2578 6.75391C13.2578 3.16391 10.3478 0.253906 6.75781 0.253906C3.16781 0.253906 0.257812 3.16391 0.257812 6.75391C0.257812 10.3439 3.16781 13.2539 6.75781 13.2539C8.36781 13.2539 9.84781 12.6639 10.9878 11.6839L11.2578 11.9639V12.7539L16.2578 17.7439L17.7478 16.2539L12.7578 11.2539ZM6.75781 11.2539C4.26781 11.2539 2.25781 9.24391 2.25781 6.75391C2.25781 4.26391 4.26781 2.25391 6.75781 2.25391C9.24781 2.25391 11.2578 4.26391 11.2578 6.75391C11.2578 9.24391 9.24781 11.2539 6.75781 11.2539Z"
                    fill="#222222"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-12 px-4">
            <p className="text-[20px]">Хэлтсүүд</p>
            <div className="mt-4">
              <div className="flex items-center gap-6 px-4 py-2 overflow-x-auto ">
                {departments.map((dept) => (
                  <div
                    key={dept}
                    onClick={() => handleDepartmentClick(dept)}
                    className="rounded-full shadow flex items-center justify-center px-2 py-3"
                  >
                    <p className="text-sm">{dept}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 px-4">
                {departmentEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    onClick={() => {
                      navigate(`/employee/${emp.id}`);
                    }}
                    className="flex items-start gap-5 w-full shadow-lg rounded-xl mb-6"
                  >
                    <div className="w-[97px] h-[94px] bg-[#ccc] rounded-xl" />
                    <div>
                      <p>
                        {emp.firstname} {emp.lastname}
                      </p>
                      <p className="text-[#8e9196] text-xs">
                        {emp.position}, {emp.department}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
