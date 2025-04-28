import '@progress/kendo-theme-default/dist/default-ocean-blue.scss';
import i18n from 'i18next';
import { lazy, useEffect, useState } from 'react';
import { Formio } from 'react-formio';
import { initReactI18next } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Routes from './Routes';
// Translations
import { ApiGetNoAuth } from 'Services/API/ApiData';
import { getUserRole } from 'Services/API/masterApi';
import en from 'locales/en/translation.json';
import id from 'locales/id/translation.json';

const SideBar = lazy(() => import('Components/Sidebar/Sidebar'));
const BaseUrl = localStorage.getItem('BaseUrl');
Formio.setProjectUrl(BaseUrl + '/api');

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: en,
      },
      id: {
        translation: id,
      },
    },
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

function App() {
  const location = useLocation();
  const [userRole, setUserRole] = useState([]);

  const getUserRoleData = async () => {
    try {
      await getUserRole()
        .then((res) => {
          setUserRole(res.data?.responseObject);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  };
  const getRole = async () => {
    let res = await ApiGetNoAuth(`/Master/roles`);
    localStorage.setItem('setRole', JSON.stringify(res.data?.responseObject));
  };
  useEffect(() => {
    getUserRoleData();
    getRole()
  }, []);

  useEffect(() => {
    //fetch(`${window.location.origin + '/'}im_frontend/url.json`)
  fetch(`${window.location.origin + '/'}url.json`)
      .then((res) => res.json())
      .then(
        (result) => {
          localStorage.setItem('BaseUrl', result.BaseURL);
        },
        (error) => {},
      );
  }, []);
  const userRoleValue = userRole?.includes('IM-Admin');
  return (
    <>
      {/* <SideBar> */}
      {/* <Routes /> */}
      {/* </SideBar> */}
      <ToastContainer hideProgressBar />

      {userRoleValue === true ? (
        location.pathname === '/print' || location.pathname === '/print-checklist' ? (
          <Routes />
        ) : (
          <SideBar>
            <Routes />
          </SideBar>
        )
      ) : (
        <Routes userRoleValue={userRoleValue} />
      )}
    </>
  );
}

export default App;
