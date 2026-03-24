import { Link } from "react-router-dom";
import CurrentLearning from "../components/torah/CurrentLearning";
import { getAllDivreiTorah } from "../assets/divreitorah";
import "./Torah.css";

export default function Torah() {
  const divreiTorah = getAllDivreiTorah();

  return (
    <div className="torah-page">
      <div className="torah-main">
        <header className="torah-header">
          <h1>Divrei Torah</h1>
          <p>Comments and ideas on the weekly Torah portion</p>
        </header>

        {divreiTorah.length === 0 ? (
          <div className="torah-empty">
            <p>No divrei Torah published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="torah-grid">
            {divreiTorah.map((dvar) => (
              <Link
                key={dvar.id}
                to={`/torah/${dvar.id}`}
                className="torah-card-link"
              >
                <article className="torah-card">
                  <h2>{dvar.title}</h2>
                  <time dateTime={dvar.date}>{dvar.date}</time>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>

      <aside className="torah-sidebar">
        <CurrentLearning />
      </aside>
    </div>
  );
}
