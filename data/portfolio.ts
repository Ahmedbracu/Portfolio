export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  year: string;
  href: string;
  type: string;
  imageSrc?: string;
  subtitle?: string;
  fallbackBg?: string;
  metrics?: string[];
};

export type TerminalEntry = {
  type: 'sys' | 'user' | 'error';
  text: string;
};

export type Capability = {
  code: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
};

export const PRIMARY_PROJECTS: Project[] = [
  {
    id: 'passop',
    number: '01',
    title: 'PASSOP',
    category: 'WEB APPLICATION // SECURITY',
    subtitle: 'SECURE PASSWORD MANAGER PLATFORM',
    description: 'Ultra-fast, browser-local cryptographic vault designed for streamlined credential management, client-side encryption, and seamless key interaction.',
    techStack: ['React', 'Tailwind CSS', 'Web Crypto API', 'LocalVault'],
    year: '2026',
    href: 'https://pass-op-wine.vercel.app/',
    type: 'Web Application',
    imageSrc: '/assets/Pass-op.png',
    fallbackBg: 'linear-gradient(135deg, #0d1f18 0%, #05120d 100%)',
    metrics: ['0 ms Latency', '100% Client-side', 'AES Encryption']
  },
  {
    id: 'laundrypro',
    number: '02',
    title: 'LAUNDRYPRO',
    category: 'CLIENT PORTFOLIO // SERVICE ENGINE',
    subtitle: 'NEXT-GEN ON-DEMAND CLEANING SYSTEM',
    description: 'On-demand commercial laundry and logistics application with dynamic pickup dispatching, step-by-step order telemetry, and automated price tiering.',
    techStack: ['React', 'Tailwind', 'REST Services', 'Framer Motion'],
    year: '2026',
    href: 'https://laundry-manager-rosy.vercel.app/',
    type: 'Service Portal',
    imageSrc: '/assets/Laundry.png',
    fallbackBg: 'linear-gradient(135deg, #111d28 0%, #080f16 100%)',
    metrics: ['98% On-Time', '24hr Turnaround', '12k+ Items Cleared']
  },
  {
    id: 'succu-cactus',
    number: '03',
    title: 'SUCCU & CACTUS HUT',
    category: 'ECOMMERCE // BOTANICAL STORE',
    subtitle: 'MINIMALIST BOTANICAL DIRECTORY & SHOP',
    description: 'Curated eco-friendly plant storefront featuring interactive filtering, custom botanical care guides, region-specific shipping engines, and rich visual telemetry.',
    techStack: ['React', 'Tailwind', 'E-commerce API', 'State Engine'],
    year: '2026',
    href: 'https://website-rosy-five-11.vercel.app/',
    type: 'E-Commerce Engine',
    imageSrc: '/assets/Succu hut.png',
    fallbackBg: 'linear-gradient(135deg, #0e1c12 0%, #060e08 100%)',
    metrics: ['Nationwide Reach', 'Sub-second Load', 'Eco-Curated']
  },
  {
    id: 'oshsharohi',
    number: '04',
    title: 'OSHSHAROHI',
    category: 'AUTOMOTIVE ENGINEERING // BRAC UNIVERSITY',
    subtitle: 'FORMULA STUDENT RACING INITIATIVE',
    description: 'Official digital platform for BRAC University Formula Student team, highlighting aerodynamic telemetry, vehicle structural engineering, and race specs.',
    techStack: ['React', 'Tailwind CSS', 'High-FPS Motion', 'WebGL'],
    year: '2026',
    href: 'https://oshsharohi.netlify.app/',
    type: 'Motorsport Engineering',
    imageSrc: '/assets/Oshsharohi.png',
    fallbackBg: 'linear-gradient(135deg, #240b0b 0%, #120404 100%)',
    metrics: ['SAE Standard', '60 FPS Canvas', 'Motorsport Grade']
  },
  {
    id: 'kitdrop',
    number: '05',
    title: 'KITDROP',
    category: 'ATHLETIC APPAREL // E-COMMERCE',
    subtitle: 'ELITE FOOTBALL KITS & HARDWARE VENDOR',
    description: 'High-contrast editorial sportswear storefront showcasing official kits, specialized firm-ground boot inventory, and interactive matchwear selector.',
    techStack: ['React', 'Tailwind', 'Custom Micro-cart', 'Responsive UI'],
    year: '2026',
    href: 'https://kit-drop-01.vercel.app/',
    type: 'Sportswear Store',
    imageSrc: '/assets/Kit_Drop.png',
    fallbackBg: 'linear-gradient(135deg, #1f1d0a 0%, #0d0c04 100%)',
    metrics: ['Pro-Tier Assets', 'Instant Filtering', 'Dark Aesthetics']
  },
  {
    id: 'rentivo',
    number: '06',
    title: 'RENTIVO',
    category: 'AUTOMOTIVE LOGISTICS // EV FLEET',
    subtitle: 'LUXURY & EV VEHICLE RESERVATION SYSTEM',
    description: 'Precision electric vehicle booking system with realtime vehicle telemetry, Plaid performance stats, date availability lookup, and fleet management.',
    techStack: ['React', 'Tailwind', 'Date Pickers', 'Logistics API'],
    year: '2026',
    href: 'https://rentivo-six.vercel.app/',
    type: 'Fleet Management',
    imageSrc: '/assets/Rentivo.png',
    fallbackBg: 'linear-gradient(135deg, #280a0f 0%, #140407 100%)',
    metrics: ['0-60 MPH 1.99s', 'Seamless Booking', 'EV Telemetry']
  }
];

