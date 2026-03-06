import "../styles/cv.css";

export default function CV() {
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
        <div className="cv-entry">
          <div className="cv-entry-header">
            <h3>SOA Exam FM</h3>
            <span className="cv-date">Sitting April 2026</span>
          </div>
          <div className="cv-entry-header">
            <h3>SOA Exam P</h3>
            <span className="cv-date">Passed November 2025</span>
          </div>
        </div>
      </section>

      <section className="cv-section">
        <h2>Education</h2>
        <div className="cv-entry">
          <div className="cv-entry-header">
            <h3>Northeastern University</h3>
            <span className="cv-date">Expected April 2026</span>
          </div>
          <p className="cv-detail">
            B.S. in Computer Science, Concentration in Artificial Intelligence
          </p>
          <p className="cv-detail">
            Relevant coursework: Mathematics of Data Models, Algorithms for
            Data, Machine Learning and Data Mining I and II, Artificial
            Intelligence, Advanced Writing in the Technical Profession
          </p>
        </div>
      </section>

      <section className="cv-section">
        <h2>Experience</h2>

        <div className="cv-entry">
          <div className="cv-entry-header">
            <h3>QA Automation Engineer Co-op</h3>
            <span className="cv-date">July - August 2025</span>
          </div>
          <p className="cv-company">Northeastern University</p>
          <ul className="cv-list">
            <li>
              Analyzed and validated data across multiple databases containing
              student information using SQL
            </li>
            <li>
              Assisted in developing 15,000+ line AI system to produce custom
              unit tests
            </li>
            <li>
              Applied technical and soft skills in a professional setting,
              including cross-functional projects
            </li>
          </ul>
        </div>

        <div className="cv-entry">
          <div className="cv-entry-header">
            <h3>Teaching Assistant for Discrete Structures</h3>
            <span className="cv-date">September - June 2025</span>
          </div>
          <p className="cv-company">Northeastern University</p>
          <ul className="cv-list">
            <li>
              Explained complex math topics and problem-solving techniques to
              students via weekly office hours
            </li>
            <li>
              Improved student understanding by grading and providing feedback
              to 100+ weekly homework assignments
            </li>
            <li>
              Conducted 2 weekly recitation sessions with 35 students each to
              communicate course material and reinforce students’ grasp of
              course content
            </li>
          </ul>
        </div>
      </section>

      <section className="cv-section">
        <h2>Skills</h2>
        <div className="cv-skills">
          <div className="cv-skill-group">
            <h3>Languages</h3>
            <p>
              Python, R, SQL, VBA, JavaScript, TypeScript, Java, C++, HTML/CSS
            </p>
          </div>
          <div className="cv-skill-group">
            <h3>Areas</h3>
            <p>ActMachine Learning, AI, Probability, Data Analysis</p>
          </div>
        </div>
      </section>

      <section className="cv-section">
        <h2>Projects</h2>
        <p className="cv-link">
          See my <a href="/projects">projects page</a>.
        </p>
      </section>

      <section className="cv-section">
        <h2>Personal Interests</h2>
        <p className="cv-link">
          Artificial Intelligence, Piano, Guitar, Rock Climbing, Reading
        </p>
      </section>
    </main>
  );
}
