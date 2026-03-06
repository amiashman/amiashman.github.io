import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UnderConstruction from "./pages/UnderConstruction";
import CV from "./pages/CV";
import type { PageMapping } from "./assets/types";
import Contact from "./pages/Contact";

function App() {
  const pages: PageMapping = {
    About: UnderConstruction,
    CV: CV,
    Projects: UnderConstruction,
    Contact: Contact
  };

  return (
    <BrowserRouter>
      <Navbar pages={pages} />
      <Routes>
        <Route path="/" element={<Home />} />
        {Object.entries(pages).map(([path, Component]) => (
          <Route
            key={path.toLowerCase()}
            path={`/${path.toLowerCase()}`}
            element={<Component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
