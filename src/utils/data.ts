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
		context: "RMS on CodeIgniter, Task App & Spread Tech services on Laravel: Eloquent, migrations, queues.",
		icon: Code2,
	},
	{
		name: "React + TypeScript",
		category: "FRONTEND",
		context: "SPAs incl. this portfolio: strongly-typed, component-driven UIs.",
		icon: Atom,
	},
	{
		name: "Next.js",
		category: "META-FRAMEWORK",
		context: "App Router, SSR/SSG fundamentals, powering my next wave of builds.",
		icon: Triangle,
	},
	{
		name: ".NET (Core · C# · VB.NET)",
		category: "DESKTOP / BACKEND",
		context: "Internal tooling and the Event Attendance System. My foundational .NET training.",
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
		context: "Led 3 developers to ship a copyrighted production system.",
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

/** Storyboard frames under src/assets/storyboard, resolved by Vite at build time. */
const BOARD_FRAMES = import.meta.glob<string>("../assets/storyboard/*.jpg", { eager: true, import: "default" });

/** Three frames per board, cycled as a looping flip-book in the panel. */
const boardFrames = (board: number): string[] =>
	[1, 2, 3].map((n) => {
		const src = BOARD_FRAMES[`../assets/storyboard/${board}-${n}.jpg`];
		if (!src) throw new Error(`Missing storyboard frame: ${board}-${n}.jpg`);
		return src;
	});

export interface StoryCardData {
	phase: "BEFORE" | "THE BUILD" | "AFTER";
	title: string;
	description: string;
	stat: string;
	frames: string[];
	imageAlt: string;
}

export const STORY_CARDS: StoryCardData[] = [
	{
		phase: "BEFORE",
		title: "Drowning in Paperwork",
		description: "Research coordinators tracked everything by hand: paper forms, Excel files, endless encoding. One wrong entry meant days of rework.",
		stat: "~**15 hrs/week** lost to manual tracking",
		frames: boardFrames(1),
		imageAlt: "Storyboard frames of research coordinators tracking everything by hand",
	},
	{
		phase: "THE BUILD",
		title: "Architecting the Fix",
		description: "I architected a Laravel + MySQL platform from scratch and led a team of 3 developers through its final push to launch and beyond.",
		stat: "**3 devs led** · full production rollout",
		frames: boardFrames(2),
		imageAlt: "Storyboard frames of architecting and building the platform with a team",
	},
	{
		phase: "AFTER",
		title: "95% Less Busywork",
		description: "What took a week now takes minutes. The coordinator got her schedule back, and the system earned a registered copyright.",
		stat: "**95% workload reduction** · copyright registered",
		frames: boardFrames(3),
		imageAlt: "Storyboard frames of the finished system saving the coordinator's week",
	},
];

/* ── Projects ───────────────────────────────────────────────────── */

/** Real screenshots under src/assets/projects, resolved by Vite at build time. */
const SHOT_FILES = import.meta.glob<string>("../assets/projects/**/*.png", { eager: true, import: "default" });

/** Resolve a folder's screenshots in the given display order. */
const shots = (folder: string, files: string[]): string[] =>
	files.map((file) => {
		const src = SHOT_FILES[`../assets/projects/${folder}/${file}`];
		if (!src) throw new Error(`Missing screenshot: ${folder}/${file}`);
		return src;
	});

const rangeShots = (prefix: string): string[] => Array.from({ length: 6 }, (_, i) => `${prefix}-${i + 1}.png`);

const pmShots = shots("project_management", ["Dashboard.png", "Kanban.png", "Task-List.png", "Calendar.png", "Week-View.png", "Epic.png", "User-Profile.png"]);
const rmsShots = shots("document_management", rangeShots("Project1"));
const tourismShots = shots("travel_guide", rangeShots("Project2"));
const eventShots = shots("event_attendance", rangeShots("Project3"));

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
	/** always render images in grayscale */
	monochrome?: boolean;
	/** null → repo is private/unavailable; card renders a disabled state */
	link: string | null;
}

