export interface Subject {
  name: string;
  notesLink?: string;
  papersLink?: string;
}

export interface Semester {
  id: number;
  title: string;
  subjects: Subject[];
  universityPaperLink?: string;
}

export interface Practical {
  name: string;
  link: string;
}

export interface Contributor {
  name: string;
  github: string;
  linkedin: string;
}