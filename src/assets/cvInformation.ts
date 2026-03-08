// This file contains the information that is used to populate the CV page.
// This allows the cv page to be updated without having to edit the CV.tsx file,
// which is more focused on the structure and styling of the page.

import type { CVProps } from "./types";

export const cvProps: CVProps = {
  exams: [
    {
      org: "SOA",
      name: "FM",
      date: "April 2026",
      passedOrSitting: "Sitting"
    },
    {
      org: "SOA",
      name: "P",
      date: "November 2025",
      passedOrSitting: "Passed"
    }
  ],
  education: [
    {
      school: "Northeastern University",
      graduationDate: "April 2026",
      expected: true,
      degree:
        "B.S. in Computer Science, Concentration in Artificial Intelligence",
      coursework: [
        "Mathematics of Data Models",
        "Algorithms for Data",
        "Machine Learning and Data Mining I and II",
        "Artificial Intelligence",
        "Advanced Writing in the Technical Profession"
      ]
    }
  ],
  experience: [
    {
      title: "QA Automation Engineer Co-op",
      company: "Northeastern University",
      startDate: "July 2025",
      endDate: "August 2025",
      responsibilities: [
        "Analyzed and validated data across multiple databases containing student information using SQL",
        "Assisted in developing 15,000+ line AI system to produce custom unit tests",
        "Applied technical and soft skills in a professional setting, including cross-functional projects"
      ]
    },
    {
      title: "Teaching Assistant for Discrete Structures",
      company: "Northeastern University",
      startDate: "September 2024",
      endDate: "June 2025",
      responsibilities: [
        "Explained complex math topics and problem-solving techniques to students via weekly office hours",
        "Improved student understanding by grading and providing feedback to 100+ weekly homework assignments",
        "Conducted 2 weekly recitation sessions with 35 students each to communicate course material and reinforce students’ grasp of course content"
      ]
    }
  ],
  skills: {
    languages: [
      "Python",
      "R",
      "SQL",
      "VBA",
      "JavaScript",
      "TypeScript",
      "Java",
      "C++",
      "HTML/CSS"
    ],
    areas: ["Machine Learning", "AI", "Probability", "Data Analysis"]
  },
  interests: {
    interests: [
      "Artificial Intelligence",
      "Piano",
      "Guitar",
      "Rock Climbing",
      "Reading"
    ]
  }
};
