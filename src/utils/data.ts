import type { LucideIcon } from "lucide-react";
import { Atom, Cloud, Code2, Database, FileText, GitBranch, SquareTerminal, Triangle, Users, Webhook } from "lucide-react";

/* ════════════════════════════════════════════════════════════════
   SINGLE SOURCE OF TRUTH for all page content.

   ⚠ REPLACE BEFORE LAUNCH:
     • PROJECTS[*].link   (repo URLs "will follow")
     • public/transparent-profile.png (your real ID photo)
   ════════════════════════════════════════════════════════════════ */

export const PROFILE = {
	firstName: "John Dominic",
	lastName: "Escoto",
	name: "John Dominic Escoto",
	role: "Full-Stack Developer",
	tagline: "I build systems that save people 95% of their time.",
	photo: "/transparent-profile.png",
	cv: "/cv.pdf",
};

export const CONTACT = {
	email: "imjohndominic08@gmail.com",
	phone: "+971 50 902 3917",
	location: "Open to remote & on-site roles",
	github: "https://github.com/OtokseDom",
	linkedin: "https://www.linkedin.com/in/otokse",
};

export interface NavLink {
	label: string;
	href: string;
}

export const NAV_LINKS: NavLink[] = [
	{ label: "STORY", href: "#story" },
	{ label: "SKILLS", href: "#skills" },
	{ label: "PROJECTS", href: "#projects" },
	{ label: "EXPERIENCE", href: "#experience" },
	{ label: "CONTACT", href: "#contact" },
];

/* ── Skills ─────────────────────────────────────────────────────── */

export interface Skill {
	name: string;
	category: string;
	/** Context revealed on hover / focus */
	context: string;
	icon: LucideIcon;
}

export const SKILLS: Skill[] = [
	{
		name: "PHP · Laravel · CodeIgniter",
		category: "BACKEND",
		context: "RMS on CodeIgniter, Task App & Spread Tech services on Laravel — Eloquent, migrations, queues.",
		icon: Code2,
	},
	{
		name: "React + TypeScript",
		category: "FRONTEND",
		context: "SPAs incl. this portfolio — strongly-typed, component-driven UIs.",
		icon: Atom,
	},
	{
		name: "Next.js",
		category: "META-FRAMEWORK",
		context: "App Router, SSR/SSG fundamentals — powering my next wave of builds.",
		icon: Triangle,
	},
	{
		name: ".NET (Core · C# · VB.NET)",
		category: "DESKTOP / BACKEND",
		context: "Internal tooling and the Event Attendance System — foundational .NET training.",
		icon: SquareTerminal,
	},
	{
		name: "REST APIs",
		category: "ARCHITECTURE",
		context: "Designed integrations that cut client onboarding time by 30%.",
		icon: Webhook,
	},
	{
		name: "MySQL / PostgreSQL",
		category: "DATABASE",
		context: "Schema design & query tuning on tables with 10k+ records.",
		icon: Database,
	},
	{
		name: "AWS (EC2 / S3)",
		category: "CLOUD",
		context: "Deployed Laravel apps; static assets & backups served from S3.",
		icon: Cloud,
	},
	{
		name: "Git · GitHub",
		category: "TOOLING",
		context: "Feature-branch workflow, code review discipline, mentoring juniors.",
		icon: GitBranch,
	},
	{
		name: "Team Leadership",
		category: "PEOPLE",
		context: "Led 4 developers to ship a copyrighted production system.",
		icon: Users,
	},
	{
		name: "Tech Documentation",
		category: "SUPPORT",
		context: "Manuals & API docs adopted by non-technical staff.",
		icon: FileText,
	},
];

/* ── The 95% Story (full-screen pinned horizontal panels) ───────── */

export interface StoryCardData {
	phase: "BEFORE" | "THE BUILD" | "AFTER";
	title: string;
	description: string;
	stat: string;
	image: string;
	imageAlt: string;
	imageClass: string;
}

export const STORY_CARDS: StoryCardData[] = [
	{
		phase: "BEFORE",
		title: "Drowning in Paperwork",
		description: "Research coordinators tracked everything by hand — paper forms, Excel files, endless encoding. One wrong entry meant days of rework.",
		stat: "~**15 hrs/week** lost to manual tracking",
		image: "https://picsum.photos/seed/spreadsheet/1100/700?grayscale",
		imageAlt: "Placeholder photo representing manual spreadsheet tracking",
		imageClass: "grayscale contrast-125",
	},
	{
		phase: "THE BUILD",
		title: "Architecting the Fix",
		description: "I architected a Laravel + MySQL platform from scratch and led a team of 4 developers to ship it — requirements through deployment.",
		stat: "**4 devs led** · full production rollout",
		image: "https://picsum.photos/seed/architecture/1100/700",
		imageAlt: "Placeholder photo representing system architecture",
		imageClass: "saturate-50 contrast-110",
	},
	{
		phase: "AFTER",
		title: "95% Less Busywork",
		description: "What took a week now takes minutes. The coordinator got her schedule back — and the system earned a registered copyright.",
		stat: "**95% workload reduction** · copyright registered",
		image: "https://picsum.photos/seed/dashboard/1100/700",
		imageAlt: "Placeholder photo representing an analytics dashboard",
		imageClass: "contrast-110",
	},
];

/* ── Projects ───────────────────────────────────────────────────── */

