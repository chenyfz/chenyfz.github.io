export interface LinkItem {
  textKey: string
  href?: string
  to?: string
  target?: string
}

export interface Course {
  id: string
  grade: string
  links?: LinkItem[]
}

export interface Period {
  label: string
  courses: string[]
}

export interface YearSection {
  yearKey: string
  periods: Period[]
}

export type { Course, LinkItem, Period }

// Table of contents structure: Year -> Period -> Courses
export const coursePeriods: YearSection[] = [
  {
    yearKey: 'firstYearTitle',
    periods: [
      {
        label: 'Period 1',
        courses: ['mcsp', 'mlhvl'],
      },
      {
        label: 'Period 2',
        courses: ['mvis', 'mqlm'],
      },
      {
        label: 'Period 3',
        courses: ['miti', 'mmmi'],
      },
      {
        label: 'Period 4',
        courses: ['mqnm', 'mmob'],
      },
    ],
  },
  {
    yearKey: 'secondYearTitle',
    periods: [
      {
        label: 'Period 5',
        courses: ['mdm'],
      },
      {
        label: 'Period 6',
        courses: ['mcm'],
      },
      {
        label: 'Remaining',
        courses: ['graduationThesis'],
      },
    ],
  },
]

// Course details data
export const coursesData: Course[] = [
  {
    id: 'mcsp',
    grade: '7.4',
  },
  {
    id: 'mlhvl',
    grade: '8.3',
  },
  {
    id: 'mvis',
    grade: '9.0',
    links: [
      { textKey: 'linkText', href: 'https://superfashion.walzen.org/' },
    ],
  },
  {
    id: 'mqlm',
    grade: '7.8',
    links: [
      { textKey: 'linkText', href: '/Group_30_Final_Paper.pdf' },
    ],
  },
  {
    id: 'miti',
    grade: '8.3',
    links: [
      { textKey: 'linkText', to: '/snow-globe' },
    ],
  },
  {
    id: 'mmmi',
    grade: '8.0',
    links: [
      { textKey: 'linkText', to: '/multimodal-interaction' },
    ],
  },
  {
    id: 'mqnm',
    grade: '9.4',
    links: [
      { textKey: 'linkText', href: '/infomqnm-report.pdf' },
    ],
  },
  {
    id: 'mmob',
    grade: '7.9',
  },
  {
    id: 'mdm',
    grade: '8.5',
    links: [
      { textKey: 'linkA1', href: '/DM-A1-Yangfan-Yilun-Reem.zip' },
      { textKey: 'linkA2', href: '/INFOMDM2024-A2-Yangfan-Yilun-Reem.pdf' },
    ],
  },
  {
    id: 'mcm',
    grade: '8.3',
  },
  {
    id: 'graduationThesis',
    grade: '8.7',
    links: [
      { textKey: 'linkText', to: '/graduation-thesis' },
    ],
  },
]
