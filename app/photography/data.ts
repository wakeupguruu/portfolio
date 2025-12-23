import { Photo } from "@/components/masonry-grid";

// Helper I use to duplicate for my masonry effect demo
const PHOTOS_SHARED = [
  "/images/21.jpg",
  "/images/22.jpg",
  "/images/28.jpg",
  "/images/42.jpg",
  "/images/18.jpg"
];

// MANUAL COLUMNS: [Column 1 Photos, Column 2 Photos, Column 3 Photos]
export const COLUMNS_2024: Photo[][] = [
  // Column 1
  [
    { id: "1", src: PHOTOS_SHARED[0], alt: "Portrait 1", caption: "Deep Thought" },
    { id: "4", src: PHOTOS_SHARED[3], alt: "Landscape 2", caption: "Nature" },
  ],
  // Column 2
  [
    { id: "2", src: PHOTOS_SHARED[1], alt: "Landscape 1", caption: "Urban Vibe" },
    { id: "5", src: PHOTOS_SHARED[4], alt: "Portrait 3", caption: "Style" },
  ],
  // Column 3
  [
    { id: "3", src: PHOTOS_SHARED[2], alt: "Portrait 2", caption: "Reflection" },
    { id: "6", src: PHOTOS_SHARED[0], alt: "Portrait 1 Rep", caption: "Echoes" },
  ]
];

export const COLUMNS_ARCHIVE: Photo[][] = [
  // Column 1
  [
    { id: "11", src: PHOTOS_SHARED[3], alt: "Archive 1", caption: "Summer 2022" },
  ],
  // Column 2
  [
    { id: "12", src: PHOTOS_SHARED[1], alt: "Archive 2", caption: "City Lights" },
    { id: "13", src: PHOTOS_SHARED[4], alt: "Archive 3", caption: "Friends" },
  ],
  // Column 3
  [
    { id: "14", src: PHOTOS_SHARED[2], alt: "Archive 4", caption: "Moments" },
  ]
];
