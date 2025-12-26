export interface Project {
  title: string;
  year: string;
  category: string;
  description: string;
  href: string;
  images: string[];
  links: { label: string; url: string }[];
}

export const PROJECTS: Project[] = [
  {
    title: "EdVid",
    year: "2024",
    category: "AI Video Generation",
    description: "AI-Powered Educational Video Generator. An educational video creation tool that leverages Manim for animations, allowing users to generate content via a web interface.",
    href: "https://github.com/wakeupguruu/EdVid",
    images: ["/images/21.jpg", "/images/22.jpg", "/images/28.jpg"],
    links: []
  },
  {
    title: "Dark PDF",
    year: "2024",
    category: "Utility Tool",
    description: "A smart PDF viewer that intelligently converts light-mode documents into dark mode, reducing eye strain during long reading sessions.",
    href: "https://github.com/wakeupguruu/dark-pdf",
    images: ["/images/42.jpg", "/images/18.jpg", "/images/21.jpg"],
    links: []
  },
  {
    title: "Peer to Peer",
    year: "2024",
    category: "Turborepo Architecture",
    description: "A scalable monorepo starter using Turborepo, designed for building high-performance peer-to-peer applications with modern tooling.",
    href: "https://github.com/wakeupguruu/peer-to-peer",
    images: ["/images/22.jpg", "/images/28.jpg", "/images/42.jpg"],
    links: []
  },
  {
    title: "Zulip Open Source",
    year: "2024",
    category: "Open Source Contribution",
    description: "Performance optimization for Zulip's web client. Implemented the Page Lifecycle API to instantly reconnect frozen tabs upon resumption, replacing inefficient polling mechanisms.",
    href: "https://github.com/zulip/zulip/pull/37039",
    images: ["/images/18.jpg", "/images/21.jpg", "/images/22.jpg"],
    links: []
  }
];