/** 6 placeholder screenshots per project for the gallery modal. */
const shots = (seed: string): string[] => Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/${seed}-screen-${i + 1}/1000/625`);

export interface Project {
	title: string;
	status: string;
	badgeClass: string;
	year: string;
	role: string;
	tags: string[];
	impact: string[];
	image: string;
	imageAlt: string;
	screenshots: string[];
	link: string;
}

export const PROJECTS: Project[] = [
	{
		title: "Task Management App",
		status: "SELF-INITIATED",
		badgeClass: "bg-ink text-paper",
		year: "2024",
		role: "Solo Build",
		tags: ["Laravel", "React", "TypeScript", "MySQL", "RBAC"],
		impact: ["Kanban board with drag-and-drop and **role-based access control**", "Built for personal use — **deployed live** and running today"],
		image: "https://picsum.photos/seed/taskboard/800/520",
		imageAlt: "Task management app interface placeholder",
		screenshots: shots("taskboard"),
		link: "https://github.com/OtokseDom/otokse-project-management",
	},
	{
		title: "Research Management System",
		status: "COPYRIGHTED",
		badgeClass: "bg-accent text-paper",
		year: "2023 – 2024",
		role: "Tech Lead · 4 Devs",
		tags: ["PHP", "CodeIgniter", "MySQL", "Bootstrap"],
		impact: [
			"Cut coordinator workload by **95%** — weeks of encoding down to minutes",
			"Led a team of **4 developers**; system registered with a **copyright**",
		],
		image: "https://picsum.photos/seed/researchsys/800/520",
		imageAlt: "Research management system dashboard placeholder",
		screenshots: shots("researchsys"),
		link: CONTACT.github, // TODO: repo URL will follow
	},
	{
		title: "Tourism Web App",
		status: "CAPSTONE",
		badgeClass: "bg-fog text-ink",
		year: "2023",
		role: "Capstone Project",
		tags: ["Laravel", "Bootstrap", "Google Maps API"],
		impact: ["Interactive destination guides powered by the **Google Maps API**", "Fully **responsive UI**, verified across phones, tablets & desktop"],
		image: "https://picsum.photos/seed/tourismapp/800/520",
		imageAlt: "Tourism web app interface placeholder",
		screenshots: shots("tourismapp"),
		link: CONTACT.github, // TODO: repo URL will follow
	},
	{
		title: "Event Attendance System",
		status: "ACADEMIC",
		badgeClass: "bg-fog text-ink",
		year: "2019",
		role: "Academic Requirement",
		tags: ["VB.NET", ".NET", "Desktop App"],
		impact: [
			"**Paperless** check-in for school events — replaced passing around manual sheets",
			"Auto-generated attendance **reports**, cutting tally time from hours to minutes",
		],
		image: "https://picsum.photos/seed/eventattendance/800/520",
		imageAlt: "Event attendance system interface placeholder",
		screenshots: shots("eventattendance"),
		link: CONTACT.github, // TODO: repo URL will follow
	},
];

/* ── Experience (timeline) ──────────────────────────────────────── */

export interface ExperienceItem {
	company: string;
	role: string;
	period: string;
	bullets: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
	{
		company: "Spread Technology",
		role: "Technical Support Analyst",
		period: "Jul 2024 — Present",
		bullets: [
			"Design and maintain REST APIs connecting React frontends to Laravel services — **30% faster** client integrations",
			"Own production debugging across the full stack; author internal docs now used team-wide",
		],
	},
	{
		company: "Bicol University",
		role: "Full Stack Developer — Team Lead",
		period: "Feb 2023 — Apr 2024",
		bullets: [
			"Led **4 developers** delivering the Research Management System (PHP · CodeIgniter)",
			"Delivered a **95% reduction** in coordinator workload — output **registered copyright**",
		],
	},
	{
		company: "Creative Codes",
		role: "Junior Programmer Intern",
		period: "Feb 2019 — Mar 2019",
		bullets: ["Built internal tools in **VB.NET** and **C#** — foundational .NET training"],
	},
];

/* ── Hero terminal script ───────────────────────────────────────── */

export const TERMINAL_LINES = [
	"$ whoami",
	"JOHN DOMINIC ESCOTO — FULL-STACK DEVELOPER",
	"$ cat mission.txt",
	"I build applications that turn complexity into clarity.",
	"$ ./impact_report --efficiency",
	"MANUAL WORKFLOW ............. 15 HRS/WK",
	"WITH MY SYSTEM ............... 1 HR/WK",
	"TIME SAVED ...................... 95%",
	"STATUS: CLIENT'S WEEK FREED ✔",
];

/* ── Ticker strip ───────────────────────────────────────────────── */

export const MARQUEE_ITEMS = ["PROJECT MANAGEMENT", "SYSTEMS BUILDER", "FULL-STACK DEVELOPER", "TEAM LEADER", "COPYRIGHTED WORK", "BUSINESS ANALYST"];

/* ── Tools wall (logo marquee) ──────────────────────────────────── */

export interface Tool {
	name: string;
	/** simple-icons slug when a local logo exists in src/assets/logos */
	slug?: string;
	/** two-letter brutalist tile shown when no logo file exists */
	initials?: string;
}

export const TOOLS: Tool[] = [
	{ name: "Postman", slug: "postman" },
	{ name: "Figma", slug: "figma" },
	{ name: "Photoshop", initials: "Ps" },
	{ name: "VS Code", initials: "VS" },
	{ name: "PhpStorm", slug: "phpstorm" },
	{ name: "Git", slug: "git" },
	{ name: "GitHub", slug: "github" },
	{ name: "Docker", slug: "docker" },
	{ name: "XAMPP", slug: "xampp" },
	{ name: "Obsidian", slug: "obsidian" },
	{ name: "Tailwind CSS", slug: "tailwindcss" },
	{ name: "Bootstrap", slug: "bootstrap" },
	{ name: "shadcn/ui", slug: "shadcnui" },
];
