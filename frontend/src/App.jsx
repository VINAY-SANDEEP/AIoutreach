import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Contacts from "./pages/Contacts";
import Responses from "./pages/Responses";
import Reports from "./pages/Reports";

import Sidebar from "./components/Sidebar";
import History from "./pages/History";
// import Navbar from "./components/NavBar";
function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1">
            {/* <NavBar/> */}
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/responses" element={<Responses />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;