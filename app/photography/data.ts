import { Photo } from "@/components/masonry-grid";

// Helper I use to duplicate for my masonry effect demo
const PHOTOS_SHARED = [
  "/images/18.jpg", "/images/29.jpg", "/images/5.jpg", "/images/4.jpg", "/images/28.jpg", "/images/25.jpg", "/images/30.jpg", "/images/8.jpg", "/images/17.jpg", "/images/2.jpg", "/images/27.jpg", "/images/9.jpg", "/images/19.jpg", "/images/10.jpg", "/images/16.jpg", "/images/7.jpg", "/images/11.jpg", "/images/6.jpg", "/images/14.jpg", "/images/23.jpg", "/images/21.jpg", "/images/3.jpg", "/images/12.jpg", "/images/1.jpg", "/images/22.jpg", "/images/26.jpg", "/images/15.jpg", "/images/24.jpg", "/images/20.jpg", "/images/13.jpg", "/images/34.jpg", "/images/32.jpg", "/images/50.webp", "/images/40.jpg", "/images/31.jpg", "/images/38.jpg", "/images/37.jpg", "/images/36.jpg", "/images/39.jpg", "/images/54.jpg", "/images/60.jpg", "/images/42.jpg", "/images/62.jpg", "/images/48.webp", "/images/45.jpg", "/images/43.jpg", "/images/33.jpg", "/images/44.jpg", "/images/49.webp", "/images/63.jpg", "/images/64.jpg", "/images/52.jpg", "/images/58.jpg", "/images/47.webp", "/images/55.jpg", "/images/35.jpg", "/images/41.jpg", "/images/56.jpg", "/images/59.jpg", "/images/65.png", "/images/61.jpg", "/images/53.jpg", "/images/46.jpg", "/images/51.webp", "/images/57.jpg"
];

// Helper to distribute photos into columns
const createColumns = (photos: string[], prefix: string): Photo[][] => {
  const col1: Photo[] = [];
  const col2: Photo[] = [];
  const col3: Photo[] = [];

  photos.forEach((src, i) => {
    const photo: Photo = {
      id: `${prefix}-${i}`,
      src,
      alt: "Photograph",
      // Add diversity in captions if desired, or leave empty
      caption: i % 7 === 0 ? "Moment" : undefined 
    };
    if (i % 3 === 0) col1.push(photo);
    else if (i % 3 === 1) col2.push(photo);
    else col3.push(photo);
  });

  return [col1, col2, col3];
};

// Split recent and archive explicitly to ensure diversity if needed, 
// or just split the array in half.
const recentPhotos = PHOTOS_SHARED.slice(0, 30);
// SWAP REQUEST: Replace photo at 2 index in middle col (index 7) with photo at 0 index (index 1)
[recentPhotos[1], recentPhotos[7]] = [recentPhotos[7], recentPhotos[1]];
// Swap index 1 (Portrait) with index 21 (Landscape - 22.jpg) to start Middle Column with Landscape
// Manual swap removed by auto-optimizer
// Swap index 1 (now 22.jpg) with index 13 (14.jpg - 5th in col) to put 14.jpg at top of Middle Column
// Manual swap removed by auto-optimizer

const archivePhotos = PHOTOS_SHARED.slice(30);
// SWAP REQUEST: Replace 0 with 8 in archive
[archivePhotos[0], archivePhotos[8]] = [archivePhotos[8], archivePhotos[0]];

export const COLUMNS_2024: Photo[][] = createColumns(recentPhotos, "recent");
export const COLUMNS_ARCHIVE: Photo[][] = createColumns(archivePhotos, "archive");
