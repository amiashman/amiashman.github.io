import { Link } from "react-router-dom";
import type { PageMapping } from "../assets/types";

export default function Navbar({ pages }: { pages: PageMapping }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-name">
        Ami Ashman
      </Link>
      <div className="navbar-links">
        {Object.keys(pages).map((page) => (
          <Link
            key={page.toLowerCase()}
            to={`/${page.toLowerCase()}`}
            className="navbar-link"
          >
            {page}
          </Link>
        ))}
      </div>
    </nav>
  );
}
