export const profile = {
  name: 'Lagan Parihar',
  firstName: 'Lagan',
  lastName: 'Parihar',
  title: 'Security Analyst',
  specialty: 'Offensive Security & Vulnerability Research',
  location: 'Jodhpur, India',
  locationCoords: '26.2389° N, 73.0243° E',
  email: 'laganparihar2005@gmail.com',
  linkedin: 'https://www.linkedin.com/in/laganparihar',
  github: 'https://github.com/lagan1',
  githubHandle: 'lagan1',
  hooks: [
    'I find the vulnerabilities your scanners miss.',
    'Hall of Fame at Google, Microsoft, NASA, Dell — and counting.',
    'Offensive security engineer. Bug bounty hunter. Breaking things to make them safer.',
  ],
  bio: "Security analyst with hands-on experience in web, API, Android, and AI security testing. I've earned Hall of Fame recognition from Google, Microsoft, Dell, NASA, Mercedes-Benz, and 25+ other organizations through responsible disclosure and Bugcrowd. Ranked Top 600 globally on Hack The Box and Top 2% all-time on TryHackMe. I hold the eWPTX, eJPT, and CAP certifications, and I build offensive tooling like Burp Suite extensions to automate what most testers do manually.",
  bioShort:
    "I break into web apps, APIs, and Android applications so attackers can't. Hall of Fame across 25+ organizations, top-ranked on HTB and THM, and I write the tools I wish existed.",
  openTo: 'Penetration Testing · Red Team · AppSec · Bug Bounty · Security Research',
} as const;

