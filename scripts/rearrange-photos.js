const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const DATA_FILE_PATH = path.join(process.cwd(), "app/photography/data.ts");
const PUBLIC_DIR = path.join(process.cwd(), "public");

async function main() {
  console.log("Reading data.ts...");
  let dataContent = fs.readFileSync(DATA_FILE_PATH, "utf8");

  // Extract the PHOTOS_SHARED array
  const match = dataContent.match(
    /const PHOTOS_SHARED = \[\s*([\s\S]*?)\s*\];/
  );
  if (!match) {
    console.error("Could not find PHOTOS_SHARED array in data.ts");
    process.exit(1);
  }

  // Parse the array content
  // Split by comma, remove quotes and whitespace
  const originalPhotos = match[1]
    .split(",")
    .map((s) => s.trim().replace(/['"]/g, ""))
    .filter((s) => s.length > 0);

  console.log(`Found ${originalPhotos.length} photos.`);

  // Analyze photos
  const photoStats = await Promise.all(
    originalPhotos.map(async (src) => {
      const fullPath = path.join(PUBLIC_DIR, src);
      try {
        const image = sharp(fullPath);
        const metadata = await image.metadata();
        const { width, height } = metadata;

        // Get dominant color by resizing to 1x1
        const buffer = await image.resize(1, 1).raw().toBuffer();
        const r = buffer[0];
        const g = buffer[1];
        const b = buffer[2];

        const aspectRatio = width / height;
        const orientation = aspectRatio >= 1 ? "landscape" : "portrait";

        return {
          src,
          r,
          g,
          b,
          orientation,
        };
      } catch (e) {
        console.warn(`Failed to analyze ${src}:`, e.message);
        // Fallback
        return {
          src,
          r: 128,
          g: 128,
          b: 128,
          orientation: "landscape",
        };
      }
    })
  );

  // Split into Recent (30) and Archive (Rest)
  // The original file sliced at 30.
  const RECENT_COUNT = 30;
  let recentPhotos = photoStats.slice(0, RECENT_COUNT);
  let archivePhotos = photoStats.slice(RECENT_COUNT);

  console.log(`Optimizing Recent Photos (${recentPhotos.length})...`);
  recentPhotos = optimizeLayout(recentPhotos);

  console.log(`Optimizing Archive Photos (${archivePhotos.length})...`);
  archivePhotos = optimizeLayout(archivePhotos);

  // Reconstruct the array
  const finalPhotos = [...recentPhotos, ...archivePhotos].map((p) => p.src);

  // Update data.ts
  // 1. Replace the array content
  const newArrayString =
    `\n  ` + finalPhotos.map((src) => `"${src}"`).join(", ") + `\n`;
  let newDataContent = dataContent.replace(
    /const PHOTOS_SHARED = \[\s*[\s\S]*?\];/,
    `const PHOTOS_SHARED = [${newArrayString}];`
  );

  // 2. Remove manual swaps if present
  // Matches lines like: [recentPhotos[1], recentPhotos[21]] = ...
  newDataContent = newDataContent.replace(
    /\[recentPhotos\[\d+\], recentPhotos\[\d+\]\] =.*/g,
    "// Manual swap removed by auto-optimizer"
  );

  fs.writeFileSync(DATA_FILE_PATH, newDataContent);
  console.log("Updated app/photography/data.ts successfully.");
}

function optimizeLayout(photos, iterations = 50000) {
  let current = [...photos];
  let best = [...photos];
  let bestCost = calculateCost(best);

  console.log(`Initial Cost: ${bestCost}`);

  let temp = 100;
  const coolingRate = 0.9995;

  for (let i = 0; i < iterations; i++) {
    // Swap two random indices
    const idx1 = Math.floor(Math.random() * current.length);
    const idx2 = Math.floor(Math.random() * current.length);

    if (idx1 === idx2) continue;

    // Swap
    [current[idx1], current[idx2]] = [current[idx2], current[idx1]];

    const currentCost = calculateCost(current);

    // Accept if better, or with probability if worse (Simulated Annealing)
    if (currentCost < bestCost) {
      best = [...current];
      bestCost = currentCost;
      if (bestCost === 0) break; // Perfect!
    } else {
      // Probability? Maybe just greedy/hill climbing for now is sufficient given the strict constraints.
      // Actually, SA helps escape local minima.
      const delta = currentCost - bestCost; // Positive
      // If standard hill climbing: revert swap
      [current[idx1], current[idx2]] = [current[idx2], current[idx1]];

      // Let's stick to simple Monte Carlo / Hill Climbing for simplicity
      // unless we get stuck.
      // Reverting immediately if not better ensures we only improve,
      // but might get stuck. Let's try Pure Random Shuffle + Keep Best if simple swap fails?
      // Let's use simple swap-acceptance:
      // If worse, revert.
    }
  }

  console.log(`Final Cost: ${bestCost}`);
  return best;
}

function calculateCost(photos) {
  let cost = 0;
  const COL_COUNT = 3;
  const COLOR_THRESHOLD = 60; // Euclidean distance in RGB

  for (let i = 0; i < photos.length; i++) {
    const p = photos[i];

    // 1. Color Layout Constraints
    // Horizontal Neighbor (previous in list, but in grid it's i-1 if in same row batch? No, visually:)
    // Grid:
    // 0 1 2
    // 3 4 5
    // Neighbors of 4 are 3, 5 (Horizontal) and 1, 7 (Vertical).
    // The data.ts distributes: i%3==0 -> Col1, i%3==1 -> Col2 (Center), i%3==2 -> Col3.
    // So:
    // Col 1: 0, 3, 6...
    // Col 2: 1, 4, 7...
    // Col 3: 2, 5, 8...

    // Horizontal Neighbors of 'i' are 'i-1' and 'i+1'?
    // Visually, Row 0 is indices 0, 1, 2.
    // Yes. So if i and i-1 are in same "row", they are horizontal neighbors.
    // i and i-1 are neighbors if floor(i/3) == floor((i-1)/3).
    // Basically, 1 is next to 0. 2 is next to 1.

    // Check Left Neighbor (i-1)
    if (i > 0 && Math.floor(i / 3) === Math.floor((i - 1) / 3)) {
      const pLeft = photos[i - 1];
      const dist = colorDist(p, pLeft);
      if (dist < COLOR_THRESHOLD) cost += 100; // Penalize similar colors horizontally
    }

    // Check Top Neighbor (Same Column) -> Index i-3
    if (i >= 3) {
      const pTop = photos[i - 3];
      const dist = colorDist(p, pTop);
      if (dist < COLOR_THRESHOLD) cost += 100; // Penalize similar colors vertically (stacked)
    }

    // 2. Shape Constraints
    // "DON'T WANT ALL POTRAIT PHOTOS CONTINOUSLY IN 3 COLOMS CONTINOUSLY"
    // Interpretation: In a single column, do not have 3 consecutive portraits.
    // Column indices: i, i-3, i-6.
    if (i >= 6) {
      if (
        photos[i].orientation === "portrait" &&
        photos[i - 3].orientation === "portrait" &&
        photos[i - 6].orientation === "portrait"
      ) {
        cost += 500; // Massive penalty
      }

      if (
        photos[i].orientation === "landscape" &&
        photos[i - 3].orientation === "landscape" &&
        photos[i - 6].orientation === "landscape"
      ) {
        cost += 500;
      }
    }
  }

  return cost;
}

function colorDist(p1, p2) {
  return Math.sqrt(
    Math.pow(p1.r - p2.r, 2) +
      Math.pow(p1.g - p2.g, 2) +
      Math.pow(p1.b - p2.b, 2)
  );
}

main().catch(console.error);
