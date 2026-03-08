import "./FourZeroFour.css";
import { Link } from "react-router-dom";

export default function FourZeroFour() {
  return (
    <main className="four-zero-four">
      <h1 className="four-zero-four-title">404</h1>
      <p className="four-zero-four-subtitle">Page not found</p>
      <p className="four-zero-four-description">
        The page you're looking for doesn't exist. Check the URL and try again.
      </p>
      <Link to="/" className="btn">
        Return Home
      </Link>
    </main>
  );
}
