import fs from 'fs';
import path from 'path';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export async function getProjectContent(slug: string): Promise<string> {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  
  try {
    if (!fs.existsSync(fullPath)) {
      return '';
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return fileContents;
  } catch (error) {
    console.error(`Error reading markdown file for slug ${slug}:`, error);
    return '';
  }
}
