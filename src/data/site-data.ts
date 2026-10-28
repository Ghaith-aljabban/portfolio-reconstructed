// Site configuration and data for Ghaith Aljabban

export interface NavSection {
  id: string;
  label: string;
  index: string;
}

export interface NavLink {
  id: string;
  label: string;
}

export type SocialIconType =
  | "github"
  | "linkedin"
  | "mail"
  | "twitter"
  | "telegram"
  | "whatsapp"
  | "discord"
  | "globe"
  | "phone";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIconType;
  description?: string;
  username?: string;
}

export interface HeroStat {
  value: string;
  label: string;
  icon: "box" | "brain" | "code";
}

export interface AboutData {
  name: string;
  eyebrow: string;
  headingLine1: string;
  headingGradient: string;
  bio: string;
  meta: Array<{
    icon: "briefcase" | "graduation" | "mapPin";
    label: string;
    value: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export interface TechCategory {
  title: string;
  items: string[];
}

export interface ContactData {
  eyebrow: string;
  headingLine1: string;
  headingGradient: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  group: string;
  verifyUrl: string;
  fileUrl: string;
}

// Navigation sections
export const navSections: NavSection[] = [
  { id: "home", label: "Home", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "tech", label: "Tech Stack", index: "03" },
  { id: "projects", label: "Projects", index: "04" },
  { id: "contact", label: "Contact", index: "05" },
];

export const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "tech", label: "Tech" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

/**
 * List of Communication Channels (to link to all your profiles and platforms)
 * Easily add, edit or toggle any link below.
 */
export const communicationLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/ghaith",
    icon: "github",
    description: "Code repositories & open source builds",
    username: "@ghaith",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ghaith-aljabban",
    icon: "linkedin",
    description: "Professional network & career updates",
    username: "in/ghaith-aljabban",
  },
  {
    label: "Email",
    href: "mailto:ghaith.aljabban@gmail.com",
    icon: "mail",
    description: "Direct email inquiries & collaborations",
    username: "ghaith.aljabban@gmail.com",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/ghaith_aljabban",
    icon: "twitter",
    description: "AI, engineering thoughts & updates",
    username: "@ghaith_aljabban",
  },
  {
    label: "Telegram",
    href: "https://t.me/ghaith_aljabban",
    icon: "telegram",
    description: "Fast direct messaging & discussions",
    username: "@ghaith_aljabban",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/963932099438",
    icon: "whatsapp",
    description: "Instant chat & calls",
    username: "+963 932 099 438",
  },
  {
    label: "Discord",
    href: "https://discord.com/users/ghaith",
    icon: "discord",
    description: "Developer chat & community",
    username: "ghaith#0001",
  },
  {
    label: "Personal Site",
    href: "https://ghaith-aljabban.dev",
    icon: "globe",
    description: "Technical writing & portfolio",
    username: "ghaith-aljabban.dev",
  },
];

// Default primary social links displayed in Hero
export const socialLinks: SocialLink[] = communicationLinks.slice(0, 5);

export const heroStats: HeroStat[] = [
  { value: "10+", label: "Projects Completed", icon: "box" },
  { value: "5+", label: "AI Models Built", icon: "brain" },
  { value: "4+", label: "Years of Experience", icon: "code" },
];

export const aboutData: AboutData = {
  name: "Ghaith Aljabban",
  eyebrow: "ABOUT ME",
  headingLine1: "I Build Systems That",
  headingGradient: "Think & Scale.",
  bio: "AI and Backend Engineer with hands-on experience building production-oriented computer vision systems and high-concurrency backend services. Strong focus on designing reliable inference pipelines, transaction-safe APIs, asynchronous processing, observability, and scalable system architecture.",
  meta: [
    { icon: "briefcase", label: "Current Role", value: "Back-End Developer & AI Engineer" },
    { icon: "graduation", label: "Education", value: "B.Sc. Information Technology — Damascus University" },
    { icon: "mapPin", label: "Location", value: "Damascus, Syria" },
  ],
  stats: [
    { value: "2+", label: "Years Experience" },
    { value: "30+", label: "Technologies" },
    { value: "11", label: "Certifications" },
  ],
};

