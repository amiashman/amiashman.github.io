import "./CV.css";
import Exam from "../components/cv/Exam";
import Education from "../components/cv/Education";
import Experience from "../components/cv/Experience";
import Skills from "../components/cv/Skills";
import Interests from "../components/cv/Interests";
import type { CVProps } from "../assets/types";

export default function CV({
  exams,
  education,
  experience,
  skills,
  interests
}: CVProps) {
  return (
    <main className="cv">
      <header className="cv-header">
        <h1>Ami Ashman</h1>
        <p className="cv-subtitle">
          Actuarial Science · Artificial Intelligence
        </p>
      </header>

      <section className="cv-section">
        <h2>Actuarial Exams</h2>
        {exams.map((exam, index) => (
          <Exam
            key={index}
            org={exam.org}
            name={exam.name}
            date={exam.date}
            passedOrSitting={exam.passedOrSitting}
          />
        ))}
      </section>

      <section className="cv-section">
        <h2>Education</h2>
        {education.map((edu, index) => (
          <Education
            key={index}
            school={edu.school}
            graduationDate={edu.graduationDate}
            expected={edu.expected}
            degree={edu.degree}
            coursework={edu.coursework}
          />
        ))}
      </section>

      <section className="cv-section">
        <h2>Experience</h2>
        {experience.map((exp, index) => (
          <Experience
            key={index}
            title={exp.title}
            company={exp.company}
            startDate={exp.startDate}
            endDate={exp.endDate}
            responsibilities={exp.responsibilities}
          />
        ))}
      </section>

      <section className="cv-section">
        <h2>Skills</h2>
        <Skills languages={skills.languages} areas={skills.areas} />
      </section>

      <section className="cv-section">
        <h2>Projects</h2>
        <p className="cv-link">
          See my <a href="/projects">projects page</a>.
        </p>
      </section>

      <section className="cv-section">
        <h2>Personal Interests</h2>
        <Interests interests={interests.interests} />
      </section>
    </main>
  );
}
