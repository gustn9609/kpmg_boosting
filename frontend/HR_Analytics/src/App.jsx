import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import React from 'react';
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import ApplicantList from "./pages/applicantList";
import UserInfo from "./pages/userInfo";
import Grouping from "./pages/grouping";
import Staff from "./pages/staff";
import StaffInfo from "./pages/staffInfo";


const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <Sidebar />
          <main className='content'>
            <Topbar />
            
            <Routes>
              <Route path="/applicant_list" element={<ApplicantList />} />
              <Route path="/user_info" element={<UserInfo />} />
              <Route path="/grouping" element={<Grouping />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/staff_info" element={<StaffInfo />} />
            </Routes>

          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App