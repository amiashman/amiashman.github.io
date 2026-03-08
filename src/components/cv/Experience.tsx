import type { ExperienceProps } from "../../assets/types";
import "../../styles/cv.css";

export default function Experience({
  title,
  company,
  startDate,
  endDate,
  responsibilities
}: ExperienceProps) {
  return (
    <div className="cv-entry">
      <div className="cv-entry-header">
        <h3>{title}</h3>
        <span className="cv-date">
					{startDate.split(' ').pop() === endDate.split(' ').pop()
						? `${startDate.split(' ')[0]} - ${endDate}`
						: `${startDate} - ${endDate}`}
        </span>
      </div>
      <p className="cv-company">{company}</p>
      <ul className="cv-list">
        {responsibilities.map((resp, index) => (
          <li key={index}>{resp}</li>
        ))}
      </ul>
    </div>
  );
}
