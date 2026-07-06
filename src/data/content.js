// ============================================================
//  ALL SITE CONTENT LIVES HERE.
//  Edit these objects — every section reads from this file.
// ============================================================

export const SITE = {
  name: 'Minh Le Bui',
  handle: 'minh_bui',
  role: 'CS & Data Science @ UW–Madison',
  tagline: 'I build ML systems and data pipelines that survive contact with production.',
  location: 'Madison, WI',
  email: 'minhbuics@gmail.com',
  phone: '+1 (608) 598-8955',
  resumeFile: 'MinhLeBui_Resume.pdf', // lives in /public
  portrait: 'portrait.jpg', // lives in /public — drop your photo there (square-ish crop works best)
  socials: [
    { label: 'github', url: 'https://github.com/M1nhbui' },
    { label: 'linkedin', url: 'https://linkedin.com/in/minhlebui' },
    { label: 'email', url: 'mailto:minhbuics@gmail.com' },
  ],
}

export const ABOUT = {
  paragraphs: [
    `I'm a Computer Science & Data Science student at UW–Madison (Class of 2028), currently located in Madison, WI. My work sits where machine learning meets infrastructure: fine-tuning LLMs to study hallucination at Dartmouth, shipping churn models on 2M+ user records at VNPT-Media, and validating OCR training data at CMC OpenAI.`,
    `I care about the unglamorous parts that make models actually work — data quality, evaluation, pipelines that don't fall over. Outside of that, I compete in ICPC and serve as Vice President of the Vietnamese International Student Association.`,
  ],
  // "live" tech stack rendered as a status board in About
  stack: [
    { name: 'Python', status: 'daily' },
    { name: 'PyTorch', status: 'daily' },
    { name: 'SQL / PostgreSQL', status: 'daily' },
    { name: 'Transformers', status: 'active' },
    { name: 'PySpark', status: 'active' },
    { name: 'LangChain', status: 'active' },
    { name: 'FastAPI', status: 'active' },
    { name: 'Docker', status: 'active' },
    { name: 'AWS', status: 'active' },
    { name: 'Java / C++', status: 'loaded' },
    { name: 'XGBoost / LightGBM', status: 'loaded' },
    { name: 'GitHub Actions', status: 'loaded' },
  ],
}

