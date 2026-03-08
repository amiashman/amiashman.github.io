import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UnderConstruction from "./pages/UnderConstruction";
import CV from "./pages/CV";
import Contact from "./pages/Contact";
import { cvProps } from "./assets/cvInformation";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<UnderConstruction />} />
        <Route path="/cv" element={<CV {...cvProps} />} />
        <Route path="/projects" element={<UnderConstruction />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
