import type { EducationProps } from "../../assets/types";
import "../../pages/CV.css";

export default function Education({
  school,
  graduationDate,
  expected,
  degree,
  coursework
}: EducationProps) {
  return (
    <div className="cv-entry">
      <div className="cv-entry-header">
        <h3>{school}</h3>
        <span className="cv-date">
          {expected ? "Expected " : ""}
          {graduationDate}
        </span>
      </div>
      <p className="cv-detail">{degree}</p>
      <p className="cv-detail">Relevant coursework: {coursework.join(", ")}</p>
    </div>
  );
}
