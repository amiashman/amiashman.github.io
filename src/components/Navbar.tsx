import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-name">
        Ami Ashman
      </Link>
      <div className="navbar-links">
        <Link to="/about" className="navbar-link">
          About
        </Link>
        <Link to="/cv" className="navbar-link">
          CV
        </Link>
        <Link to="/projects" className="navbar-link">
          Projects
        </Link>
        <Link to="/torah" className="navbar-link">
          Torah
        </Link>
        <Link to="/contact" className="navbar-link">
          Contact
        </Link>
      </div>
    </nav>
  );
}
