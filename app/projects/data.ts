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
        url: "/blog/building-edvid-text-to-video",
        description: "I documented the entire process of building this tool, from the initial idea to the final product."
      },
      { 
        label: "LinkedIn", 
        title: "EdVid Launch Post", 
        url: "https://www.linkedin.com/posts/guru-vyas-16a0b82a7_im-currently-building-a-tool-ed-vid-quite-activity-7358424843257589760-hXRM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEngIeIBRUkRqxnasBxsj-Cy5y9dz-EneBg",
        description: "When launching EdVid, I shared my thoughts on the future of AI in education."
      },
      { 
        label: "LinkedIn", 
        title: "Project Update: Moving On", 
        url: "https://www.linkedin.com/posts/guru-vyas-16a0b82a7_an-update-on-edvid-i-left-the-project-in-activity-7406364988623466497-xL-m?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEngIeIBRUkRqxnasBxsj-Cy5y9dz-EneBg",
        description: "A final update on the project, sharing lessons learned and why I decided to move on."
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
    articleLinks: [
      {
        label: "LinkedIn",
        title: "Dark PDF Launch",
        url: "https://www.linkedin.com/posts/guru-vyas-16a0b82a7_during-my-exams-i-was-reading-through-bright-activity-7346510057791979520-Ru8c?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEngIeIBRUkRqxnasBxsj-Cy5y9dz-EneBg",
        description: "Sharing the release of Dark PDF."
      }
    ]
  },
  {
    title: "Websparkel AI",
    slug: "websparkel-ai",
    year: "2025",
    category: "AI Platform",
    description: "An open-source browser-based development environment that runs Node.js entirely in your browser using WebContainers. Secure, instant, and powerful.",
    href: "https://github.com/wakeupguruu/WebSpark-AI",
    images: [
      "/images_project/websparkel-ai/Screenshot 2025-12-29 071508.png",
      "/images_project/websparkel-ai/Screenshot 2025-12-29 063511.png"
    ],
    links: [],
    articleLinks: []
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
