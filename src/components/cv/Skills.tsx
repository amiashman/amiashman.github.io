import type { SkillProps } from "../../assets/types";
import "../../styles/cv.css";

export default function Skills({ languages, areas }: SkillProps) {
  return (
    <div className="cv-skills">
      <div className="cv-skill-group">
        <h3>Languages</h3>
        <p>{languages.join(", ")}</p>
      </div>
      <div className="cv-skill-group">
        <h3>Areas</h3>
        <p>{areas.join(", ")}</p>
      </div>
    </div>
  );
}