export const stats = [
  { value: '25', suffix: '+', label: 'Hall of Fame', sub: 'organizations recognized' },
  { value: '600', suffix: '', label: 'Top Global Rank', sub: 'Hack The Box' },
  { value: '2', suffix: '%', label: 'All-Time Standing', sub: 'TryHackMe' },
  { value: '4', suffix: '', label: 'Certifications', sub: 'eWPTX · eJPT · CAP · Jr PT' },
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
    id: 'splitter',
    index: '01',
    name: 'Splitter',
    tagline: 'Burp Suite extension for CRLF injection & HTTP response splitting',
    description:
      'A purpose-built Burp Suite extension that automates detection of CRLF injection and HTTP response splitting vulnerabilities during web application assessments. Splitter injects crafted payloads across target parameters, identifies header injection points, detects response boundary manipulation, and flags unsafe redirect handling — generating structured, actionable findings directly inside Burp Suite. It covers CRLF injection, HTTP response splitting, reflected XSS through header injection, and open redirect via malformed headers.',
    highlight: 'Turns hours of manual header-injection testing into a single scan.',
    tech: ['Java', 'Burp Suite Extender API', 'HTTP Protocol Analysis', 'Regex'],
    github: 'https://github.com/lagan1/splitter',
    flagship: true,
    metrics: [
      { label: 'vuln classes', value: 'CRLF · XSS · Open Redirect' },
      { label: 'integration', value: 'Burp Suite native' },
      { label: 'output', value: 'structured findings' },
    ],
  },
  {
    id: 'recon-automation',
    index: '02',
    name: 'Recon Pipeline',
    tagline: 'Automated reconnaissance and asset discovery framework',
    description:
      'A modular reconnaissance pipeline that chains subdomain enumeration, DNS resolution, HTTP probing, and content discovery into a single automated workflow. Integrates Subfinder for passive subdomain discovery, dnsx for DNS resolution, httpx for live host detection and technology fingerprinting, and Katana for crawling — outputting structured results ready for manual triage. Designed for bug bounty workflows where speed and coverage are critical.',
    highlight: 'Reduces hours of manual recon to a single command execution.',
    tech: ['Bash', 'Python', 'Subfinder', 'dnsx', 'httpx', 'Katana', 'Nuclei'],
    github: 'https://github.com/lagan1',
    metrics: [
      { label: 'discovery', value: 'subdomain + DNS + HTTP' },
      { label: 'crawling', value: 'Katana integration' },
      { label: 'output', value: 'structured triage-ready' },
    ],
  },
  {
    id: 'nuclei-templates',
    index: '03',
    name: 'Custom Nuclei Templates',
    tagline: 'Targeted vulnerability detection templates for Nuclei scanner',
    description:
      'A growing library of custom Nuclei templates developed from real-world vulnerability research and bug bounty findings. Covers detection of misconfigured cloud services, exposed sensitive endpoints, authentication bypasses, and application-specific flaws that generic scanners miss. Each template is validated against live targets and tuned to minimize false positives while maximizing signal during large-scale automated scanning.',
    highlight: 'Born from real bug bounty findings — catches what stock templates miss.',
    tech: ['YAML', 'Nuclei', 'HTTP Fuzzing', 'Regex Matching'],
    github: 'https://github.com/lagan1',
    metrics: [
      { label: 'source', value: 'real-world findings' },
      { label: 'coverage', value: 'cloud · auth · config' },
      { label: 'accuracy', value: 'low false-positive' },
    ],
  },
  {
    id: 'android-security-toolkit',
    index: '04',
    name: 'Android Security Toolkit',
    tagline: 'Static and dynamic analysis workflow for Android applications',
    description:
      'An integrated workflow for Android application security assessments combining static analysis with JADX and apktool, dynamic instrumentation with Frida, and automated scanning with MobSF. Supports decompilation, manifest analysis, certificate pinning bypass, runtime hooking, and API traffic interception. Built to systematically identify hardcoded secrets, insecure data storage, weak cryptographic implementations, and improper authentication flows in Android apps.',
    highlight: 'Full-stack Android assessment — from APK decompilation to runtime exploitation.',
    tech: ['Frida', 'MobSF', 'JADX', 'apktool', 'adb', 'Python'],
    github: 'https://github.com/lagan1',
    metrics: [
      { label: 'analysis', value: 'static + dynamic' },
      { label: 'instrumentation', value: 'Frida hooks' },
      { label: 'coverage', value: 'OWASP Mobile Top 10' },
    ],
  },
  {
id: 'blue-moon',
  index: '05',
  name: 'Blue Moon',
  tagline: 'End-to-end reconnaissance automation framework for bug bounty and security assessments',
  description:
    'Blue Moon is a reconnaissance automation toolkit designed for security researchers and bug bounty hunters. It orchestrates the entire external attack surface discovery workflow, including subdomain enumeration, URL collection, JavaScript reconnaissance, vulnerability scanning, and subdomain takeover detection. The framework integrates industry-standard tools such as Subfinder, Amass, Katana, HTTPX, Nuclei, SecretFinder, and LinkFinder into a single automated pipeline, significantly reducing manual effort during large-scale security assessments.',
  highlight:
    'Automates the complete reconnaissance lifecycle from asset discovery to vulnerability identification.',
  tech: [
    'Python',
    'Nuclei',
    'Katana',
    'HTTPX',
    'Subfinder',
    'Amass',
    'GAU',
    'Waymore',
    'SecretFinder',
    'LinkFinder',
    'PureDNS',
    'DNSX'
  ],
  github: 'https://github.com/lagan1/Blue-Moon',
  flagship: true,
  metrics: [
    { label: 'Pipeline', value: '5 Phases' },
    { label: 'Integrated Tools', value: '12+' },
    { label: 'Output', value: 'Automated Reports' },    ],
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
    company: 'Bugcrowd',
    role: 'Bug Bounty Hunter',
    period: 'Jan 2025 – Present',
    start: '2025',
    location: 'Remote',
    points: [
      'Hunt for vulnerabilities across web applications, APIs, and mobile platforms through Bugcrowd coordinated disclosure programs.',
      'Identified and responsibly reported security flaws in organizations including Google, Microsoft, Dell, NASA, and Mercedes-Benz.',
      'Earned Hall of Fame recognition from 25+ organizations for high-impact vulnerability reports.',
      'Specialize in authentication bypasses, access control flaws, injection vulnerabilities, and business logic issues.',
    ],
    tags: ['Bug Bounty', 'Web Security', 'API Security', 'Responsible Disclosure'],
  },
  {
    company: 'Independent Security Research',
    role: 'Vulnerability Researcher',
    period: 'Jan 2024 – Present',
    start: '2024',
    location: 'Remote',
    points: [
      'Conduct offensive security assessments against web applications, APIs, Android apps, and AI systems.',
      'Develop custom Burp Suite extensions and Nuclei templates to automate vulnerability detection at scale.',
      'Perform Android application security testing using static and dynamic analysis with Frida, JADX, and MobSF.',
      'Research AI security including LLM prompt injection, jailbreak vectors, and security boundary testing.',
    ],
    tags: ['Penetration Testing', 'Android Security', 'AI Security', 'Tool Development'],
  },
  {
    company: 'Hack The Box',
    role: 'Offensive Security Practitioner',
    period: 'Jan 2024 – Present',
    start: '2024',
    location: 'Remote',
    points: [
      'Achieved Top 600 global ranking through solving realistic offensive security labs and machines.',
      'Practice web exploitation, privilege escalation, Active Directory attacks, and post-exploitation techniques.',
      'Apply real-world offensive methodologies across Linux and Windows environments.',
    ],
    tags: ['HTB', 'Privilege Escalation', 'Web Exploitation', 'Active Directory'],
  },
  {
    company: 'TryHackMe',
    role: 'Cybersecurity Practitioner',
    period: 'Jan 2024 – Present',
    start: '2024',
    location: 'Remote',
    points: [
      'Ranked Top 20 on the monthly leaderboard and maintain a consistent Top 2% all-time standing.',
      'Completed paths covering web security, network exploitation, OSINT, privilege escalation, and forensics.',
      'Built structured offensive and defensive security methodology through guided and challenge-based labs.',
    ],
    tags: ['TryHackMe', 'Network Security', 'OSINT', 'Forensics'],
  },
];

