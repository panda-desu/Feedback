import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import NotFound from "./NotFound";
import "./index.css";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/employee/:id" element={<Feedback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
