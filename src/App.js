import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import NotFound from "./NotFound";
import "./index.css";

import PhEndingPage from "./pages/mobile/PhEndingPage";
import EmpProfileSection from "./pages/EmpProfileSection";
import EndingPage from "./pages/Desktop/EndingPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/employee/:id" element={<EmpProfileSection />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/ph/sended" element={<PhEndingPage />} />
          <Route path="/sended" element={<EndingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
