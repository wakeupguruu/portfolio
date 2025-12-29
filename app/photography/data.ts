import { Photo } from "@/components/masonry-grid";

// Helper to distribute photos into columns
const createColumns = (photos: {src: string, caption?: string, description?: string}[], prefix: string): Photo[][] => {
  const col1: Photo[] = [];
  const col2: Photo[] = [];
  const col3: Photo[] = [];

  photos.forEach((item, i) => {
    const photo: Photo = {
      id: `${prefix}-${i}`,
      src: item.src,
      alt: item.caption || "Photograph", // Use caption as alt if available
      caption: item.caption,
      description: item.description
    };
    if (i % 3 === 0) col1.push(photo);
    else if (i % 3 === 1) col2.push(photo);
    else col3.push(photo);
  });

  return [col1, col2, col3];
};

const PHOTOS_2025 = [
  { src: "/images/21.jpg", caption: "Contemplation", description: "A moment of quiet reflection, interpreting the physiological depth of the human experience." },
  { src: "/images/55.jpg", caption: "Secret Cove", description: "A hidden gem we stumbled upon by pure coincidence. To reach this secluded beach, we had to climb over rocks and navigate a winding tunnel formed by dense coastal trees." },
  { src: "/images/13.jpg", caption: "Mumbai Evening", description: "The sun dipping below the horizon at a beach in Mumbai, India's bustling financial capital and city of dreams." },
  { src: "/images/36.jpg", caption: "Navratri 2025", description: "Vibrant colors and energy during Navratri, a major Hindu festival celebrated for nine nights honoring the divine feminine." },
  { src: "/images/16.jpg", caption: "Cafe", description: "A cozy corner in a local café, capturing the stillness amidst the coffee shop hum." },
  { src: "/images/11.jpg", caption: "Terrace View", description: "Watching the day end from my terrace, as the sky paints itself in shades of orange and purple. A common evening ritual in Indian households." },
  { src: "/images/63.jpg", caption: "Abstract Art", description: "An intriguing piece of art found on the walls of an abandoned structure." },
  { src: "/images/62.jpg", caption: "Dark Passage", description: "A shadowed corridor inside an abandoned building, leading into the unknown." },
  { src: "/images/61.jpg", caption: "The Beatles", description: "A sketch that strikingly resembles The Beatles, preserved on a weathering wall." },
  { src: "/images/60.jpg", caption: "Abundant Sketch", description: "A unique, expressive drawing discovered while exploring an abandoned site." },
  { src: "/images/65.png", caption: "College Sketch", description: "A crayon portrait capturing me in my college uniform." },
  { src: "/images/34.jpg", caption: "Evening Stroll", description: "A beautiful scene captured spontaneously during a random evening walk." },
  { src: "/images/59.jpg", caption: undefined, description: undefined },
  { src: "/images/57.jpg", caption: "Cosmic Sky", description: "A breathtaking sky where the sun, stars, and atmospheric light blended into a rainbow-like phenomenon." },
  { src: "/images/58.jpg", caption: "Collage", description: "A digital collage mixing personal moments with artistic imagery, a visual experiment created for Instagram." },
  { src: "/images/32.jpg", caption: undefined, description: undefined },
  { src: "/images/31.jpg", caption: "Hidden Lake", description: "A serene, untouched lake that remains largely undiscovered by crowds." },
  { src: "/images/33.jpg", caption: "Trust Issues", description: "Graffiti on a wall posing the timeless question: 'Mother, should I trust the government?'" },
  { src: "/images/56.jpg", caption: "Golden Hour", description: "The sun casting its final, warmth-filled rays of the day." },
  { src: "/images/18.jpg", caption: "Mood", description: "A shot that encapsulates a fleeting feeling." },
  { src: "/images/64.jpg", caption: "Mountain Glow", description: "Sunset illuminating the mountain peaks, capturing a serene moment in nature." }, // Moved from Archive to 2025 to balance grid
];

