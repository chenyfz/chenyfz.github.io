export type MastersCourseLink = {
  label: string;
  href: string;
  external?: boolean;
  localized?: boolean;
};

export type MastersCourseMediaItem = {
  type: 'image' | 'video';
  src: string;
  thumbnailSrc?: string;
  alt: string;
  caption?: string;
};

export type MastersCourse = {
  id: string;
  title: string;
  grade: string;
  description: string;
  practice?: string;
  links?: MastersCourseLink[];
  media?: MastersCourseMediaItem[];
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
  showMediaLabel: string;
  hideMediaLabel: string;
  closeViewerLabel: string;
  years: MastersCourseYear[];
  courses: MastersCourse[];
};
