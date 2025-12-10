import { Semester, Practical, Contributor } from './types';

export const HERO_IMAGE = "https://github.com/Dahire100/CS-Notes/blob/main/kkw.jpeg?raw=true";
export const REPO_LINK = "https://github.com/Dahire100/CS-Notes";
export const UPLOAD_LINK = "https://drive.google.com/drive/folders/1jIvm8xAytDFvtrgA-MFiuz47Q8vcfaGR";

export const CONTRIBUTOR: Contributor = {
  name: "Devendra Ahire",
  github: "https://github.com/Dahire100",
  linkedin: "https://www.linkedin.com/in/devendra-ahire"
};

export const PRACTICALS: Practical[] = [
  { name: "C Programming", link: "https://drive.google.com/drive/folders/1Xg2831ZVZTt9YBmSOUao8jwGgeJ9jwue?usp=sharing" },
  { name: "C++ Programming", link: "https://drive.google.com/drive/folders/14jlFmRZLyiHywa6--PhE8Jf5WIoXC53K?usp=sharing" },
  { name: "Python Programming", link: "https://drive.google.com/drive/folders/12QhlUvB0Y7J4MfuVhQJ8zJLF45Q8KTvV?usp=drive_link" },
  { name: "Computer Graphics", link: "https://drive.google.com/drive/folders/17DZROFJoJlc1ROqHZWocOsYti9fEMh2w?usp=drive_link" },
  { name: "Fundamentals of Data Structures", link: "https://drive.google.com/drive/folders/1pphI1BmzTTK44dSl3ZpJRQCZny0UymGL?usp=drive_link" },
  { name: "Programming Paradigms and Java", link: "https://drive.google.com/drive/folders/1y8iQWM7WKg0-TQsaGiy1KxBWFofgbXq6?usp=drive_link" },
  { name: "Advanced Data Structures", link: "https://drive.google.com/drive/folders/1aKy5jl0MSNXkZ2v9z98yqEg6ueGzzMRB?usp=drive_link" },
  { name: "Operating Systems", link: "https://drive.google.com/drive/folders/1ROIySnao1KnFTfugKuJtllDpvc8da5aD?usp=drive_link" },
  { name: "Computer Network", link: "https://drive.google.com/drive/folders/1f60sVYWAEA2dWHxBlh40wi2wj_4_rppQ?usp=drive_link" },
  { name: "DBMS", link: "https://drive.google.com/drive/folders/1_KLAinvp9FR_5yjVR0kvMllaEo-iAvBD?usp=drive_link" },
  { name: "Design & Analysis of Algorithms", link: "https://drive.google.com/drive/folders/1_JFoi9KcdfBMNQOstBq0WLLpYrAfu5bH?usp=drive_link" },
  { name: "DSBD and Game Development", link: "https://drive.google.com/drive/folders/1WikC0BVYaZsHDnQSYcecby-xiyQeerzG" },
  { name: "CC and Gen AI", link: "https://drive.google.com/drive/folders/1Wq8GOjQmubcouGTFZrBxfpjzaQXX0mpi" },
  { name: "Mobile App Development", link: "https://drive.google.com/drive/folders/1n_pCLgZ7V6um_SOhMM5l5SRujk3CKJAt" },
  { name: "UI/UX Design", link: "https://drive.google.com/drive/folders/1VlQ9UCbKXGGAakrqeAL-7vBF6o6K2Jgp" },
  { name: "AR/VR", link: "https://drive.google.com/drive/folders/1jwpsTvhhHnF2j-fKWVZCGZuo2FqvqkgO" }
];

