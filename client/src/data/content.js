// ============================================================
// PORTFOLIO CONTENT — edit this file to update any section
// ============================================================

export const personal = {
  name: 'Mahanidhi G K',
  initials: 'MAHANIDHI_GK',
  tagline: 'AI & Machine Learning Student · Full-Stack Web Developer · Deep Learning Enthusiast',
  bio: [
    'I am currently pursuing a B.Tech in Computer Science and Engineering with a specialization in AI and Machine Learning at Jain University (2023–2027). With a current CGPA of 8.7, I maintain a rigorous academic standard while actively exploring the frontiers of full-stack development and applied machine learning.',
    'My focus lies at the intersection of robust backend architectures and intelligent, data-driven systems. I thrive on translating complex mathematical models into scalable, production-ready applications that solve real-world problems.',
  ],
  email: 'mahanidhi.gk@gmail.com',
  phone: '+91 9487031412',
  github: 'https://github.com/Mahanidhii',
  linkedin: 'https://www.linkedin.com/in/mahanidhi-gk-653888292/',
  resumeUrl: '/Resume - MahanidhiGK.pdf',
};

export const education = {
  degree: 'B.Tech in Computer Science Engineering (AI & ML specialization)',
  university: 'Jain University, Bangalore',
  period: '2023 – 2027 (Expected)',
  cgpa: '8.7',
};

export const experience = [
  {
    role: 'Automation Research Intern',
    company: 'Grazign',
    period: 'Jul 2025 – Aug 2025',
    tags: ['ML Object Detection', 'B2B Workflows', 'Virtual Assistants'],
    description:
      'Designed an ML object detection pipeline to automate property transcriptions and reduce manual errors; developed workflows and virtual-assistant strategies to optimize B2B client services and streamline operations.',
  },
  {
    role: 'Web Development Intern',
    company: 'Mt. Blue Properties',
    period: 'Jun 2025 – Jul 2025',
    tags: ['Social Media Backend', 'Phlame (PHP)', 'Python CLI'],
    description:
      'Engineered a social media backend using "Phlame," a custom PHP micro-framework, with a Python-based CLI frontend; gained hands-on experience in cross-language integration and API-centric system design.',
  },
];

export const projects = [
  {
    id: 1,
    title: 'Multi-Modal AI for Vehicle Damage & Claim Assessment',
    icon: 'car_crash',
    featured: true,
    description:
      'End-to-end Streamlit app with Plotly visualizations automating vehicle damage detection and claim estimation; EfficientNetB0 transfer-learning image classifier plus a CatBoost claim-prediction model (R² = 0.8058).',
    tech: ['TensorFlow', 'Scikit-learn', 'Streamlit', 'Pandas', 'Plotly'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'Document De-Jargonizer & Simplification Engine',
    icon: 'description',
    featured: false,
    description:
      'Full-stack AI system using Gemini 2.5-flash and Hugging Face BART for structured summaries/risk assessments, 30+ language translation, Firebase Firestore + JWT auth, Tesseract OCR/pdfplumber ingestion pipeline.',
    tech: ['React', 'Python FastAPI', 'Google Gemini API', 'Hugging Face', 'Tesseract OCR', 'Firebase'],
    githubUrl: '#',
    liveUrl: null,
  },
  {
    id: 3,
    title: 'USD-INR Time Series Forecasting Model',
    icon: 'monitoring',
    featured: false,
    description:
      'ARIMA model for USD/INR forecasting (2026–2027), ADF stationarity testing, AIC-based tuning, walk-forward validation (MSE/RMSE/R²).',
    tech: ['Python', 'Statsmodels', 'Pandas', 'Yahoo Finance API'],
    githubUrl: '#',
    liveUrl: null,
  },
  {
    id: 4,
    title: 'Applied Data Analysis Portfolio',
    icon: 'analytics',
    featured: true,
    description:
      'A collection of in-depth EDA projects delivering actionable insights across domains.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Plotly'],
    githubUrl: '#',
    liveUrl: null,
    subProjects: [
      {
        title: 'COVID-19 Economic Impact Analysis',
        description:
          'ETL pipeline merging COVID-19 + World Bank data across 190+ countries, 10+ chart dashboard.',
      },
      {
        title: 'Video Games Sales & Review Analysis',
        description:
          'Dynamic cleaning pipeline over a 60,000+ record Steam dataset, custom KPIs, 10+ visualizations.',
      },
      {
        title: 'Multi-Market Risk & Volatility Analysis',
        description:
          'S&P 500, NASDAQ, NIFTY 50 + 7 US/Indian large-cap equities via Yahoo Finance API.',
      },
    ],
  },
];

export const skills = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'SQL', 'HTML', 'CSS', 'PHP'],
  },
  {
    category: 'Libraries / Frameworks',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly Express', 'PyTorch', 'TensorFlow', 'Scikit-learn'],
  },
  {
    category: 'Tools & Platforms',
    items: ['VS Code', 'Git', 'GitHub', 'Tableau', 'Docker'],
  },
  {
    category: 'Coursework',
    items: [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Computer Networks',
      'DBMS',
      'Data Analytics',
      'Machine Learning',
      'Deep Learning (Neural Networks)',
      'Computer Vision',
    ],
  },
];

export const achievements = [
  {
    title: 'Google TechSprint Hackathon',
    subtitle: '3rd Place',
    description:
      'Conducted by GDG — developed an innovative solution utilizing Gemini API for real-time data synthesis under strict time constraints.',
    icon: 'emoji_events',
  },
  {
    title: 'Smart India Hackathon 2025',
    subtitle: 'Inter-college Round — Selected',
    description:
      'Developed and submitted 2 distinct projects across different domains, advancing to the inter-college selection round.',
    icon: 'military_tech',
  },
];

export const seo = {
  title: 'Mahanidhi G K — AI & ML Engineer | Full-Stack Developer',
  description:
    'Portfolio of Mahanidhi G K — B.Tech AI/ML student at Jain University, full-stack web developer, and deep learning enthusiast. Explore projects in computer vision, NLP, and data science.',
  ogImage: '/og-image.png',
};