export interface SkillGroup {
  category: string;
  code: string;
  skills: string[];
}

export const skills: SkillGroup[] = [
  { category: 'Web Security', code: 'WEB', skills: ['OWASP Top 10', 'XSS', 'SQLi', 'SSRF', 'CSRF', 'IDOR', 'Business Logic Flaws', 'Authentication Bypass'] },
  { category: 'API Security', code: 'API', skills: ['REST APIs', 'GraphQL', 'JWT', 'OAuth', 'Broken Access Control', 'Mass Assignment', 'Rate Limiting Bypass'] },
  { category: 'Android Security', code: 'MOB', skills: ['Frida', 'MobSF', 'JADX', 'apktool', 'Certificate Pinning Bypass', 'Runtime Hooking', 'APK Decompilation'] },
  { category: 'Network Security', code: 'NET', skills: ['Nmap', 'Wireshark', 'Metasploit', 'Privilege Escalation', 'Active Directory', 'Post-Exploitation'] },
  { category: 'AI Security', code: 'AIS', skills: ['LLM Security', 'Prompt Injection', 'Jailbreak Testing', 'Claude Skills Development', 'AI Red Teaming'] },
  { category: 'Bug Bounty', code: 'BBH', skills: ['Bugcrowd', 'Responsible Disclosure', 'CVSS Scoring', 'CWE Classification', 'Report Writing'] },
  { category: 'Source Code Review', code: 'SCR', skills: ['Manual Code Audit', 'Insecure Deserialization', 'Hardcoded Secrets', 'Input Validation Flaws'] },
  { category: 'Reconnaissance', code: 'RCN', skills: ['Subfinder', 'dnsx', 'httpx', 'Katana', 'ffuf', 'Shodan', 'Censys', 'Google Dorking'] },
  { category: 'Programming', code: 'LNG', skills: ['Python', 'Bash', 'JavaScript', 'Java', 'SQL'] },
  { category: 'Security Tools', code: 'TLS', skills: ['Burp Suite', 'Nuclei', 'sqlmap', 'Ghidra', 'ffuf', 'Nmap', 'Metasploit', 'Wireshark'] },
  { category: 'Reverse Engineering', code: 'REV', skills: ['Ghidra', 'JADX', 'apktool', 'Binary Analysis', 'Decompilation'] },
  { category: 'Cloud & Infrastructure', code: 'CLD', skills: ['Docker', 'Linux', 'Git', 'Cloud Misconfiguration Testing', 'S3 Bucket Enumeration'] },
  { category: 'Operating Systems', code: 'SYS', skills: ['Kali Linux', 'Ubuntu', 'Windows', 'Android'] },
];

export const education = [
  {
    degree: 'BCA (Bachelor of Computer Applications)',
    school: 'Lachoo Memorial College of Science & Technology',
    location: 'Jodhpur, Rajasthan, India',
    period: '2023 – 2026',
    status: '8.70 CGPA',
  },
  {
    degree: 'Class 12th',
    school: 'Delhi Public School Pali',
    location: 'Pali, Rajasthan, India',
    period: 'Completed',
    status: '70%',
  },
];

export const certifications = [
  { name: 'eWPTX (Web Application Penetration Tester eXtreme)', issuer: 'INE Security', id: '173313071' },
  { name: 'eJPT (Junior Penetration Tester)', issuer: 'INE Security', id: '160391797' },
  { name: 'CAP (Certified AppSec Practitioner)', issuer: 'The SecOps Group', id: '10690020' },
  { name: 'Jr Penetration Tester', issuer: 'TryHackMe', id: '' },
];

export const languages = [
  { name: 'English', level: 'Professional', code: 'EN' },
  { name: 'Hindi', level: 'Native', code: 'HI' },
];
