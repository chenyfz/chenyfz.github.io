export type MastersCourseLink = {
  label: string;
  href: string;
  external?: boolean;
  localized?: boolean;
};

export type MastersCourse = {
  id: string;
  title: string;
  grade: string;
  description: string;
  links?: MastersCourseLink[];
};

export type MastersCoursePeriod = {
  label: string;
  courseIds: string[];
};

export type MastersCourseYear = {
  title: string;
  periods: MastersCoursePeriod[];
};

export type MastersCoursesPageCopy = {
  meta: {
    title: string;
    description: string;
  };
  title: string;
  subtitle: string;
  tocTitle: string;
  detailsTitle: string;
  gradePrefix: string;
  gradeSuffix: string;
  years: MastersCourseYear[];
  courses: MastersCourse[];
};