export const SEMESTERS: Semester[] = [
  {
    id: 1,
    title: "Semester 1",
    universityPaperLink: "https://search.app?link=https%3A%2F%2Fsppuquestionpapers.com%2Fbe%2Ffirst-year-fe-engineering%2Fsemester-1&utm_campaign=aga&utm_source=agsadl1%2Csh%2Fx%2Fgs%2Fm2%2F4",
    subjects: [
      { name: "Applied Mathematics – I", notesLink: "https://drive.google.com/drive/folders/1TfoDS1l4Mpnmc9MjUaNEhbgAuqYw-OpZ?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MFFdnXDSl2D9_Gz5qpd97jDEJgrOI43W?usp=drive_link" },
      { name: "Basics of Elec. & Electrical Eng.", notesLink: "https://drive.google.com/drive/folders/1HHSfFGXAgpBOkDfwqlfqQhpHVy8DKF9K?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MCYRox9-hCGdxgtlQ7OpLkvjBrYZXKE6?usp=drive_link" },
      { name: "Applied Chemistry", notesLink: "https://drive.google.com/drive/folders/1O0iwUwRY3u18DA2-xhLzIE1LdSQ76Y71?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MBwY54FVnt3KpRjznExMPyIfZZLgM4g-?usp=drive_link" },
      { name: "Comp. Thinking & C Programming", notesLink: "https://drive.google.com/drive/folders/1PdIWiVC4K5SjiaWR-ftPw7GK3DEwiRef?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MBmld-6Pafd4U5S-l9u4N7oF0tu7FfAh?usp=drive_link" }
    ]
  },
  {
    id: 2,
    title: "Semester 2",
    universityPaperLink: "https://sppuquestionpapers.com/be/first-year-fe-engineering/semester-2",
    subjects: [
      { name: "Applied Mathematics – II", notesLink: "https://drive.google.com/drive/folders/1oAk0rIdKc4KECkZzd8OlNi7krJbwmrGf?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MPG4hvcnr-B2tYw7FhTcVhISS9OXt4A8?usp=drive_link" },
      { name: "Applied and Modern Physics", notesLink: "https://drive.google.com/drive/folders/19yHYEFsvxTLlSLSh3LLsdaad6Lx1R8fs?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MRDho7eMXtQ1qzCRaXVKBP0fqWKLu78G?usp=drive_link" },
      { name: "Fundamentals of Electronics Eng.", notesLink: "https://drive.google.com/drive/folders/1RzKeAGrGRMyibBXPtwMP7rDvv5noIP-U?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MOd2UNIFrtdylJBB4DBxZwqxyNldoKjZ?usp=drive_link" },
      { name: "Programming in C++", notesLink: "https://drive.google.com/drive/folders/1NvLFdzWmhcAn51SckwFxE_-imkM4MSJI?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MJwBEt4fQLsb0JQ-HcVQ1Kf7vSZtapnL?usp=drive_link" },
      { name: "Engineering Drawing", notesLink: "https://drive.google.com/drive/folders/1ElOTFEOnxdsvsrUk7giy6uJgtLWJB6sm?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MNCwW3ow9c1XqLt20RElTri6zUC_Ddaq?usp=drive_link" }
    ]
  },
  {
    id: 3,
    title: "Semester 3",
    universityPaperLink: "https://sppuquestionpapers.com/be/computer-engineering/semester-3",
    subjects: [
      { name: "Fundamentals of Data Structures", notesLink: "https://drive.google.com/drive/folders/1uIDSQSoDbPgXL07HEK89I-D5B9X04mrb?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MZ7oRLVkmuzXU6FXKVlM7Wcaum0_VHc7?usp=drive_link" },
      { name: "Computer Graphics", notesLink: "https://drive.google.com/drive/folders/1uAInY12-9Qk0Wmd4YS9IJcuc56vKw35d?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MRjtafDCPEMO0oYzGb50MsizVyi7M31u?usp=drive_link" },
      { name: "Discrete Mathematics", notesLink: "https://drive.google.com/drive/folders/1nDdwKO7eSXmMi7twRSdH-f6v5Jt2ISYH?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MXKL7tM9WXIrMGzaOBVudxE3zrSolYfX?usp=drive_link" },
      { name: "Digital Electronics & Logic Design", notesLink: "https://drive.google.com/drive/folders/1CPRiduvdXMlvX24DMib6OlQgcWQw6Yf3?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MSgD3lxDw9qQJm3Uii1unmfAB4G9vr5z?usp=drive_link" },
      { name: "Prog. Paradigms & Java", notesLink: "https://drive.google.com/drive/folders/1XGkq_u61vi-Z-mzWj-pxES9uOWJ9Rn35?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1M_K8-9VmloVq1R78fcpgGAMX1KvG_Xmm?usp=drive_link" }
    ]
  },
  {
    id: 4,
    title: "Semester 4",
    universityPaperLink: "https://sppuquestionpapers.com/be/information-technology-engineering/semester-4",
    subjects: [
      { name: "Applied Mathematics – III", notesLink: "https://drive.google.com/drive/folders/1R3P2YS8eQ_z7wxW3Wkc26B3ZNfhasSca?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1Md7Vm-gu8ZbLudloS4jTiKZ52VRjZABK?usp=drive_link" },
      { name: "Advanced Data Structures", notesLink: "https://drive.google.com/drive/folders/1PA3UHL5YV7p12SjwqIzVpKrrOHZjV9PU?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1rCdw5fGAgnaagv2UV6OfthHE2_Y-YeIm?usp=drive_link" },
      { name: "Operating Systems", notesLink: "https://drive.google.com/drive/folders/1jQXqKm6qiito6aD38yFRN8USwT4fnrUa?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MefPSNMM0rh_nuJf-av_kELYUBXUX0kr?usp=drive_link" },
      { name: "Computer Networks", notesLink: "https://drive.google.com/drive/folders/1UO3N8Qgj2wvTy3Le07wgRNYvSkIe8MMT?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MbxHjUXLSj5QZFtXJ0dUaT5kbP_3fJz_?usp=drive_link" },
      { name: "Software Eng. & Project Mgmt", notesLink: "https://drive.google.com/drive/folders/1Dn3vRm0uMOt5Ydt9PPNF_a31VEWFM7jR?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1Mf-692PeUZ0MtHvujtrPF8dr_nHjgB0q?usp=drive_link" }
    ]
  },
  {
    id: 5,
    title: "Semester 5",
    universityPaperLink: "https://sppuquestionpapers.com/be/computer-engineering/semester-5",
    subjects: [
      { name: "Artificial Intelligence", notesLink: "https://drive.google.com/drive/folders/1G1T4dKpDi1xVVMF4WtaZzPd4G1RgLBKE?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1Mf4P7U7tAaaVkVcU-jL5ryGv4_EZAYf-?usp=drive_link" },
      { name: "Database Management Systems", notesLink: "https://drive.google.com/drive/folders/1Fysr6WRqVuTwfRwBFj2huZsdDRd6_hRM?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MouiR4Fqb7ctODR6O19MczjplyjyoP38?usp=drive_link" },
      { name: "Design & Analysis of Algorithms", notesLink: "https://drive.google.com/drive/folders/1FyaIQ6auXc69FMa-sK9pLipgEL0n74RU?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MoNabUoc9XTjbj-PO6FKrOWHNRElF_8d?usp=drive_link" },
      { name: "Comp. Org. & Architecture", notesLink: "https://drive.google.com/drive/folders/1G6LDto1jnLAXwIjgHJHPHlkkLHe8oLv2?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MlFMhauQ_T9aSRojsstlpA2F942tTlAH?usp=drive_link" },
      { name: "Elective I (Comp. Intelligence)", notesLink: "https://drive.google.com/drive/folders/1G-Vts8Y-cZ-Gh6fcoa-ZoLp4__53XLeA?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1Mi0V7r0RfrEKbaHtcd0PmjfTrzxfUNQL?usp=drive_link" },
      { name: "Elective I (IoT)", notesLink: "https://drive.google.com/drive/folders/1Lns3wJsU9-4Xb1Nr2l5az4Z574t7k6cl?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MpDDG8bmi8MzIRtuOAayI_AXB5xt4xeA?usp=drive_link" }
    ]
  },
  {
    id: 6,
    title: "Semester 6",
    universityPaperLink: "https://sppuquestionpapers.com/be/information-technology-engineering/semester-6",
    subjects: [
      { name: "Data Science and Big Data", notesLink: "https://drive.google.com/drive/folders/1MqApVWh0ssWFNllqDIFzg5cKPntvGgaZ?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1C5TwZ4EKxSIKRBxepNQ38iVACuQYY5Jv?usp=drive_link" },
      { name: "Game Design and Development", notesLink: "https://drive.google.com/drive/folders/1MqrT8HfeSiv55GkqWMc9OGb3wS1M6oVM?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MKz1rhI69igsm2R4GTFN1l3CSSZ1XHkK" },
      { name: "Microcontrollers & Emb. Systems", notesLink: "https://drive.google.com/drive/folders/1Mqu7ge6P2dYQ6NrTj5ocA5orkzgwPkBF?usp=drive_link", papersLink: "https://drive.google.com/drive/folders/1MLUDWIp1toTZvAn5Gn_zXcj1DKVazmoS" },
      { name: "Elective II (Gen AI)", notesLink: "https://drive.google.com/drive/folders/1dYwL0l-7mjPIPYDxYR0mv8DMiCLbQFYG", papersLink: "https://drive.google.com/drive/folders/1d_TzZPEiXULGRiMLfM0XJD8kYnijVulk" },
      { name: "Elective III (Cloud Computing)", notesLink: "https://drive.google.com/drive/folders/1d_GUPb5hw8eoEGCgv-Un1lVa5Ftkv-iS", papersLink: "https://drive.google.com/drive/folders/1d_YiZw1pCs4Ady7Lu8F84qbSWtTvFcGw" }
    ]
  },
  {
    id: 7,
    title: "Semester 7",
    universityPaperLink: "https://sppuquestionpapers.com/be/computer-engineering/semester-7",
    subjects: [
      { name: "AR and VR", notesLink: "https://drive.google.com/drive/folders/1Y6o0Eady6m9vElCSx6fr3SlQaQUF2IpX", papersLink: "https://drive.google.com/drive/folders/1YN_L7ZOBdwaCrkScJxIgVpSQU5Sk4XX-" },
      { name: "UI/UX Design", notesLink: "https://drive.google.com/drive/folders/1Y71--a1CZIq5Sks3uAk4tSe5VfoekNbo", papersLink: "https://drive.google.com/drive/folders/1Z58LqKWTRgsH_uvMpLpHSVvTWi1ytuFN" },
      { name: "Elective IV (Business Intelligence)", notesLink: "https://drive.google.com/drive/folders/1XvH-zBKd_Egh27C0QtVcZ7_I06L6TK7D", papersLink: "https://drive.google.com/drive/folders/1YYr6Hl8BRrMtHUTXUxJaKKANd8vyU-OM" },
      { name: "Elective V (Deep Learning)", notesLink: "https://drive.google.com/drive/folders/1XwCnSHazfBSlKvqkiX7wPWNgHb8DRp8u", papersLink: "https://drive.google.com/drive/folders/1YjXWO_xOIKi9ALCg5XMlOBgHQC_g7VZK" },
      { name: "Research Methodology", notesLink: "https://drive.google.com/drive/folders/1Y7Pdq0X2Tnse4q4tIqWlAxMvFm5F81vO", papersLink: "https://drive.google.com/drive/folders/1YsYnflCAGBohfgZStOpiBToZnuiiavsG" }
    ]
  },
  {
    id: 8,
    title: "Semester 8",
    universityPaperLink: "https://sppuquestionpapers.com/be/information-technology-engineering/semester-8",
    subjects: [
      { name: "Software Arch. & Design Patterns", notesLink: "https://drive.google.com/drive/folders/1_CGg_OoGBPVccbaugFOein5zIxpE6odD", papersLink: "https://drive.google.com/drive/folders/1mXxN3fluEF6A19m51DpWqnNHF7X4erHl" },
      { name: "Blockchain Technology (Elective VI)", notesLink: "https://drive.google.com/drive/folders/1_FlUv4sKNmOvTXKqX4mg4GRnHHEbAiWW", papersLink: "https://drive.google.com/drive/folders/1yWc-FFajwgBAoPJw_pOsv0Nvap78pYZW" },
      { name: "Internship", notesLink: "https://drive.google.com/drive/folders/15m2egvF0vgLv6FejLwc6puxVXGHAZ9x2" }
    ]
  }
];