const PHOTOS_ARCHIVE = [
  { src: "/images/42.jpg", caption: "Foggy Duo", description: "Two figures emerging from the thick fog." }, // Moved up
  { src: "/images/27.jpg", caption: "Painting", description: "A striking painting that caught my eye." },
  { src: "/images/35.jpg", caption: undefined, description: undefined },
  { src: "/images/28.jpg", caption: "Perspective", description: "Looking at the world from a different angle." },
  { src: "/images/29.jpg", caption: "Carnivorous", description: "Close-up of an insect-eating pitcher plant." },
  { src: "/images/8.jpg", caption: "Library Entrance", description: "The grand entrance to the university library." },
  { src: "/images/30.jpg", caption: "Flora", description: "A detailed study of botanical textures." },
  { src: "/images/7.jpg", caption: undefined, description: undefined },
  // 64 moved to 2025
  { src: "/images/54.jpg", caption: "Train View", description: "The Indian landscape rushing by, captured from a moving train window— a classic travel experience." },
  { src: "/images/4.jpg", caption: "Classic Dining", description: "The ambiance of a classic, timeless restaurant." },
  { src: "/images/53.jpg", caption: "Flower Field", description: "An endless field of wildflowers." },
  { src: "/images/3.jpg", caption: "Looking Up", description: "A view worth the neck pain." },
  { src: "/images/52.jpg", caption: undefined, description: undefined },
  { src: "/images/2.jpg", caption: "Moments", description: "A candid moment, frozen in time." },
  { src: "/images/26.jpg", caption: "Diu Evening", description: "The sun setting over the waters at Diu, a coastal town famous for its Portuguese history and beaches." },
  { src: "/images/1.jpg", caption: "Memories", description: "A nostalgic snapshot." },
  { src: "/images/25.jpg", caption: "Flower Dog", description: "A cute dog playfully posing with a flower on its head." },
  { src: "/images/12.jpg", caption: "Food Truck", description: "Vibrant Indian street food culture, centered around a bustling food truck." },
  // 51 Removed (Broken)
  { src: "/images/44.jpg", caption: "Farewell", description: "Sunset on the day of my 12th grade farewell. The last time I saw all my school friends together, marking the end of an era." },
  { src: "/images/24.jpg", caption: "Night Market", description: "The lights and chaotic energy of a traditional Indian night market." },
  { src: "/images/43.jpg", caption: "Daman Trip", description: "Memories from a trip to Daman, a popular coastal getaway." },
  { src: "/images/50.webp", caption: "Monsoon", description: "The rain-soaked atmosphere, viewed from a friend's house during the intense and beautiful Indian monsoon season." },
  { src: "/images/41.jpg", caption: "Moon Tree", description: "One of my favorite shots: a tree silhouetted against the night sky, with the moon visible through its branches." },
  { src: "/images/23.jpg", caption: "Doggy", description: "Another furry friend." },
  { src: "/images/37.jpg", caption: "First Heartbreak", description: "The sunset that marked the end of a chapter; my first breakup." },
  { src: "/images/49.webp", caption: "Lamborghini", description: "Spotting a 'Lamborghini' in the wild." },
  { src: "/images/6.jpg", caption: "Saloon", description: "Interior of my local saloon." },
  { src: "/images/22.jpg", caption: "Filtered", description: "Experimenting with filters to create a dreamlike aesthetic." },
  { src: "/images/48.webp", caption: "Cafe Dinner", description: "Enjoying dinner with a friend at a café." },
  { src: "/images/19.jpg", caption: "Hmm", description: "A contemplative moment." },
  { src: "/images/20.jpg", caption: "Edited", description: "Pushing the boundaries of editing." },
  { src: "/images/47.webp", caption: "Lake Evening", description: "A warm summer sunset reflected in a lake near my house." },
  { src: "/images/46.jpg", caption: "Coffee", description: "The essential fuel." },
  { src: "/images/45.jpg", caption: "Apocalypse", description: "The sky turned dark and ominous, giving the world a sudden, apocalyptic stillness." },
  { src: "/images/15.jpg", caption: "Studio", description: "Behind the scenes in a studio." },
  { src: "/images/17.jpg", caption: "Lights", description: "Beautiful light decorations illuminating the night." },
  { src: "/images/14.jpg", caption: "Captured", description: "A spontaneous capture." },
  // 42 Moved up
  { src: "/images/40.jpg", caption: undefined, description: undefined },
  { src: "/images/39.jpg", caption: "Atmosphere", description: "Soaking in the atmosphere." },
  { src: "/images/38.jpg", caption: "Mood", description: "Setting the tone." },
];


export const COLUMNS_2024: Photo[][] = createColumns(PHOTOS_2025, "recent");
export const COLUMNS_ARCHIVE: Photo[][] = createColumns(PHOTOS_ARCHIVE, "archive");