export const techCategories: TechCategory[] = [
  { title: "Programming", items: ["Python", "TypeScript", "JavaScript", "SQL", "C++", "Rust"] },
  { title: "AI / Computer Vision", items: ["PyTorch", "ONNX", "OpenCV", "SCRFD", "ArcFace"] },
  { title: "Backend", items: ["FastAPI", "NestJS", "Express.js", "Laravel", "REST APIs", "TypeORM"] },
  { title: "Databases & Messaging", items: ["PostgreSQL", "pgvector", "Redis", "BullMQ"] },
  { title: "DevOps & Infrastructure", items: ["Docker", "Docker Compose", "Nginx", "Caddy", "Prometheus", "Grafana", "Linux"] },
  { title: "Testing & Performance", items: ["Pytest", "Jest", "k6", "Load Testing"] },
  { title: "Frontend", items: ["React", "NextJS", "Vite", "Tailwind CSS", "TanStack Query"] },
  { title: "Tools", items: ["Git", "GitHub"] },
];

export const contactData: ContactData = {
  eyebrow: "GET IN TOUCH",
  headingLine1: "Let's Build Something",
  headingGradient: "That Lasts.",
  description: "Open to backend/AI engineering roles, freelance builds, and interesting technical problems. Feel free to reach out across any of my communication channels below.",
  email: "ghaith.aljabban@gmail.com",
  phone: "+963 932 099 438",
  location: "Damascus, Syria",
  resumeUrl: "/Ghaith_Aljabban_CV.pdf",
};

export const certifications: Certification[] = [
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI & Stanford University",
    date: "Feb 2026",
    group: "Machine Learning Specialization",
    verifyUrl: "https://coursera.org/verify/JA58O10B4DHE",
    fileUrl: "/courses/Coursera%20JA58O10B4DHE.pdf",
  },
  {
    title: "Advanced Learning Algorithms",
    issuer: "DeepLearning.AI & Stanford University",
    date: "Feb 2026",
    group: "Machine Learning Specialization",
    verifyUrl: "https://coursera.org/verify/J7LCHQJ39II3",
    fileUrl: "/courses/Coursera%20J7LCHQJ39II3.pdf",
  },
  {
    title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
    issuer: "DeepLearning.AI & Stanford University",
    date: "Aug 2026",
    group: "Machine Learning Specialization",
    verifyUrl: "https://coursera.org/verify/6VXWRAKYDSD6",
    fileUrl: "/courses/Coursera%206VXWRAKYDSD6.pdf",
  },
  {
    title: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    date: "Apr 2026",
    group: "Deep Learning Specialization",
    verifyUrl: "https://coursera.org/verify/XGRB90WQ083R",
    fileUrl: "/courses/Coursera%20XGRB90WQ083R.pdf",
  },
  {
    title: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
    issuer: "DeepLearning.AI",
    date: "Jul 2026",
    group: "Deep Learning Specialization",
    verifyUrl: "https://coursera.org/verify/QUAAEZDWQ6OR",
    fileUrl: "/courses/Coursera%20QUAAEZDWQ6OR.pdf",
  },
  {
    title: "Structuring Machine Learning Projects",
    issuer: "DeepLearning.AI",
    date: "Aug 2026",
    group: "Deep Learning Specialization",
    verifyUrl: "https://coursera.org/verify/CFVS4U6BNRW9",
    fileUrl: "/courses/Coursera%20CFVS4U6BNRW9.pdf",
  },
  {
    title: "Mathematics for Machine Learning: Linear Algebra",
    issuer: "Imperial College London",
    date: "Jul 2026",
    group: "Mathematics & Probability",
    verifyUrl: "https://coursera.org/verify/9YCNZWLQG3B7",
    fileUrl: "/courses/Coursera%209YCNZWLQG3B7.pdf",
  },
  {
    title: "An Intuitive Introduction to Probability",
    issuer: "University of Zurich",
    date: "Jul 2026",
    group: "Mathematics & Probability",
    verifyUrl: "https://coursera.org/verify/UXYFWBPLZ5A9",
    fileUrl: "/courses/Coursera%20UXYFWBPLZ5A9.pdf",
  },
  {
    title: "AI For Everyone",
    issuer: "DeepLearning.AI",
    date: "Jul 2026",
    group: "Foundations",
    verifyUrl: "https://coursera.org/verify/CIHYWN7H5GU3",
    fileUrl: "/courses/Coursera%20CIHYWN7H5GU3.pdf",
  },
  {
    title: "Programming for Everybody (Getting Started with Python)",
    issuer: "University of Michigan",
    date: "Jul 2026",
    group: "Foundations",
    verifyUrl: "https://coursera.org/verify/IATA2RO9YS1J",
    fileUrl: "/courses/Coursera%20IATA2RO9YS1J.pdf",
  },
  {
    title: "Python Data Structures",
    issuer: "University of Michigan",
    date: "Jul 2026",
    group: "Foundations",
    verifyUrl: "https://coursera.org/verify/Y99WEU929SMT",
    fileUrl: "/courses/Coursera%20Y99WEU929SMT.pdf",
  },
];
