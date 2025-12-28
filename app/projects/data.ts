export interface Project {
  title: string;
  slug: string;
  year: string;
  category: string;
  description: string;
  href: string;
  images: string[];
  links: { label: string; url: string }[];
  articleLinks?: { title: string; url: string; label: string; description?: string }[];
}

export const PROJECTS: Project[] = [
  {
    title: "EdVid",
    slug: "edvid",
    year: "2024",
    category: "AI Video Generation",
    description: "AI-Powered Educational Video Generator. An educational video creation tool that leverages Manim for animations, allowing users to generate content via a web interface.",
    href: "https://github.com/wakeupguruu/EdVid",
    images: [
      "/images_project/edvid/Screenshot 2025-11-04 234039.png",
      "/images_project/edvid/Screenshot 2025-11-04 235348.png",
      "/images_project/edvid/Screenshot 2025-11-04 235529.png"
    ],
    links: [],
    articleLinks: [
      { 
        label: "Blog", 
        title: "Building EdVid: The Journey", 
        url: "#",
        description: "I documented the entire process of building this tool, from the initial idea to the final product."
      },
      { 
        label: "LinkedIn", 
        title: "EdVid Launch Post", 
        url: "#",
        description: "When launching EdVid, I shared my thoughts on the future of AI in education."
      },
      { 
        label: "LinkedIn", 
        title: "EdVid Technical Deep Dive", 
        url: "#",
        description: "A technical breakdown of how I integrated Manim with a web interface."
      }
    ]
  },
  {
    title: "Dark PDF",
    slug: "dark-pdf",
    year: "2024",
    category: "Utility Tool",
    description: "A smart PDF viewer that intelligently converts light-mode documents into dark mode, reducing eye strain during long reading sessions.",
    href: "https://github.com/wakeupguruu/dark-pdf",
    images: [
      "/images_project/darkpdf/Screenshot 2025-12-28 162740.png",
      "/images_project/darkpdf/Screenshot 2025-12-28 162754.png",
      "/images_project/darkpdf/Screenshot 2025-12-28 162759.png"
    ],
    links: [],
    articleLinks: []
  },
  {
    title: "Peer to Peer",
    slug: "peer-to-peer",
    year: "2024",
    category: "Turborepo Architecture",
    description: "A scalable monorepo starter using Turborepo, designed for building high-performance peer-to-peer applications with modern tooling.",
    href: "https://github.com/wakeupguruu/peer-to-peer",
    images: ["/images/22.jpg", "/images/28.jpg", "/images/42.jpg"],
    links: [],
    articleLinks: []
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
