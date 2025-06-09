import LabBoard from "@/pages/CustomProjects/LabBoard/LabBoard";
import { ReactNode } from "react";

const customProjects: Record<string, ReactNode> = {
  labboard: <LabBoard />,
};

export const getCustomProject = (categories: string[]): ReactNode | null => {
  for (const category of categories) {
    const key = category;
    if (customProjects[key]) {
      return customProjects[key];
    }
  }
  return null;
};
