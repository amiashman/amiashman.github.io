import { Link } from "react-router-dom";
import "./Projects.css";
import { PROJECTS } from "../assets/projectInformation";

export default function Projects() {
  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-subtitle">
          Some of the personal projects I've created
        </p>
      </div>

      <div className="projects-container">
        {PROJECTS.length === 0 ? (
          <div className="projects-empty">
            <p>No projects added yet. Check back soon!</p>
          </div>
        ) : (
          <div className="projects-grid">
            {PROJECTS.map((project) => (
              <Link
                to={`/project/${project.id}`}
                key={project.id}
                className="project-card-link"
              >
                <div key={project.id} className="project-card">
                  <div className="project-content">
                    <h2 className="project-title">{project.title}</h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
