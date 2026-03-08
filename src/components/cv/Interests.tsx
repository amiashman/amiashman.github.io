import type { InterestProps } from "../../assets/types";
import "../../pages/CV.css";

export default function Interests({ interests }: InterestProps) {
  return <p className="cv-link">{interests.join(", ")}</p>;
}
