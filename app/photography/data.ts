import { Photo } from "@/components/masonry-grid";

// Helper I use to duplicate for my masonry effect demo
const PHOTOS_SHARED = [
  "/images/1.jpg", "/images/2.jpg", "/images/3.jpg", "/images/4.jpg", "/images/5.jpg",
  "/images/6.jpg", "/images/7.jpg", "/images/8.jpg", "/images/9.jpg", "/images/10.jpg",
  "/images/11.jpg", "/images/12.jpg", "/images/13.jpg", "/images/14.jpg", "/images/15.jpg",
  "/images/16.jpg", "/images/17.jpg", "/images/18.jpg", "/images/19.jpg", "/images/20.jpg",
  "/images/21.jpg", "/images/22.jpg", "/images/23.jpg", "/images/24.jpg", "/images/25.jpg",
  "/images/26.jpg", "/images/27.jpg", "/images/28.jpg", "/images/29.jpg", "/images/30.jpg",
  "/images/31.jpg", "/images/32.jpg", "/images/33.jpg", "/images/34.jpg", "/images/35.jpg",
  "/images/36.jpg", "/images/37.jpg", "/images/38.jpg", "/images/39.jpg", "/images/40.jpg",
  "/images/41.jpg", "/images/42.jpg", "/images/43.jpg", "/images/44.jpg", "/images/45.jpg",
  "/images/46.jpg", "/images/47.webp", "/images/48.webp", "/images/49.webp", "/images/50.webp",
  "/images/51.webp", "/images/52.jpg", "/images/53.jpg", "/images/54.jpg", "/images/55.jpg",
  "/images/56.jpg", "/images/57.jpg", "/images/58.jpg", "/images/59.jpg", "/images/60.jpg",
  "/images/61.jpg", "/images/62.jpg", "/images/63.jpg", "/images/64.jpg", "/images/65.png"
];

// MANUAL COLUMNS: [Column 1 Photos, Column 2 Photos, Column 3 Photos]
export const COLUMNS_2024: Photo[][] = [
  // Column 1
  [
    { id: "1", src: PHOTOS_SHARED[20], alt: "Portrait 1", caption: "Deep Thought" }, // 21.jpg
    { id: "4", src: PHOTOS_SHARED[41], alt: "Landscape 2", caption: "Nature" }, // 42.jpg
  ],
  // Column 2
  [
    { id: "2", src: PHOTOS_SHARED[21], alt: "Landscape 1", caption: "Urban Vibe" }, // 22.jpg
    { id: "5", src: PHOTOS_SHARED[17], alt: "Portrait 3", caption: "Style" }, // 18.jpg
  ],
  // Column 3
  [
    { id: "3", src: PHOTOS_SHARED[27], alt: "Portrait 2", caption: "Reflection" }, // 28.jpg
    { id: "6", src: PHOTOS_SHARED[20], alt: "Portrait 1 Rep", caption: "Echoes" },
  ]
];

export const COLUMNS_ARCHIVE: Photo[][] = [
  // Column 1
  [
    { id: "11", src: PHOTOS_SHARED[41], alt: "Archive 1", caption: "Summer 2022" },
  ],
  // Column 2
  [
    { id: "12", src: PHOTOS_SHARED[21], alt: "Archive 2", caption: "City Lights" },
    { id: "13", src: PHOTOS_SHARED[17], alt: "Archive 3", caption: "Friends" },
  ],
  // Column 3
  [
    { id: "14", src: PHOTOS_SHARED[27], alt: "Archive 4", caption: "Moments" },
  ]
];