export const PROJECTS: Project[] = [
	{
		title: "Task Management App",
		status: "SELF-INITIATED",
		badgeClass: "bg-ink text-paper",
		year: "2024",
		role: "Solo Build",
		tags: ["Laravel", "React", "TypeScript", "MySQL", "RBAC"],
		impact: [
			"Served as our team's **live task tracker**, keeping tasks and progress in one place",
			"Other developers built **their own versions** from my hosted codebase",
			"Sharpened my **planning and execution** through hands-on agile development",
		],
		image: pmShots[0],
		imageAlt: "Task management app dashboard screenshot",
		screenshots: pmShots,
		link: "https://github.com/OtokseDom/otokse-project-management",
	},
	{
		title: "Research Management System",
		status: "COPYRIGHTED",
		badgeClass: "bg-accent text-paper",
		year: "2023 to 2024",
		role: "Tech Lead · 3 Devs",
		tags: ["PHP", "CodeIgniter", "MySQL", "Bootstrap"],
		impact: [
			"**Adopted university-wide** by faculties and students for daily research operations",
			"Digitalized **research archiving**, cutting coordinator workload by **95%**",
			"Earned a **registered copyright**, recognized as original work",
		],
		image: rmsShots[0],
		imageAlt: "Research management system screenshot",
		screenshots: rmsShots,
		link: null, // repository is private
	},
	{
		title: "Tourism Web App",
		status: "CAPSTONE",
		badgeClass: "bg-fog text-ink",
		year: "2023",
		role: "Capstone Project",
		tags: ["Laravel", "Bootstrap", "Google Maps API"],
		impact: [
			"Built in partnership with our **province's tourism department**",
			"Showcased the province's **hidden gems** to travelers",
			"Endorsed **local tour operators**, connecting them with more visitors",
		],
		image: tourismShots[0],
		imageAlt: "Tourism web app interface screenshot",
		screenshots: tourismShots,
		link: "https://github.com/OtokseDom/lakbay-agapay",
	},
	{
		title: "Event Attendance System",
		status: "ACADEMIC",
		badgeClass: "bg-fog text-ink",
		year: "2019",
		role: "Academic Requirement",
		tags: ["VB.NET", ".NET", "Desktop App"],
		impact: [
			"**Paperless** check-in for school events, no more passing around manual sheets",
			"Auto-generated attendance **reports**, cutting tally time from hours to minutes",
		],
		image: eventShots[0],
		imageAlt: "Event attendance system interface screenshot",
		screenshots: eventShots,
		monochrome: false,
		link: "https://github.com/OtokseDom/school-event-attendance-system",
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
		period: "Jul 2024 to Present",
		bullets: [
			"Design REST APIs connecting React frontends to Laravel services, delivering **30% faster** client integrations",
			"Produce **hi-fi UI/UX designs and prototypes** for new features",
			"Take on **business analysis and team coordination** beyond day-to-day support",
			"Own production debugging across the full stack; author internal docs now used team-wide",
		],
	},
	{
		company: "Bicol University",
		role: "Lead Full Stack Developer",
		period: "Feb 2023 to Apr 2024",
		bullets: [
			"Led **3 developers** through the final push to launch and post-production maintenance",
			"Delivered a **95% reduction** in coordinator workload, earning the system a **registered copyright**",
			"Achieved **university-wide adoption** by faculties and students",
		],
	},
	{
		company: "Creative Codes",
		role: "Junior Programmer Intern",
		period: "Feb 2019 to Mar 2019",
		bullets: ["Built internal tools in **VB.NET** and **C#**, gaining foundational .NET training"],
	},
];

/* ── Hero terminal script ───────────────────────────────────────── */

export const TERMINAL_LINES = [
	"$ whoami",
	"JOHN DOMINIC ESCOTO | FULL-STACK DEVELOPER",
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
