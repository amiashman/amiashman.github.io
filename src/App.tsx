import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UnderConstruction from "./pages/UnderConstruction";
import CV from "./pages/CV";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import { cvProps } from "./assets/cvInformation";
import ProjectDispatch from "./pages/ProjectDispatch";
import FourZeroFour from "./pages/FourZeroFour";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<UnderConstruction />} />
        <Route path="/cv" element={<CV {...cvProps} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDispatch />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<FourZeroFour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
