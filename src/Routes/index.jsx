import { lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Routes as ReactRoutes, Route } from 'react-router-dom';
import { getLanguage } from 'Services/API/masterApi';
const Print = lazy(() => import('../Pages/Incident permit/componant/NewIncidentPermit/Print'));
const IncidentPermit = lazy(() => import('../Pages/Incident permit'));
const NewIncidentPermit = lazy(() =>
  import('../Pages/Incident permit/componant/NewIncidentPermit'),
);
const Incident_Permit = lazy(() =>
  import('../Pages/Incident permit/componant/NewIncidentPermit/Viewpermit'),
);
const PrintChecklist = lazy(() =>
  import('../Pages/Incident permit/componant/NewIncidentPermit/PrintChecklist'),
);

const CheckList = lazy(() => import('../Pages/CheckList'));
const NewCheckList = lazy(() => import('../Pages/CheckList/Components/NewChecklist'));
const ViewChecklist = lazy(() => import('../Pages/CheckList/Components/ViewChecklist'));
const Workflow = lazy(() => import('../Pages/WorkFlow'));
const NewWorkFlow = lazy(() => import('../Pages/WorkFlow/Components/NewWorkFlow'));
const Section = lazy(() => import('../Pages/Section'));
const NewSection = lazy(() => import('../Pages/Section/Components/NewSection'));
const SectionSequence = lazy(() => import('../Pages/SectionSequence'));
const Emailmanage = lazy(() => import('../Pages/EmailManagement/Emailmanage'));
const PlotLocation = lazy(() => import('../Pages/PlotLocation'));
const NewPlotlocation = lazy(() => import('../Pages/PlotLocation/Components/NewPlotlocation'));
const NewSectionSequence = lazy(() =>
  import('../Pages/SectionSequence/Components/NewSectionSequence'),
);
const Multilanguage = lazy(() => import('../Pages/Multilanguage/MultiLanguage'));
const Process = lazy(() => import('../Pages/Process'));
const Purging = lazy(() => import('../Pages/Purging'));

const TabManagment = lazy(() => import('../Pages/TabManagment'));
const NewProcess = lazy(() => import('../Pages/Process/Components/NewProcess'));
const NewTabManage = lazy(() => import('../Pages/TabManagment/Componant/NewTabManagment'));

const Routes = () => {
  const { t, i18n } = useTranslation();

  const getLanguageData = async () => {
    try {
      const res = await getLanguage();
      i18n.changeLanguage(res.data.responseObject);
    } catch (err) {
      console.log('error [getLanguageData]', err);
    }
  };

  useEffect(() => {
    getLanguageData();
  }, []);
  return (
     <ReactRoutes>
      {/* // <ReactRoutes basename={'/im_frontend'}> */}
      <Route path="/" element={<Navigate to="/manage-incident" />} />
      <Route  path="/manage-incident" element={<IncidentPermit />}></Route>
      <Route  path="/manage-incident" element={<NewIncidentPermit />}></Route>
      <Route path="/manage-incident/:id" element={<NewIncidentPermit />}></Route>
      <Route  path="/manage-incident/view-permit/:id" element={<Incident_Permit />} />
      <Route  path="/print/:id" element={<Print />}></Route>
      <Route  path="/print-checklist" element={<PrintChecklist />}></Route>

      {/* <ReactRoutes> */}
      {/* <Route  path="/" element={<WorkPermit />} />
      <Route  path="/manage-work-permit/:id" element={<NewWorkPermit />} />
      <Route  path="/view-permit/:id" element={<View_Permit />} />
      <Route
        
        path="/manage-work-permit/:workPermitId/view-forms/:permitId"
        element={<ViewForms />}
      /> */}
      <Route  path="/manage-checklist" element={<CheckList />} />
      <Route  path="/emailmanagement" element={<Emailmanage />} />
      <Route  path="/manage-checklist/:id" element={<NewCheckList />} />
      <Route  path="/view-checklist/:id" element={<ViewChecklist />} />
      <Route  path="/manage-workflow" element={<Workflow />} />
      <Route  path="/manage-workflow/:id" element={<NewWorkFlow />} />
      <Route  path="/manage-section" element={<Section />} />
      <Route  path="/manage-section/:id" element={<NewSection />} />
      <Route  path="/manage-section-sequence" element={<SectionSequence />} />
      <Route  path="/manage-section-sequence/:id" element={<NewSectionSequence />} />
      <Route path="/create_section/:id" element={<NewSection />} />
      <Route  path="/multi-language" element={<Multilanguage />} />
      <Route  path="/manage-plot-location" element={<PlotLocation />} />
      <Route  path="/manage-plot-location/:id" element={<NewPlotlocation />} />
      <Route  path="/manage-process" element={<Process />} />
      <Route  path="/manage-process/:id" element={<NewProcess />} />
      <Route  path="/manage-purging-data" element={<Purging />} />

      <Route  path="/manage-tab" element={<TabManagment />} />
      <Route  path="/manage-tab/:id" element={<NewTabManage />} />
    </ReactRoutes>
  );
};

export default Routes;
