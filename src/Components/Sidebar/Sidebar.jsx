import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBars } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { setProcessTypeList, setType } from 'store/Checklist/checklistSlice';
import routes from './SidebarData';
import SidebarMenu from './SidebarMenu';
const SideBar = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [state, setState] = useState('');
  const { t } = useTranslation();
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 0.5,
      },
    },
  };
  const redirect = (e) => {
    setState('');
    dispatch(setProcessTypeList(''));
    dispatch(setType(''));
  };

  return (
    <>
      <div className="main-container vh-100">
        <motion.div
          animate={{
            width: isOpen ? '220px' : '45px',
            transition: {
              duration: 0.5,
              type: 'spring',
              damping: 10,
            },
          }}
          //className={`sidebar `}
          className={`${pathname.startsWith('/print/') ? 'sidebar_no' : 'sidebar'}`}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  IM
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} className="pointer" />
            </div>
          </div>
          {isOpen && (
            <>
              {/* <div>
                <Multilanguage />
              </div> */}
            </>
          )}
          <section className="routes">
            {routes
              .filter((val) => {
                if (!state) {
                  return val;
                } else if (val.name.toLowerCase().includes(state.toLowerCase())) {
                  return val;
                }
              })
              .map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  );
                }

                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className="link"
                    activeClassName="active"
                    onClick={redirect}
                  >
                    {!isOpen && <div className="icon">{route.icon}</div>}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {t(route.name)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
          </section>
        </motion.div>

        <main
          // className={`w-100  ${
          //   pathname === '/' || pathname === '/manage-incident/:id'
          //     ? 'overflow-hidden'
          //     : 'overflow-hidden'
          // }`}
          className={`w-100 ${pathname.startsWith('/print/') ? 'overflow-hidden_no' : 'overflow-hidden'}`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default SideBar;
