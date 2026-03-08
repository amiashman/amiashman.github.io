import type { InterestProps } from "../../assets/types";
import "../../styles/cv.css";

export default function Interests({ interests }: InterestProps) {
  return <p className="cv-link">{interests.join(", ")}</p>;
}
