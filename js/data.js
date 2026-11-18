/**
 * Portfolio Data Store
 * All portfolio information is centralized here so users can easily customize their details.
 */
const PORTFOLIO_DATA = {
  profile: {
    name: "Alex Morgan",
    tagline: "Full-Stack Engineer & Distributed Systems Architect",
    headline: "Crafting resilient cloud architectures & delightful web experiences.",
    status: {
      text: "Available for Q1/Q2 2027 projects & full-time roles",
      available: true
    },
    location: "San Francisco, CA (Remote & Hybrid)",
    timezone: "America/Los_Angeles",
    timezoneLabel: "Pacific Time (PT)",
    email: "alex.morgan.codes@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    resumeUrl: "#resume-modal",
    stats: [
      { label: "Years of Experience", value: "6+", icon: "clock" },
      { label: "Shipped Products", value: "40+", icon: "package-check" },
      { label: "Production Users", value: "250K+", icon: "users" },
      { label: "OSS Contributions", value: "1.2K+", icon: "git-pull-request" }
    ],
    bioSummary: "I bridge the gap between high-throughput backend infrastructure and fluid, accessible user interfaces. I love architecting resilient distributed systems, building developer tools, and obsessing over sub-100ms response times.",
    aboutParagraphs: [
      "Hello! I'm Alex, a software engineer with over six years of experience building mission-critical software systems. Currently focused on real-time collaboration engines, high-scale microservices, and AI-augmented developer workflows.",
      "Throughout my career, I've led technical initiatives scaling multi-tenant SaaS platforms from zero to hundreds of thousands of active users, architected event-driven pipelines handling millions of events daily, and contributed to widely adopted open-source tooling.",
      "When I'm not at my terminal, you can find me experimenting with modular synthesizers, bouldering, or contributing to open-source Rust and TypeScript repositories."
    ],
    fastFacts: [
      { label: "Current Focus", val: "Distributed consensus & LLM orchestration engines" },
      { label: "Favorite Languages", val: "TypeScript, Go, Rust, Python" },
      { label: "Terminal of Choice", val: "Ghostty / WezTerm with Neovim & tmux" },
      { label: "Daily Stack", val: "Next.js, Node.js, PostgreSQL, Docker, AWS" }
    ]
  },

  skills: {
    categories: [
      {
        id: "frontend",
        name: "Frontend & UI",
        icon: "layout",
        skills: [
          { name: "TypeScript", level: 95, exp: "6 yrs", tag: "Primary" },
          { name: "React & Next.js", level: 95, exp: "5 yrs", tag: "Expert" },
          { name: "Vue.js / Nuxt", level: 85, exp: "3 yrs", tag: "Advanced" },
          { name: "Tailwind CSS", level: 95, exp: "4 yrs", tag: "Styling" },
          { name: "WebGL / Three.js", level: 75, exp: "2 yrs", tag: "Creative" },
          { name: "State (Zustand/Redux)", level: 90, exp: "5 yrs", tag: "Architecture" },
          { name: "Web Workers & WASM", level: 80, exp: "2 yrs", tag: "Performance" },
          { name: "Accessibility (WCAG 2.1)", level: 90, exp: "4 yrs", tag: "A11y" }
        ]
      },
      {
        id: "backend",
        name: "Backend & Systems",
        icon: "server",
        skills: [
          { name: "Node.js & Bun", level: 95, exp: "6 yrs", tag: "Runtime" },
          { name: "Go (Golang)", level: 88, exp: "3 yrs", tag: "Concurrency" },
          { name: "Python / FastAPI", level: 85, exp: "4 yrs", tag: "Data/API" },
          { name: "PostgreSQL & Prisma", level: 92, exp: "5 yrs", tag: "Relational" },
          { name: "Redis & Valkey", level: 90, exp: "4 yrs", tag: "Caching" },
          { name: "GraphQL & REST", level: 92, exp: "5 yrs", tag: "API Design" },
          { name: "Kafka & RabbitMQ", level: 82, exp: "3 yrs", tag: "Event Streams" },
          { name: "gRPC & Protocol Buffers", level: 80, exp: "2 yrs", tag: "Microservices" }
        ]
      },
      {
        id: "devops",
        name: "Cloud & Infrastructure",
        icon: "cloud",
        skills: [
          { name: "Docker & Containerd", level: 92, exp: "5 yrs", tag: "Containers" },
          { name: "Kubernetes (K8s)", level: 80, exp: "3 yrs", tag: "Orchestration" },
          { name: "AWS (ECS, S3, RDS, Lambda)", level: 88, exp: "5 yrs", tag: "Cloud" },
          { name: "Terraform & IaC", level: 82, exp: "3 yrs", tag: "Infrastructure" },
          { name: "GitHub Actions CI/CD", level: 92, exp: "4 yrs", tag: "Automation" },
          { name: "Prometheus & Grafana", level: 85, exp: "3 yrs", tag: "Observability" },
          { name: "Cloudflare Workers & CDN", level: 88, exp: "3 yrs", tag: "Edge" },
          { name: "Linux Administration", level: 90, exp: "6 yrs", tag: "Systems" }
        ]
      },
      {
        id: "ai-tools",
        name: "AI & Tooling",
        icon: "cpu",
        skills: [
          { name: "LLM Orchestration & RAG", level: 85, exp: "2 yrs", tag: "AI Systems" },
          { name: "Vector DBs (Qdrant/Pinecone)", level: 82, exp: "2 yrs", tag: "Embeddings" },
          { name: "LangChain / LlamaIndex", level: 80, exp: "2 yrs", tag: "Pipelines" },
          { name: "Vite & Modern Bundlers", level: 92, exp: "4 yrs", tag: "Build Tooling" },
          { name: "Jest / Vitest / Playwright", level: 90, exp: "5 yrs", tag: "Testing" },
          { name: "Git & Monorepo Tooling", level: 95, exp: "6 yrs", tag: "Turborepo" },
          { name: "Figma to Production UI", level: 88, exp: "4 yrs", tag: "Design Sync" },
          { name: "Performance Profiling", level: 90, exp: "5 yrs", tag: "Vitals" }
        ]
      }
    ]
  },

  projects: [
    {
      id: "nexus-studio",
      title: "Nexus AI Studio",
      category: "ai",
      tagline: "Collaborative generative canvas with real-time multiplayer node graphs",
      description: "An open-source node-based orchestration studio that enables engineering and product teams to assemble, benchmark, and deploy multi-model AI workflows in real time.",
      highlights: [
        "Architected custom CRDT syncing engine over WebSockets supporting 50+ concurrent editors per canvas with zero drift.",
        "Implemented WebGL-accelerated node renderer capable of rendering 10,000+ nodes at a steady 60 FPS.",
        "Built modular plugin architecture allowing custom model integrations with automatic token cost estimation.",
        "Featured in GitHub Trending (#1 in AI tools) with over 4,200 stars and 60+ external contributors."
      ],
      metrics: {
        stars: "4.2k",
        users: "65k MAU",
        latency: "<15ms sync"
      },
      stack: ["Next.js 15", "TypeScript", "Go", "WebSockets", "Web Audio / GL", "Tailwind CSS", "Redis"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com/demo/nexus",
      featured: true,
      badge: "Featured OSS",
      previewGradient: "from-blue-600 via-indigo-600 to-purple-600"
    },
    {
      id: "pulse-metrics",
      title: "PulseMetrics Telemetry",
      category: "fullstack",
      tagline: "Zero-overhead distributed tracing & observability dashboard for microservices",
      description: "A lightweight cloud-native monitoring suite engineered to capture edge latency, HTTP trace spans, and memory anomalies without requiring heavy agent daemons.",
      highlights: [
        "Processed 140M daily metrics records with ClickHouse column-store compression, cutting monitoring costs by 65%.",
        "Created an intuitive real-time timeline visualizer using Canvas 2D and virtual scrolling for million-datapoint datasets.",
        "Engineered automatic anomaly detection with smart alerting via Slack, PagerDuty, and Webhooks.",
        "Adopted by 12 mid-sized enterprises across fintech and e-commerce spaces."
      ],
      metrics: {
        throughput: "140M/day",
        reduction: "-65% cost",
        uptime: "99.99%"
      },
      stack: ["Go (Golang)", "React", "ClickHouse", "gRPC", "Docker", "Prometheus", "Tailwind CSS"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com/demo/pulse",
      featured: true,
      badge: "Production SaaS",
      previewGradient: "from-emerald-600 via-teal-600 to-cyan-600"
    },
    {
      id: "ciphervault",
      title: "CipherVault Enterprise",
      category: "systems",
      tagline: "Zero-knowledge cryptographic secrets manager and automated rotation engine",
      description: "End-to-end encrypted secret distribution platform designed for ephemeral microservices, CI/CD runners, and secure developer team credential sharing.",
      highlights: [
        "Implemented client-side AES-256-GCM encryption with Argon2id key derivation and audited web crypto primitives.",
        "Built seamless CLI client in Rust that injects environment secrets directly into shell sessions with zero disk storage.",
        "Integrated granular role-based access control (RBAC) with hardware security key (WebAuthn/FIDO2) enforcement.",
        "Successfully passed third-party SOC2 Type II and independent penetration test audits."
      ],
      metrics: {
        crypto: "AES-256-GCM",
        speed: "<4ms decrypt",
        compliance: "SOC2 Ready"
      },
      stack: ["Rust", "TypeScript", "PostgreSQL", "WebCrypto API", "Docker", "AWS KMS"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com/demo/vault",
      featured: true,
      badge: "Security Core",
      previewGradient: "from-amber-600 via-orange-600 to-rose-600"
    },
    {
      id: "aether-ui",
      title: "Aether Design System",
      category: "frontend",
      tagline: "Headless, accessible UI component kit with sub-millisecond keyboard navigation",
      description: "An unstyled, keyboard-first component primitives library built on top of Web Standards, designed for modern enterprise web apps prioritizing speed and WCAG 2.1 AAA compliance.",
      highlights: [
        "Engineered 36 accessible components including nested menus, data grids, and comboboxes with automated ARIA matrices.",
        "Zero runtime CSS dependency footprint — weighs under 12kb min+gzip.",
        "Built full interactive documentation with live code playground, dark mode preview, and theme generator.",
        "Achieved 100% test coverage using Vitest and Playwright visual regression suites."
      ],
      metrics: {
        bundle: "11.8 KB",
        a11y: "WCAG AAA",
        downloads: "180k/mo"
      },
      stack: ["TypeScript", "React", "CSS Variables", "Vitest", "Playwright", "Storybook"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com/demo/aether",
      featured: false,
      badge: "NPM Package",
      previewGradient: "from-violet-600 via-fuchsia-600 to-pink-600"
    },
    {
      id: "hyperflow-cli",
      title: "HyperFlow DevTool",
      category: "systems",
      tagline: "High-speed developer environment orchestrator and monorepo task runner",
      description: "A lightning-fast command-line tool written in Rust that automates local container spins, service mocking, and cache-aware incremental monorepo builds.",
      highlights: [
        "Sped up cold monorepo test pipelines by 4.2x utilizing content-addressable hashing and local daemon caching.",
        "Built-in interactive TUI (Terminal User Interface) with ratatui for real-time log streaming and container health inspection.",
        "Cross-compiled for macOS, Linux, and Windows with zero external runtime requirements."
      ],
      metrics: {
        speedup: "4.2x Faster",
        binary: "4.5 MB",
        downloads: "45k+"
      },
      stack: ["Rust", "Ratatui", "Docker API", "SQLite", "GitHub Actions"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com/demo/hyperflow",
      featured: false,
      badge: "CLI Utility",
      previewGradient: "from-cyan-600 via-sky-600 to-blue-700"
    },
    {
      id: "synthetix-audio",
      title: "Synthetix WebAudio",
      category: "frontend",
      tagline: "In-browser polyphonic FM synthesizer & interactive 3D audio-reactive visualizer",
      description: "An experimental audio synthesis laboratory built on the Web Audio API and Three.js, supporting MIDI controllers, customizable oscillator graphs, and frequency spectrum visualization.",
      highlights: [
        "Implemented custom AudioWorklet nodes for glitch-free DSP processing and anti-aliased wavetable synthesis.",
        "Integrated WebGL shaders rendering dynamic 3D frequency waveforms synchronized to audio buffers.",
        "Full Web MIDI API support with custom preset saving, sharing via URL fragments, and WAV export."
      ],
      metrics: {
        latency: "<8ms audio",
        fps: "60 FPS WebGL",
        presets: "48 Presets"
      },
      stack: ["TypeScript", "Web Audio API", "Three.js / GLSL", "Vite", "WebMIDI"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com/demo/synthetix",
      featured: false,
      badge: "Creative Tech",
      previewGradient: "from-pink-600 via-rose-600 to-amber-600"
    }
  ],

  experience: [
    {
      company: "CloudScale Labs",
      role: "Staff Software Engineer / Tech Lead",
      period: "2023 — Present",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-Time",
      description: "Spearheading the core platform architecture team building scalable multi-tenant distributed cloud infrastructure and real-time collaboration engines.",
      highlights: [
        "Designed and shipped real-time presence and collaborative editing engine powering 150k+ active daily sessions.",
        "Refactored ingress data pipelines from Python monolith into Go microservices, reducing p99 latency from 340ms to 42ms.",
        "Mentored a team of 8 engineers, instituted automated architectural review RFCs, and standardized monorepo CI/CD pipelines.",
        "Spearheaded cost-optimization initiatives that reduced annual AWS infrastructure expenditure by $280,000."
      ],
      skills: ["Go", "TypeScript", "Kubernetes", "Next.js", "Redis", "AWS", "Kafka"]
    },
    {
      company: "Hyperion Systems",
      role: "Senior Full-Stack Engineer",
      period: "2021 — 2023",
      location: "San Francisco, CA (Remote)",
      type: "Full-Time",
      description: "Developed enterprise analytics and workflow automation software for Fortune 500 customers.",
      highlights: [
        "Rebuilt the primary customer-facing data visualization dashboard with React & virtualized tables, eliminating UI freezing on 500k-row datasets.",
        "Implemented end-to-end OAuth2/SAML SSO integrations for Okta, Azure AD, and Google Workspace.",
        "Authored open-source design system component library adopted across 6 distinct internal engineering squads.",
        "Partnered with product managers and designers to translate complex customer analytics requirements into clean technical specs."
      ],
      skills: ["React", "Node.js", "PostgreSQL", "Docker", "TypeScript", "Tailwind CSS", "GraphQL"]
    },
    {
      company: "Vanguard Digital Studio",
      role: "Software Engineer",
      period: "2019 — 2021",
      location: "New York, NY",
      type: "Full-Time",
      description: "Built high-performance web applications, interactive portals, and custom e-commerce experiences for global clients.",
      highlights: [
        "Engineered scalable REST & GraphQL APIs backed by Node.js, Express, and PostgreSQL handling 8,000 req/sec peak loads.",
        "Achieved 100/100 Google Lighthouse scores across Performance, Accessibility, and Best Practices for flagship client platforms.",
        "Wrote automated unit and integration test suites boosting overall repo coverage from 45% to 88%."
      ],
      skills: ["JavaScript", "React", "Node.js", "PostgreSQL", "Webpack", "SASS", "Docker"]
    }
  ],

  education: [
    {
      institution: "University of California, Berkeley",
      degree: "B.S. in Computer Science & Applied Mathematics",
      period: "2015 — 2019",
      honors: "Magna Cum Laude • GPA: 3.88",
      highlights: "Coursework in Distributed Systems, Operating Systems, Computer Architecture, and Algorithms."
    }
  ],

  certifications: [
    { name: "AWS Certified Solutions Architect – Professional", issuer: "Amazon Web Services", year: "2024" },
    { name: "Certified Kubernetes Administrator (CKA)", issuer: "Cloud Native Computing Foundation", year: "2023" },
    { name: "HashiCorp Certified: Terraform Associate", issuer: "HashiCorp", year: "2023" }
  ],

  testimonials: [
    {
      name: "Sarah Chen",
      role: "VP of Engineering at CloudScale",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content: "Alex is that rare 10x engineer who pairs profound deep-stack systems knowledge with an eye for stunning UI polish. Their work cutting our p99 latencies transformed our product's reputation among enterprise buyers.",
      badge: "Engineering Leadership"
    },
    {
      name: "Marcus Vance",
      role: "Principal Architect at Hyperion",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      content: "Alex consistently solved the toughest architectural bottlenecks we faced. They possess an infectious passion for clean code, exhaustive documentation, and elevating everyone around them.",
      badge: "Former Colleague"
    },
    {
      name: "Elena Rostova",
      role: "Head of Product at OpenForge",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      content: "Working with Alex was a dream. They proactively identified UX edge cases before tickets were even written, and shipped features that customers immediately fell in love with.",
      badge: "Product Partner"
    }
  ],

  articles: [
    {
      title: "Designing Sub-10ms WebSockets at Scale with Go and Redis Streams",
      published: "Nov 2026",
      readTime: "7 min read",
      tags: ["Distributed Systems", "Go", "WebSockets"],
      summary: "A practical deep dive into connection pooling, zero-copy buffer recycling, and horizontal scaling strategies."
    },
    {
      title: "Why We Swapped Monolithic Bundles for Island Architecture and Edge Workers",
      published: "Aug 2026",
      readTime: "5 min read",
      tags: ["Performance", "Architecture", "Web"],
      summary: "How splitting critical rendering paths dropped our TTFB by 78% and improved Core Web Vitals across the board."
    },
    {
      title: "Building Resilient Offline-First Data Sync with CRDTs",
      published: "Apr 2026",
      readTime: "10 min read",
      tags: ["CRDT", "TypeScript", "Database"],
      summary: "Exploring state-based vs operation-based conflict-free replicated data types in collaborative browser apps."
    }
  ]
};
