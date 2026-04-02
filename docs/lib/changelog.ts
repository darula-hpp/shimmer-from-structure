export interface Release {
  version: string;
  date: string;
  highlights: string[];
}

export async function getLatestRelease(): Promise<Release> {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/darula-hpp/shimmer-from-structure/main/CHANGELOG.md',
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch changelog: ${response.status}`);
    }

    const content = await response.text();
    return parseLatestRelease(content);
  } catch (error) {
    console.error('Error fetching latest release:', error);
    // Fallback to hardcoded latest release
    return {
      version: '2.4.2',
      date: 'March 21, 2026',
      highlights: [
        'Fixed CommonJS/ESM module resolution in Vite SSR environments',
        'Proper build output with .cjs extension for CommonJS format',
        'Improved compatibility across React, Vue, Svelte, Solid, and Angular',
      ],
    };
  }
}

function parseLatestRelease(changelog: string): Release {
  const lines = changelog.split('\n');

  // Find the first version header (e.g., "## [2.4.2] - 2026-03-21")
  const versionRegex = /##\s*\[([^\]]+)\]\s*-\s*(.+)/;
  let version = '';
  let date = '';
  let startIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(versionRegex);
    if (match) {
      version = match[1];
      date = formatDate(match[2].trim());
      startIndex = i + 1;
      break;
    }
  }

  if (!version) {
    throw new Error('Could not parse version from changelog');
  }

  // Find the next version header or end of file
  let endIndex = lines.length;
  for (let i = startIndex; i < lines.length; i++) {
    if (lines[i].match(versionRegex)) {
      endIndex = i;
      break;
    }
  }

  // Extract highlights (bullet points from the release notes)
  const highlights: string[] = [];
  const releaseContent = lines.slice(startIndex, endIndex).join('\n');

  // Look for bullet points that are direct features/fixes (not nested)
  const bulletRegex = /^-\s+\*\*(.+?)\*\*:?\s*(.+)/gm;
  let match;

  while ((match = bulletRegex.exec(releaseContent)) !== null) {
    const title = match[1];
    const description = match[2].split('\n')[0].trim(); // Get first line only
    highlights.push(`${title}: ${description}`);
  }

  // If no highlights found with bold format, try simple bullets
  if (highlights.length === 0) {
    const simpleBulletRegex = /^-\s+(.+)/gm;
    while ((match = simpleBulletRegex.exec(releaseContent)) !== null) {
      const text = match[1].split('\n')[0].trim();
      if (text && !text.startsWith('**')) {
        highlights.push(text);
      }
    }
  }

  // Limit to top 3 highlights
  return {
    version,
    date,
    highlights: highlights.slice(0, 3),
  };
}

function formatDate(dateStr: string): string {
  try {
    // Parse date in format "2026-03-21"
    const [year, month, day] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
