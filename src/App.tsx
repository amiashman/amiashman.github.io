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
import Torah from "./pages/Torah";
import TorahDispatch from "./pages/TorahDispatch";
import Growth from "./pages/Growth";

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
        <Route path="/torah" element={<Torah />} />
        <Route path="/torah/:id" element={<TorahDispatch />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<FourZeroFour />} />
        <Route path="/growth" element={<Growth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
