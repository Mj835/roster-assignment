export type EmploymentType = "FULL_TIME" | "CONTRACT";

export interface Video {
  title: string;
  url: string;
  thumbnail: string;
}

export interface Employer {
  id: string;
  name: string;
  jobTitle: string;
  duration: string;
  employmentType: EmploymentType;
  contribution: string;
  videos: Video[];
}

export interface BasicInfo {
  firstName: string;
  lastName: string;
  summary: string;
}

export interface PortfolioData {
  id: string;
  portfolioUrl: string;
  profileUrl: string;
  basicInfo: BasicInfo;
  employers: Employer[];
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioFormData {
  portfolioUrl: string;
}

export interface EmployerFormData {
  name: string;
  jobTitle: string;
  duration: string;
  employmentType: EmploymentType;
  contribution: string;
  videos: Video[];
}
