const fs = require("fs");
const path = require("path");

const directory = path.join(process.cwd(), "public", "images");
const extensions = [".jpg", ".jpeg", ".png", ".webp", ".heic"];

// Ensure directory exists
if (!fs.existsSync(directory)) {
  console.error(`Directory not found: ${directory}`);
  process.exit(1);
}

// Read directory
const files = fs.readdirSync(directory);

// Filter images
const imageFiles = files.filter((file) => {
  const ext = path.extname(file).toLowerCase();
  return extensions.includes(ext);
});

// Sort to ensure deterministic order (e.g. alphabetical)
imageFiles.sort();

const mapping = {};
let counter = 1;

imageFiles.forEach((oldFile) => {
  const ext = path.extname(oldFile);
  // Construct new name: 1.jpg, 2.png, etc.
  const newName = `${counter}${ext}`;

  const oldPath = path.join(directory, oldFile);
  const newPath = path.join(directory, newName);

  // Avoid overwriting if file already exists with target name (edge case)
  // But since I am renaming all, collisions might happen if I am not careful.
  // E.g. if "1.jpg" already exists and I want to rename "a.jpg" to "1.jpg".
  // To avoid this, I can rename to a temp name first or just assume I want a clean slate.

  // Actually, to avoid collisions with existing "1.jpg", we should probably rename all to a temp prefix first, or check collision.
  // Or, simply, if "1.jpg" exists and is in our list, we might overwrite it.
  // Better strategy: Rename all to `temp_${uuid}_${counter}${ext}` then to final.
  // But let's try direct rename and hope for no overlapping conflicts (unless 1.jpg is already there).

  // Actually, safe way:
  // 1. Calculate all renames.
  // 2. perform renames.

  // We'll proceed with direct rename for now, logging the mapping.

  if (oldFile !== newName) {
    // If target exists, we have a problem.
    if (fs.existsSync(newPath) && !imageFiles.includes(newName)) {
      // If it exists but wasn't in our original list (unlikely if we listed all), dangerous.
      // If it IS in our list, it will be renamed eventually? No, if we overwrite it now, we lose it.
      // Simple fix: Rename to `temp_...` first.
    }

    // Let's do a two-pass rename to be safe.
    // Pass 1: Rename to verified temp names.
    // Pass 2: Rename temp to final names.
  }

  mapping[oldFile] = newName;
  counter++;
});

// PASS 1: Rename to Temp
const tempMapping = {};
Object.keys(mapping).forEach((oldFile) => {
  const tempName = `temp_rename_${Math.random().toString(36).substring(7)}_${
    mapping[oldFile]
  }`;
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
