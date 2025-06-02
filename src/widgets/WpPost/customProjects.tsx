import LabBoard from "@/pages/CustomProjects/LabBoard/LabBoard";
import Test from "@/pages/CustomProjects/LabBoard/test";
import { ReactNode } from "react";

const customProjects: Record<string, ReactNode> = {
  labboard: <LabBoard />,
  tests: <Test />,
};

export const getCustomProject = (title: string): ReactNode | null => {
//   const normalizedKey = title.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
  return customProjects[title] || null;
};
