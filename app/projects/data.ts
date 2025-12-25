export interface Project {
  title: string;
  year: string;
  category: string;
  description: string;
  href: string;
  links: { label: string; url: string }[];
}

export const PROJECTS: Project[] = [
  {
    title: "Portfolio",
    year: "2025",
    category: "Design System",
    description: "A digital playground to experiment with new technologies and design trends. Built with Next.js, TypeScript, and Tailwind CSS.",
    href: "https://github.com/wakeupguruu/portfolio",
    links: [
        { label: "GitHub", url: "https://github.com/wakeupguruu/portfolio" },
        { label: "Live", url: "https://portfolio-vyasg.vercel.app" }
    ]
  },
  {
    title: "Chat Application",
    year: "2024",
    category: "Web Development",
    description: "Real-time messaging platform with instant delivery, read receipts, and media sharing capabilities.",
    href: "#",
    links: [
        { label: "Source", url: "#" }
    ]
  },
  {
    title: "E-Commerce Dashboard",
    year: "2023",
    category: "Frontend Architecture",
    description: "Comprehensive analytics dashboard for online retailers, featuring real-time data visualization and inventory management.",
    href: "#",
    links: []
  },
  {
    title: "AI Image Generator",
    year: "2023",
    category: "Machine Learning Integration",
    description: "Web interface for generating custom imagery using Stable Diffusion API with fine-tuned parameters.",
    href: "#",
    links: []
  }
];