export const SECONDARY_PROJECTS: Project[] = [
  {
    id: 'doccheck',
    number: '08',
    title: 'DOCCHECK',
    category: 'HEALTHCARE / INTERFACE',
    description: 'Medical diagnostic UI and patient triage interface designed for rapid emergency clinical data entry and appointment telemetry.',
    techStack: ['React', 'Tailwind', 'Health API'],
    year: '2025',
    href: 'https://www.behance.net/ahmedabubakar16',
    type: 'Web Application',
    imageSrc: '/assets/Doc.png'
  },
  {
    id: 'mamacare-ai',
    number: '09',
    title: 'MAMACARE.AI',
    category: 'MATERNAL HEALTH TECH',
    description: 'Clinical tracking platform assisting healthcare workers with maternal risk detection, scheduling telemetry, and biometric logging.',
    techStack: ['React Native', 'Tailwind', 'AI Pipeline'],
    year: '2025',
    href: 'https://www.behance.net/ahmedabubakar16',
    type: 'Mobile Product',
    imageSrc: '/assets/MamaCare.AI.png'
  },
  {
    id: 'popcorn',
    number: '10',
    title: 'POPCORN',
    category: 'MEDIA STREAMING UI',
    description: 'Cinematic content discovery engine featuring zero-lag preview trailers, custom watchlist telemetry, and dark theater mode UI.',
    techStack: ['React', 'Tailwind', 'TMDB API'],
    year: '2024',
    href: 'https://www.behance.net/ahmedabubakar16',
    type: 'Web Product',
    imageSrc: '/assets/PopCorn.png'
  },
  {
    id: 'signtutor-ai',
    number: '11',
    title: 'SIGNTUTOR.AI',
    category: 'ACCESSIBILITY PLATFORM',
    description: 'Interactive sign language learning web tool translating hand gestures into realtime visual learning feedback using computer vision.',
    techStack: ['React', 'Computer Vision', 'WebSockets'],
    year: '2024',
    href: 'https://kaggle.com/competitions/gemini-3/writeups/new-writeup-1765109533488',
    type: 'AI / Accessibility',
    imageSrc: '/assets/Signtutor.AI.png'
  }
];

export const CAPABILITIES: Capability[] = [
  {
    code: '01',
    title: 'FRONTEND ENGINEERING',
    subtitle: 'HIGH-PERFORMANCE INTERFACES',
    description: 'Building resilient, lightning-fast web architecture using React, Next.js, and TypeScript. Specializing in modular layout engines and responsive DOM trees.',
    skills: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'State Management', 'REST / GraphQL', 'Performance Opt']
  },
  {
    code: '02',
    title: 'UI/UX & EDITORIAL DESIGN',
    subtitle: 'CYBERPUNK × INDUSTRIAL SYSTEMS',
    description: 'Crafting high-contrast visual hierarchies, precision grid systems, and dark industrial layouts that balance extreme readability with aggressive visual impact.',
    skills: ['Figma Engineering', 'Design Systems', 'Typography Systems', 'Information Arch', 'Rapid Wireframing', 'User Flows']
  },
  {
    code: '03',
    title: 'INTERACTION & MOTION',
    subtitle: 'MICRO-INTERACTIONS & MOTION',
    description: 'Developing tactile micro-interactions, hardware-accelerated animations, hover dynamics, and fluid transition choreography.',
    skills: ['Framer Motion', 'GSAP Animation', 'CSS Hardware Accel', 'Canvas Dynamics', 'Interactive HUDs', 'Sound Reactive']
  },
  {
    code: '04',
    title: 'DEPLOYMENT & ARCHITECTURE',
    subtitle: 'PRODUCTION & CONTINUOUS DELIVERY',
    description: 'Configuring automated deployment workflows, Vercel edge runtime pipelines, SEO optimization, and web performance standard compliance.',
    skills: ['Vercel Edge Deploy', 'Git Workflows', 'CI/CD Pipelines', 'Core Web Vitals', 'Responsive Optimization', 'SEO Telemetry']
  }
];
