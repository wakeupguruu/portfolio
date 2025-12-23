const fs = require("fs");
const path = require("path");

const directory = path.join(process.cwd(), "public", "videos");
const extensions = [".mp4", ".mov", ".webm"];

// Ensure directory exists
if (!fs.existsSync(directory)) {
  console.error(`Directory not found: ${directory}`);
  process.exit(1);
}

// Read directory
const files = fs.readdirSync(directory);

// Filter videos
const videoFiles = files.filter((file) => {
  const ext = path.extname(file).toLowerCase();
  return extensions.includes(ext);
});

// Sort to ensure deterministic order (e.g. alphabetical)
videoFiles.sort();

const mapping = {};
let counter = 1;

videoFiles.forEach((oldFile) => {
  const ext = path.extname(oldFile);
  // Construct new name: 1.mp4, 2.mov, etc.
  const newName = `${counter}${ext}`;

  const oldPath = path.join(directory, oldFile);
  const newPath = path.join(directory, newName);

  // Checking if oldFile !== newName to avoid rename same to same
  // Checking if oldFile !== newName to avoid rename same to same
  if (oldFile !== newName) {
    // Just like images, I should be careful but I will assume direct rename works for this batch
    // Ideally I would do the temp file dance but for simplicity and my need for speed, I proceed cautiously.
    // Since video filenames were very long/hashes, collisions with "1.mp4" are unlikely unless already renamed.
  }

  mapping[oldFile] = newName;
  counter++;
});

// PASS 1: Rename to Temp
const tempMapping = {};
Object.keys(mapping).forEach((oldFile) => {
  const tempName = `temp_vid_rename_${Math.random()
    .toString(36)
    .substring(7)}_${mapping[oldFile]}`;
  fs.renameSync(path.join(directory, oldFile), path.join(directory, tempName));
  tempMapping[oldFile] = tempName;
});

// PASS 2: Rename Temp to Final
Object.keys(mapping).forEach((oldFile) => {
  const tempName = tempMapping[oldFile];
  const finalName = mapping[oldFile];
  fs.renameSync(
    path.join(directory, tempName),
    path.join(directory, finalName)
  );
});

// Output mapping JSON
console.log(JSON.stringify(mapping, null, 2));
