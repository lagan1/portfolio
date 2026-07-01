export const profile = {
  name: 'Pablo Cunha',
  firstName: 'Pablo',
  lastName: 'Cunha',
  title: 'Software Engineer',
  specialty: 'Backend & Security',
  location: 'Berlin, Germany',
  locationCoords: '52.5200° N, 13.4050° E',
  email: 'pabloncf@gmail.com',
  linkedin: 'https://linkedin.com/in/pabloncf',
  github: 'https://github.com/pabloncf',
  githubHandle: 'pabloncf',
  hooks: [
    "I build backend systems that don't break at 3 AM.",
    'Security-first engineer. Open-source contributor. Building from Berlin.',
    'I make legacy code boring again — predictable, tested, fast.',
  ],
  bio: "Brazilian software engineer with 5+ years building and modernizing scalable backend systems across Java, Python and PHP. Currently doing an MSc in Cyber Security in Berlin. I've led small dev teams, refactored decade-old enterprise apps, built AI legal-document systems for Brazil's Federal Justice, and shipped a security CLI to PyPI.",
  bioShort:
    "I've led teams, rescued legacy systems, built AI for the courts, and published a security tool people actually install. I like problems where correctness matters.",
  openTo: 'Backend · Platform · DevOps/SRE · Cloud · Security',
} as const;

export const stats = [
  { value: '5', suffix: '+', label: 'Years shipping', sub: 'production backend' },
  { value: '5', suffix: '', label: 'Flagship projects', sub: 'open source' },
  { value: '2', suffix: '', label: 'Published to PyPI', sub: 'envsafe · secheaders' },
  { value: 'MSc', suffix: '', label: 'Cyber Security', sub: 'Berlin · 2025–27' },
] as const;

export interface Project {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  highlight: string;
  tech: string[];
  github: string;
  flagship?: boolean;
  install?: string;
  metrics: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    id: 'envsafe',
    index: '01',
    name: 'envsafe',
    tagline: 'Open-source security scanner, shipped to PyPI',
    description:
      'A security-audit CLI that catches hardcoded secrets, misconfigured .gitignore, weak credentials and insecure Docker Compose files before they reach your repo. Runs as a pre-commit hook and a CI gate.',
    highlight: 'Published to PyPI — anyone can install it right now.',
    tech: ['Python', 'PyPI', 'pre-commit', 'Click'],
    github: 'https://github.com/pabloncf/envsafe',
    flagship: true,
    install: 'pip install envsafe',
    metrics: [
      { label: 'distribution', value: 'pip install' },
      { label: 'integration', value: 'pre-commit + CI' },
      { label: 'checks', value: '4 scanners' },
    ],
  },
  {
    id: 'secure-api-gateway',
    index: '02',
    name: 'secure-api-gateway',
    tagline: 'Production-grade API security layer',
    description:
      'An API gateway with JWT (HMAC-SHA256) auth, Redis sliding-window rate limiting, allowlist-based input sanitization and structured security-event logging. CI pipeline enforces 80%+ coverage.',
    highlight: 'Enterprise security engineering patterns, end to end.',
    tech: ['Java', 'Spring Boot', 'Spring Security', 'Redis', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    github: 'https://github.com/pabloncf/secure-api-gateway',
    metrics: [
      { label: 'auth', value: 'JWT · HS256' },
      { label: 'rate limit', value: 'Redis sliding-window' },
      { label: 'coverage', value: '80%+ gated' },
    ],
  },
  {
    id: 'saas-tenant-hub',
    index: '03',
    name: 'saas-tenant-hub',
    tagline: 'Multi-tenant SaaS with bulletproof isolation',
    description:
      'A multi-tenant SaaS backend enforcing tenant isolation through PostgreSQL Row-Level Security, with JWT refresh-token rotation, RBAC and Stripe billing over idempotent webhooks.',
    highlight: 'Production SaaS architecture, built from scratch.',
    tech: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'Angular', 'Testcontainers', 'Docker'],
    github: 'https://github.com/pabloncf/saas-tenant-hub',
    metrics: [
      { label: 'isolation', value: 'Postgres RLS' },
      { label: 'billing', value: 'Stripe · idempotent' },
      { label: 'tokens', value: 'refresh rotation' },
    ],
  },
  {
    id: 'rag-chatbot',
    index: '04',
    name: 'rag-chatbot',
    tagline: 'AI document Q&A with security guardrails',
    description:
      'A Retrieval-Augmented Generation chatbot for document Q&A with async PDF processing, vector search and a prompt-injection guard. 96% test coverage with CI.',
    highlight: 'AI/ML meets security — prompt-injection protection built in.',
    tech: ['Python', 'Django', 'DRF', 'Celery', 'Redis', 'ChromaDB', 'Claude API'],
    github: 'https://github.com/pabloncf/rag-chatbot',
    metrics: [
      { label: 'retrieval', value: 'ChromaDB vectors' },
      { label: 'guard', value: 'prompt-injection' },
      { label: 'coverage', value: '96%' },
    ],
  },
  {
    id: 'secheaders',
    index: '05',
    name: 'secheaders',
    tagline: 'HTTP security-header auditor, shipped to PyPI',
    description:
      'A CLI that scans a URL’s HTTP response headers, scores them 0–100 with a letter grade and returns actionable fixes for XSS, clickjacking, MIME-sniffing and protocol-downgrade weaknesses. Batch scanning, JSON/HTML/CSV output and a --fail-under gate for CI.',
    highlight: 'Published to PyPI — drop it into any pipeline as a security gate.',
    tech: ['Python', 'PyPI', 'CLI', 'CI/CD'],
    github: 'https://github.com/pabloncf/secheaders',
    flagship: true,
    install: 'pip install secheaders',
    metrics: [
      { label: 'scoring', value: '0–100 + grade' },
      { label: 'output', value: 'JSON · HTML · CSV' },
      { label: 'ci gate', value: '--fail-under' },
    ],
  },
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  start: string;
  location: string;
  points: string[];
  tags: string[];
}

