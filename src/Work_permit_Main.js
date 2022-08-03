import React from "react";
import { useNavigate } from "react-router-dom";

const Work_permit_Main = () => {
  const navigate = useNavigate();
  const handleGotopage = () => {
    navigate("/New_workPermit");
  };
  return (
    <div>
      <br></br>
      <button>incident report</button>
      <br></br>
      <button onClick={handleGotopage}>permit to work</button>
    </div>
  );
};

export default Work_permit_Main;
