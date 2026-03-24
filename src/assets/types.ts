type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

type MonthDate = `${Month} ${number}`;

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

export type Project = {
  id: string;
  title: string;
  component: React.ComponentType;
};

type DateString = `${Month} ${number}, ${number}`;

type Source = `${string}.md`;

export type DvarTorahProps = {
  id: number;
  title: string;
  date: DateString;
  source: Source;
};
