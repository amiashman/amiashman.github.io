import type { ExamProps } from "../../assets/types";
import "../../pages/CV.css";

export default function Exam({ org, name, date, passedOrSitting }: ExamProps) {
  return (
    <div className="cv-entry-header">
      <h3>
        {org} Exam {name}
      </h3>
      <span className="cv-date">
        {passedOrSitting} {date}
      </span>
    </div>
  );
}
