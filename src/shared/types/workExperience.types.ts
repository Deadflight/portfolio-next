export interface IWorkExperience {
  id: number;
  position: string;
  company: IWorkExperienceCompany;
  businessPeriod: IWorkExperienceBusinessPeriod;
  businessImpact: string[];
  technologyStack: string[];
  professionalReference?: IWorkExperienceReference;
}

export interface IWorkExperienceCompany {
  name: string;
  industry: string;
  location: string;
}

export interface IWorkExperienceBusinessPeriod {
  start: string;
  end: string;
  duration: string;
  current: boolean;
}

export interface IWorkExperienceImpact {
  description: string;
  technologyStack: string[];
}

export interface IWorkExperienceReference {
  name: string;
  email?: string;
  phone?: string;
}
