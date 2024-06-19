import React from "react";
import PhFeedback from "./mobile/PhFeedback";
import Feedback from "./Desktop/Feedback";

const EmpProfileSection = () => {
  return (
    <div>
      <div className="hidden sm:hidden md:block">
        <Feedback />
      </div>
      <div className="block sm:block md:hidden">
        <PhFeedback />
      </div>
    </div>
  );
};

export default EmpProfileSection;
