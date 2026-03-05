import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <main className="home">
      <h1>Ami Ashman</h1>
      <p className="home-tagline">Computer Science & Actuarial Science</p>
      <p className="home-intro">
        Final-year CS student at Northeastern University with a focus in AI,
        pivoting into actuarial science. I like building things and solving
        problems.
      </p>
      <p className="home-intro">
        This website is a work in progress. Check back soon for updates!
      </p>
      <div className="home-links">
        <Link to="/projects" className="home-btn">
          View Projects
        </Link>
        <Link to="/contact" className="home-btn home-btn-outline">
          Get in Touch
        </Link>
      </div>
    </main>
  );
}