// Selected Work — showcase cards (expand on click)
export const PROJECTS = [
  {
    id: 'ghostmarket',
    index: '01',
    title: 'GhostMarket — Vibe & Price Decoupling Engine',
    kind: 'real-time data engineering',
    role: 'Solo — architecture, pipeline, dashboard',
    summary:
      'Streaming pipeline that detects moments when social sentiment diverges from live crypto prices — a leading indicator for hype pumps and panic crashes.',
    details: [
      'Async producers poll CoinGecko every 5s and stream live Telegram mentions into partitioned Aiven Kafka topics.',
      'Stream processor scores every message with FinBERT into a continuous “vibe score”, maintained in an O(1) sliding 5-minute window.',
      'Decoupling math (ΔP, ΔV, hype momentum M = ΔV × velocity) fires IMMINENT_HYPE_PUMP alerts when sentiment spikes before price moves.',
      'Processed records land in MotherDuck (DuckDB lakehouse); a React + Vite + Tailwind dashboard renders dual-axis live charts, a vibe meter, and flashing alerts in real time.',
    ],
    tech: ['Kafka', 'FinBERT', 'MotherDuck', 'Python', 'React', 'Tailwind'],
    links: [{ label: 'github', url: 'https://github.com/M1nhbui/ghost_market_936' }],
    metric: '5s tick ingestion · O(1) sliding-window scoring',
  },
  {
    id: 'devkit',
    index: '02',
    title: 'DevKit — Local-First Developer Toolbox',
    kind: 'desktop systems software',
    role: 'Solo — Rust backend, TS frontend',
    summary:
      'Native desktop toolbox (Tauri 2 + Rust) with 25+ offline tools behind one plugin-style trait contract — the frontend never changes when a tool is added.',
    details: [
      'Every tool implements a shared Rust `Tool` trait; a registry exposes list/run so the TypeScript frontend stays fully generic.',
      'Grouped sidebar and Cmd/Ctrl+K command palette generated from backend metadata; progress events stream to the UI via a ProgressSink.',
      'Tools span encoding (Base64, UUID/ULID, SHA-256), formatting (JSON, cron, regex, diff), files (streaming hashers, PDF split/merge, EXIF strip, bulk rename with dry-run), and network (HTTP tester, DNS/WHOIS).',
      'Local-first by design — everything runs offline except explicitly-invoked network tools. Release build verified.',
    ],
    tech: ['Tauri 2', 'Rust', 'TypeScript', 'Vite'],
    links: [{ label: 'github', url: 'https://github.com/M1nhbui/Devkit_test' }],
    metric: '25+ tools · 1 trait contract · 78% Rust',
  },
  {
    id: 'news-sentiment',
    index: '03',
    title: 'Daily News Sentiment Dashboard',
    kind: 'ML pipeline · live in production',
    role: 'Solo — model, ETL, infra, dashboard',
    summary:
      'Fully automated pipeline: fetches political news daily, scores sentiment with a custom-trained classifier, stores in Amazon RDS, visualizes live on Streamlit.',
    details: [
      'Custom Voting Classifier (LogReg / SVM / Random Forest) trained on 30K+ TF-IDF samples; model hosted on AWS S3 and loaded dynamically at runtime.',
      'GitHub Actions triggers the full ETL daily at 6AM UTC — fetch → clean → predict → store — with encrypted secrets throughout.',
      'PostgreSQL on Amazon RDS via SQLAlchemy ORM; fully Dockerized for reproducible builds.',
      'Live Streamlit dashboard with auto-refreshing Altair charts, deployed on Streamlit Cloud.',
    ],
    tech: ['scikit-learn', 'AWS RDS', 'S3', 'Docker', 'GitHub Actions', 'Streamlit'],
    links: [
      { label: 'live app', url: 'https://dailynewssentimentapp.streamlit.app' },
      { label: 'github', url: 'https://github.com/M1nhbui/Daily_news_sentiment_app' },
    ],
    metric: '30K+ training samples · daily automated runs',
  },
  {
    id: 'urbanpulse',
    index: '04',
    title: 'UrbanPulse — City Activity Heatmap',
    kind: 'hackathon · CheeseHacks (team banhmi)',
    role: 'Data pipeline & scoring engine',
    summary:
      'City exploration tool that scores every venue in Madison by relevance, crowd level, and urgency, then renders the city’s “pulse” as 3D columns on a map.',
    details: [
      'FastAPI backend enriches places and events with foot-traffic signals from the BestTime API.',
      'Keyword relevance computed via TF-IDF cosine similarity; urgency derived from time-sensitive events and closing hours.',
      'Signals combine into a contextual score per exploration mode, returned as a ranked entity list.',
      'React + deck.gl + Mapbox frontend renders scores as interactive 3D columns with per-venue score breakdowns.',
    ],
    tech: ['FastAPI', 'TF-IDF', 'BestTime API', 'React', 'deck.gl', 'Mapbox'],
    links: [{ label: 'github', url: 'https://github.com/M1nhbui/banhmi-cheesehacks' }],
    metric: 'live foot-traffic scoring · 3D spatial viz',
  },
]

// Experience timeline (most recent first)
export const EXPERIENCE = [
  {
    org: 'CMC OpenAI',
    role: 'AI Intern',
    stack: 'Transformers · OCR',
    period: 'Jun 2026 — Present',
    location: 'Hanoi, Vietnam',
    current: true,
    points: [
      'Validated a 3,000-image table dataset for fine-tuning PaddleOCR-VL 1.6 — caught 30% mislabeled samples and systematic annotation errors before training.',
      'Analyzed 2,000 PaddleOCR-VL outputs on Vietnamese legislation documents, filtering to high-value images that shrank training size while improving stability.',
    ],
  },
  {
    org: 'Thayer School of Engineering, Dartmouth',
    role: 'Research Assistant',
    stack: 'Llama-3.2-3B · LLM Fine-Tuning · LangChain',
    period: 'Sep 2025 — Present',
    location: 'Remote',
    current: true,
    points: [
      'Fine-tuned Llama-3.2-3B (LoRA/QLoRA/full) to study hallucination — ~3× variance cut (49%→17%), 100% consistency on held-out facts.',
      'Compiled 40+ hallucination & red-teaming benchmarks supporting evaluation of 6 in-house models.',
    ],
  },
  {
    org: 'VNPT-Media',
    role: 'ML Engineer Intern',
    stack: 'XGBoost · Docker · FastAPI · PySpark',
    period: 'Jul 2025 — Sep 2025',
    location: 'Hanoi, Vietnam',
    points: [
      'Optimized a PySpark feature pipeline over 2M+ monthly user records for stable monthly retraining.',
      'Shipped an XGBoost return-prediction model (F1 0.82, +14% over baseline) via Docker + FastAPI.',
      'Bayesian tuning +5% performance; SHAP explanations for non-technical stakeholders.',
    ],
  },
  {
    org: 'AI Research Center — HUST',
    role: 'Research Intern',
    stack: 'RAG · FAISS · PyTorch · VLMs · CLIP',
    period: 'May 2025 — Jul 2025',
    location: 'Hanoi, Vietnam',
    points: [
      'Prototyped a RAG pipeline for PET/CT medical scans — the retrieval framework for future VLM testing.',
    ],
  },
  {
    org: 'Biokind Analytics',
    role: 'Data Engineer & Analyst',
    stack: 'Pandas · GeoPandas · Tableau',
    period: 'Sep 2024 — May 2025',
    location: 'Madison, WI',
    points: [
      'Automated collection & cleaning for 15+ counties via FIPS codes — 40% less manual processing.',
      'Analyzed 12GB+ of historical data (6 years), directly informing a partner bank’s donation strategy.',
      'Built interactive Tableau + GeoPandas dashboards for campaign planning.',
    ],
  },
]

