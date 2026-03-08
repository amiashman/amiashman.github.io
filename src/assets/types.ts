type MonthDate =
  `${"January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December"} ${number}`;

export type ExamProps = {
  org: string;
  name: string;
  date: MonthDate;
  passedOrSitting: "Passed" | "Sitting";
};

export type EducationProps = {
  school: string;
  graduationDate: MonthDate;
  expected: boolean;
  degree: string;
  coursework: string[];
};

export type ExperienceProps = {
  title: string;
  company: string;
  startDate: MonthDate;
  endDate: MonthDate;
  responsibilities: string[];
};

export type SkillProps = {
  languages: string[];
  areas: string[];
};

export type InterestProps = {
  interests: string[];
};

export type CVProps = {
  exams: ExamProps[];
  education: EducationProps[];
  experience: ExperienceProps[];
  skills: SkillProps;
  interests: InterestProps;
};
