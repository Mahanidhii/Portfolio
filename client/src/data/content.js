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
      'Reduced manual property transcription errors by building an ML object-detection pipeline that automated end-to-end data capture; shipped virtual-assistant strategies that streamlined B2B client onboarding workflows.',
  },
  {
    role: 'Web Development Intern',
    company: 'Mt. Blue Properties',
    period: 'Jun 2025 – Jul 2025',
    tags: ['Social Media Backend', 'Phlame (PHP)', 'Python CLI'],
    description:
      'Delivered a cross-language social media backend (PHP micro-framework "Phlame" + Python CLI) that reduced API round-trips through API-centric design; integrated seamless cross-language data flow with zero external dependency overhead.',
  },
];

export const projects = [
  {
    id: 1,
    title: 'Multi-Modal AI for Vehicle Damage & Claim Assessment',
    icon: 'car_crash',
    featured: true,
    description:
      'End-to-end Streamlit app with Plotly visualizations automating vehicle damage detection and claim estimation; EfficientNetB0 transfer-learning image classifier plus a CatBoost claim-prediction model.',
    metric: 'CLAIM_MODEL_R² = 0.8058 // EFFICIENTNETB0 TRANSFER LEARNING',
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
      'Full-stack AI system using Gemini 2.5-flash and Hugging Face BART for structured summaries/risk assessments, Firebase Firestore + JWT auth, Tesseract OCR/pdfplumber ingestion pipeline.',
    metric: 'LANG_SUPPORT = 30+ // GEMINI_2.5_FLASH + HUGGING_FACE_BART',
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
      'ARIMA model for USD/INR forecasting (2026–2027), ADF stationarity testing, AIC-based hyperparameter tuning, walk-forward validation with MSE/RMSE/R² metrics.',
    metric: 'VALIDATION = WALK_FORWARD // AIC_TUNED ARIMA // MSE·RMSE·R²',
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
    metric: 'DATASETS = 190+ COUNTRIES · 60K+ RECORDS // DASHBOARDS = 10+ CHARTS EACH',
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
    category: 'LANGUAGES',
    items: ['Python', 'Java', 'SQL', 'HTML', 'CSS', 'PHP'],
  },
  {
    category: 'ML & DATA',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly Express', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Data Analytics', 'Machine Learning', 'Deep Learning (Neural Networks)', 'Computer Vision'],
  },
  {
    category: 'WEB & BACKEND',
    items: ['DBMS', 'Operating Systems', 'Computer Networks', 'Data Structures & Algorithms'],
  },
  {
    category: 'TOOLS & PLATFORMS',
    items: ['VS Code', 'Git', 'GitHub', 'Tableau', 'Docker'],
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
