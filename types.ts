
export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  year: string;
}

export interface CVData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  jobTitle: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
}

export enum Step {
  INPUT = 'INPUT',
  PREVIEW = 'PREVIEW'
}
