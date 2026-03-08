import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { getProjectById } from "../assets/projectInformation";
import FourZeroFour from "./FourZeroFour";

export default function ProjectDispatch() {
  const { id } = useParams();

  const project = useMemo(() => {
    return getProjectById(id || "");
  }, [id]);

  const Component = project?.component;
  return <div>{Component ? <Component /> : <FourZeroFour />}</div>;
}
