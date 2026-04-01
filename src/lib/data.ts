// ===== PORTFOLIO DATA — Single Source of Truth =====

export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  metric: string;
  metricColor: string;
  github: string;
  live: string;
  iconColor: string;
}

export interface Achievement {
  title: string;
  metric: string;
  numericValue: number;
  description: string;
  subtext: string;
  color: string;
}

export interface Skill {
  name: string;
  category: "language" | "web" | "dsa" | "tool";
  proficiency: number; // 0-100
}

export interface TopicChip {
  name: string;
  proficiency: number;
  count: string;
  color: string;
  category: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Himanshu Repswal",
    email: "24uec253@lnmiit.ac.in",
    phone: "+91 7891723405",
    location: "Jaipur, India",
    college: "LNMIIT Jaipur",
    branch: "B.Tech ECE",
    batch: "2024–2028",
    cgpa: 8.48,
    photo: "/himanshu.jpg",
    bio: "Competitive programmer obsessed with algorithmic complexity. ECE undergrad building systems that scale, from contest arenas to production backends.",
  },

  cp: {
    cfRating: 1257,
    cfRank: "Pupil",
    cfGlobalRank: 3692,
    cfContest: "Round 1063 (Div. 2)",
    totalProblems: 272,
    platforms: ["Codeforces"],
    peakRatingDate: "2025",
    currentStreak: 7,
    longestStreak: 28,
    activeDays: 272,
    contestsEntered: 20,
    problemsSet: 20,
    studentsmentored: 100,
    participantsLed: 200,
    deptRank: 4,
    deptTotal: 187,
    difficultyDistribution: [
      { label: "800 (Newbie)", count: 78, color: "var(--diff-easy)", percentage: 29 },
      { label: "900–1000", count: 88, color: "#66bb6a", percentage: 32 },
      { label: "1100–1200", count: 77, color: "var(--diff-medium)", percentage: 28 },
      { label: "1300+", count: 29, color: "var(--diff-hard)", percentage: 11 },
    ],
  },

  topics: [
    { name: "Math", proficiency: 95, count: "131", color: "#ffd700", category: "Theory" },
    { name: "Greedy", proficiency: 93, count: "127", color: "#ff6b35", category: "Paradigms" },
    { name: "Implementation", proficiency: 85, count: "68", color: "#43a047", category: "Basics" },
    { name: "Brute Force", proficiency: 82, count: "60", color: "#43a047", category: "Basics" },
    { name: "Constructive", proficiency: 78, count: "51", color: "#4fc3f7", category: "Paradigms" },
    { name: "Sortings", proficiency: 80, count: "44", color: "#43a047", category: "Basics" },
    { name: "Number Theory", proficiency: 72, count: "31", color: "#ffd700", category: "Theory" },
    { name: "Strings", proficiency: 70, count: "24", color: "#4fc3f7", category: "Basics" },
    { name: "DP", proficiency: 68, count: "23", color: "#ab47bc", category: "Paradigms" },
    { name: "Binary Search", proficiency: 65, count: "20", color: "#4fc3f7", category: "Techniques" },
    { name: "Data Structures", proficiency: 65, count: "20", color: "#4fc3f7", category: "Techniques" },
    { name: "Two Pointers", proficiency: 62, count: "17", color: "#43a047", category: "Techniques" },
    { name: "Bitmasks", proficiency: 60, count: "16", color: "#ab47bc", category: "Techniques" },
    { name: "Combinatorics", proficiency: 55, count: "10", color: "#ffd700", category: "Theory" },
    { name: "Geometry", proficiency: 50, count: "8", color: "#ff6b35", category: "Theory" },
  ] as TopicChip[],

  projects: [
    {
      name: "CV2Job",
      tagline: "AI Resume Analyzer",
      description:
        "Full-stack AI-powered application that analyzes resumes against job descriptions using Groq SDK. Provides intelligent matching scores, skill gap analysis, and personalized job role suggestions.",
      tech: ["React.js", "Node.js", "Groq SDK", "JWT", "MongoDB"],
      metric: "5 job roles suggested per resume",
      metricColor: "var(--accent-primary)",
      github: "https://github.com/Dexter-2005/cv2job",
      live: "https://cv-2-job-2t9v.vercel.app/",
      iconColor: "#00ff88",
    },
    {
      name: "Tars Chat",
      tagline: "Real-Time Messaging",
      description:
        "A real-time chat platform built with Next.js and Convex for instant message delivery. Features include user authentication via Clerk, real-time typing indicators, and responsive design.",
      tech: ["Next.js", "TypeScript", "Convex", "Clerk", "Tailwind"],
      metric: "< 100ms message delivery",
      metricColor: "var(--accent-blue)",
      github: "https://github.com/Dexter-2005/tars-chat",
      live: "https://tars-chat-drab.vercel.app/",
      iconColor: "#4fc3f7",
    },
    {
      name: "StructLabs",
      tagline: "DSA Visualizer",
      description:
        "Interactive data structure visualizer built with React 19. Visualizes arrays, linked lists, trees, and graphs with step-by-step algorithm animations for learning and teaching DSA concepts.",
      tech: ["React 19", "TypeScript", "Tailwind", "Firebase"],
      metric: "4 data structures visualized",
      metricColor: "var(--accent-secondary)",
      github: "https://github.com/Dexter-2005/structlabs",
      live: "#",
      iconColor: "#ff6b35",
    },
  ] as Project[],

  achievements: [
    {
      title: "Codeforces Pupil",
      metric: "1257",
      numericValue: 1257,
      description: "Peak Rating · Codeforces Pupil",
      subtext: "Global Rank #3692 in Round 1063 (Div. 2)",
      color: "var(--accent-blue)",
    },
    {
      title: "Problem Solving",
      metric: "272",
      numericValue: 272,
      description: "Problems Solved on Codeforces",
      subtext: "56 in the last month · 28-day max streak",
      color: "var(--accent-primary)",
    },
    {
      title: "Academic Excellence",
      metric: "#4",
      numericValue: 4,
      description: "Out of 187 students — ECE Batch",
      subtext: "CGPA: 8.48/10.0",
      color: "var(--accent-gold)",
    },
    {
      title: "Leadership",
      metric: "200+",
      numericValue: 200,
      description: "Contest Participants Led",
      subtext: "ACM Problem Setting Team · Offered DSA TA at LNMIIT",
      color: "var(--accent-secondary)",
    },
  ] as Achievement[],

  skills: [
    // Languages
    { name: "C++", category: "language", proficiency: 95 },
    { name: "Python", category: "language", proficiency: 80 },
    { name: "JavaScript", category: "language", proficiency: 85 },
    { name: "TypeScript", category: "language", proficiency: 82 },
    { name: "Java", category: "language", proficiency: 65 },
    // Web
    { name: "React", category: "web", proficiency: 88 },
    { name: "Next.js", category: "web", proficiency: 82 },
    { name: "Node.js", category: "web", proficiency: 85 },
    { name: "Express", category: "web", proficiency: 78 },
    { name: "Tailwind CSS", category: "web", proficiency: 90 },
    // DSA
    { name: "BFS/DFS", category: "dsa", proficiency: 85 },
    { name: "Dynamic Programming", category: "dsa", proficiency: 75 },
    { name: "Greedy", category: "dsa", proficiency: 88 },
    { name: "Graph Algorithms", category: "dsa", proficiency: 78 },
    { name: "STL Mastery", category: "dsa", proficiency: 93 },
    // Tools
    { name: "Git", category: "tool", proficiency: 90 },
    { name: "Docker", category: "tool", proficiency: 70 },
    { name: "Firebase", category: "tool", proficiency: 75 },
    { name: "MongoDB", category: "tool", proficiency: 80 },
    { name: "Three.js", category: "tool", proficiency: 65 },
  ] as Skill[],

  skillCategories: [
    { key: "language", label: "LANGUAGES", color: "var(--accent-primary)" },
    { key: "web", label: "WEB DEV", color: "var(--accent-blue)" },
    { key: "dsa", label: "DSA", color: "var(--accent-secondary)" },
    { key: "tool", label: "TOOLS", color: "var(--accent-gold)" },
  ],

  socials: {
    linkedin: "https://www.linkedin.com/in/himanxhu",
    github: "https://github.com/Dexter-2005",
    codeforces: "https://codeforces.com/profile/DeXTer-69",
    leetcode: "https://leetcode.com/u/Dexter-69/",
    email: "24uec253@lnmiit.ac.in",
  },

  navLinks: [
    { label: "About", href: "#about" },
    { label: "CP", href: "#cp" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

// Rating graph SVG path data (simulated rating progression)
export const RATING_GRAPH_PATH =
  "M 0 120 L 20 115 L 40 105 L 60 110 L 80 95 L 100 100 L 120 85 L 140 90 L 160 75 L 180 80 L 200 65 L 220 70 L 240 55 L 260 60 L 280 45 L 300 50 L 320 40 L 340 35 L 360 30 L 380 25 L 400 20";

export const RATING_GRAPH_FILL_PATH =
  "M 0 120 L 20 115 L 40 105 L 60 110 L 80 95 L 100 100 L 120 85 L 140 90 L 160 75 L 180 80 L 200 65 L 220 70 L 240 55 L 260 60 L 280 45 L 300 50 L 320 40 L 340 35 L 360 30 L 380 25 L 400 20 L 400 140 L 0 140 Z";

// Heatmap color scale
export const HEATMAP_COLORS = [
  "#161b22",
  "#0d4429",
  "#006d32",
  "#26a641",
  "#39d353",
  "#00ff88",
];

// Claude system prompt for chat widget
export const CLAUDE_SYSTEM_PROMPT = `You are an AI assistant representing Himanshu Chaudhary's portfolio. Answer questions about him based on this information:
- ECE student at LNMIIT Jaipur (2024-2028), CGPA: 8.48/10.0. Secured Department Rank 4th out of 187 students.
- Education: Matrix High School (12th, 82.8%), Tagore Public School (10th, 95.3%)
- Competitive Programmer: CF Pupil, Peak Rating 1257, 400+ problems solved across Codeforces, LeetCode, CSES.
- Global Rank #3692 in CF Round 1063 Div. 2
- Core Skills: C++, Python, JavaScript (ES6+), TypeScript, React.js, Next.js, Node.js, Express.js, Tailwind CSS, Three.js
- Topics mastered: STL, BFS/DFS, Recursion, Two Pointers, Sliding Window, Greedy
- ACM Problem Setter: 20+ problems authored, 50+ problem statements validated, mentored 100+ students, lead coordinator for contests.
- Offered DSA Teaching Assistant role at LNMIIT Jaipur
- Projects: 
  1. CV2Job (AI Resume Analyzer): React.js, Node.js, Groq SDK, Llama 3.3 70B, JWT, MongoDB, JSearch API.
  2. Tars Chat (Real-Time Messaging App): Next.js, TypeScript, Convex, Clerk, Tailwind.
  3. StructLabs (DSA Visualization Tool): React 19, TypeScript, Tailwind CSS, Firebase.
- Contact: 24uec253@lnmiit.ac.in, Phone: +91 7891723405
- Location: Jaipur, Rajasthan, India
Keep answers concise, accurate, and enthusiastic. If asked if he's available for internships or work, say yes and direct to his email.`;
