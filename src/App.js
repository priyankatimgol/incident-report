import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Incident_report from "./Incident_report";
import CreateNewchecklist from "./CreateNewchecklist";
import Incidentstatusreport from "./Incidentstatusreport";
import Work_permit_Main from "./Work_permit_Main";
import Editincidentreport from "./Editincidentreport"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/workPermitMain" element={<Work_permit_Main />}></Route>
        <Route path="/" element={<Incident_report />}></Route>
        <Route path="/Incidentstatusreport" element={<Incidentstatusreport />}></Route>
        <Route path="/Editincidentreport/:id" element={<Editincidentreport />}></Route>

        <Route
          path="/CreateNewchecklist"
          element={<CreateNewchecklist />}
        ></Route>
        <Route
          path="/createnewchecklist/:id"
          element={<createnewchecklist />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