export const experience: Experience[] = [
  {
    company: 'PBsoft',
    role: 'Java Developer & Project Lead',
    period: 'Aug 2023 – Sept 2025',
    start: '2023',
    location: 'Brazil',
    points: [
      'Led development of a 10+ year enterprise application.',
      'Promoted from Full-Stack Developer to Project Lead.',
      'Introduced automated testing and managed AWS deployments.',
      'Refactored critical legacy modules without downtime.',
    ],
    tags: ['Java', 'Spring Boot', 'AWS', 'Leadership'],
  },
  {
    company: 'UBtech',
    role: 'Backend Developer · Team Lead',
    period: 'Mar 2023 – Jul 2023',
    start: '2023',
    location: 'Brazil',
    points: [
      "Built an AI legal-document generation system for Brazil's Federal Justice.",
      'Led the backend team and integrated OpenAI APIs.',
      'Optimized data pipelines for large-scale legal datasets.',
    ],
    tags: ['Python', 'AI/LLM', 'Backend', 'Leadership'],
  },
  {
    company: 'HostDime Brazil',
    role: 'Infrastructure & Technical Support N2',
    period: 'Feb 2021 – Feb 2023',
    start: '2021',
    location: 'Brazil',
    points: [
      "Tier-2 support at one of Latin America's largest data centers.",
      'Built internal automation tools.',
      'Infrastructure and server management.',
    ],
    tags: ['Linux', 'Infra', 'Automation', 'Support'],
  },
  {
    company: 'CNPq',
    role: 'Java Developer · Research',
    period: 'Aug 2020 – Aug 2021',
    start: '2020',
    location: 'Brazil',
    points: [
      'Maintained SistematX, a scientific research database.',
      'Implemented end-to-end automated tests with Cypress.',
    ],
    tags: ['Java', 'Cypress', 'Research', 'Testing'],
  },
];

export interface SkillGroup {
  category: string;
  code: string;
  skills: string[];
}

export const skills: SkillGroup[] = [
  { category: 'Languages', code: 'LNG', skills: ['Java', 'Python', 'PHP', 'JavaScript/TypeScript', 'SQL', 'Bash'] },
  { category: 'Backend', code: 'BCK', skills: ['Spring Boot', 'Spring Security', 'Django', 'DRF', 'Laravel', 'Node.js', 'REST APIs'] },
  { category: 'Cloud & Infra', code: 'CLD', skills: ['AWS (EC2, S3, RDS)', 'Linux', 'Docker', 'Docker Compose'] },
  { category: 'DevOps & CI/CD', code: 'OPS', skills: ['GitHub Actions', 'Jenkins', 'Git', 'JUnit', 'Testcontainers', 'Pytest', 'Cypress'] },
  { category: 'Databases', code: 'DAT', skills: ['PostgreSQL', 'MySQL', 'Redis', 'ChromaDB'] },
  { category: 'Security', code: 'SEC', skills: ['JWT/OAuth2', 'RBAC', 'Rate limiting', 'Secure coding', 'Secret scanning', 'Nmap'] },
];

export const education = [
  {
    degree: 'MSc Cyber Security',
    school: 'Gisma University of Applied Sciences',
    location: 'Berlin, Germany',
    period: '2025 – 2027',
    status: 'In progress',
  },
  {
    degree: 'BSc Computer Science',
    school: 'Unipê',
    location: 'João Pessoa, Brazil',
    period: '2020 – 2025',
    status: 'Completed',
  },
];

export const languages = [
  { name: 'Portuguese', level: 'Native', code: 'PT' },
  { name: 'English', level: 'C1', code: 'EN' },
  { name: 'Spanish', level: 'B1', code: 'ES' },
  { name: 'German', level: 'A2 · learning', code: 'DE' },
];
