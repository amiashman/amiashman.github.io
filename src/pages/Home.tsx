import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <main className="home">
      <h1>Ami Ashman</h1>
      <p className="home-tagline">
        Actuarial Science · Artificial Intelligence
      </p>
      <p className="home-intro">
        Final-year computer science student at Northeastern University with a
        focus on AI, pursuing a career in actuarial science.
      </p>
      <p className="home-intro">
        This website is a work in progress. Check back soon for updates!
      </p>
      <div className="home-links">
        <Link to="/projects" className="btn">
          View Projects
        </Link>
        <Link to="/contact" className="btn btn-outline">
          Get in Touch
        </Link>
      </div>
      <p className="home-quote">
        "There is nothing noble in being superior to your fellow man; true
        nobility is being superior to your former self." - Ernest Hemingway (
        <Link to="/growth" className="home-quote-link">
          Learn More
        </Link>
        )
      </p>
    </main>
  );
}