// Skills, categorized — rendered as logo tiles.
// `icon` is a Simple Icons slug (see simpleicons.org); append '/HEXCOLOR' to
// override dark brand colors that vanish on the dark background.
// Set icon: null to render a terminal-style fallback glyph instead.
export const SKILLS = [
  {
    category: 'languages',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'SQL', icon: null },
      { name: 'Java', icon: 'openjdk' },
      { name: 'C++', icon: 'cplusplus' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Rust', icon: 'rust' },
      { name: 'R', icon: 'r' },
    ],
  },
  {
    category: 'ml_and_llms',
    items: [
      { name: 'PyTorch', icon: 'pytorch' },
      { name: 'Hugging Face', icon: 'huggingface' },
      { name: 'LangChain', icon: 'langchain' },
      { name: 'scikit-learn', icon: 'scikitlearn' },
      { name: 'XGBoost', icon: null },
      { name: 'LoRA / QLoRA', icon: null },
    ],
  },
  {
    category: 'data_engineering',
    items: [
      { name: 'PySpark', icon: 'apachespark' },
      { name: 'Pandas', icon: 'pandas' },
      { name: 'Kafka', icon: 'apachekafka' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Elasticsearch', icon: 'elasticsearch' },
      { name: 'SQLAlchemy', icon: 'sqlalchemy' },
    ],
  },
  {
    category: 'infra_and_tools',
    items: [
      // AWS was removed from Simple Icons (trademark) — served from Devicon instead
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Docker', icon: 'docker' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'Flask', icon: 'flask' },
      { name: 'GitHub Actions', icon: 'githubactions' },
      { name: 'Git', icon: 'git' },
      { name: 'Linux', icon: 'linux' },
      { name: 'Firebase', icon: 'firebase' },
      { name: 'Streamlit', icon: 'streamlit' },
      { name: 'Tableau', icon: 'tableau' },
    ],
  },
]

// LeetCode / problem-solving stats — LAST-RESORT fallback only.
// The real numbers live in public/leetcode.json, refreshed automatically by
// scripts/fetch-leetcode.mjs on every deploy (daily cron in deploy.yml).
export const LEETCODE = {
  username: 'M1nhbui',
  profileUrl: 'https://leetcode.com/u/M1nhbui/',
  contest: {
    rating: 1551,
    attended: 3,
    globalRanking: 277929,
    totalParticipants: 874830,
    topPercentage: 32.17,
  },
  solved: {
    easy: { done: 188, total: 953 },
    medium: { done: 255, total: 2081 },
    hard: { done: 43, total: 951 },
  },
  pastYear: {
    submissions: 260,
    activeDays: 60,
    maxStreak: 6,
  },
  calendar: null,
}

export const EDUCATION = {
  school: 'University of Wisconsin — Madison',
  degree: 'B.S. Computer Science & Data Science',
  certificate: 'Certificate in Economic Analytics',
  gpa: '4.0 / 4.0',
  graduation: 'May 2028',
  location: 'Madison, WI',
  coursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Distributed Systems',
    'Computer Architecture',
    'Operating Systems',
    'Data Management',
    'Statistical Modeling',
    'Machine Learning',
    'Database Management Systems',
    'Data Science Programming',
  ],
}

export const ACHIEVEMENTS = [
  {
    title: 'ICPC North Central NA Regional 2025',
    detail: 'Placed 14th of 86 teams',
    tag: 'competitive programming',
  },
  {
    title: 'Vietnam Science & Engineering Fair (ViSEF)',
    detail: '4th prize — System Software',
    tag: 'research',
  },
  {
    title: "Dean's List",
    detail: 'All semesters · 4.0 GPA',
    tag: 'academic',
  },
  {
    title: 'Vietnamese International Student Association',
    detail: 'Vice President',
    tag: 'leadership',
  },
]

// Nav sections — order defines the scroll rail
export const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'leetcode', label: 'LeetCode' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
