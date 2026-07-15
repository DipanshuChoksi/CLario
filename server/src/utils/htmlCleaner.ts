import TurndownService from 'turndown';


// TODO: The current cleaning html utility is very basic, update it.  
export function cleanHtml(html: string): string {
  // Initialize turndown service
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    hr: '---',
    bulletListMarker: '-',
  });

  // Keep important structural elements, strip useless ones
  turndownService.remove(['style', 'script', 'noscript', 'iframe', 'canvas', 'img', 'video', 'audio']);

  // Add custom rules to fix common email HTML issues
  turndownService.addRule('stripEmptyLinks', {
    filter: (node) => {
      return node.nodeName === 'A' && !node.textContent?.trim();
    },
    replacement: () => ''
  });

  turndownService.addRule('strong', {
    filter: ['strong', 'b'],
    replacement: (content) => {
      if (!content.trim()) return '';
      // Replace newlines inside bold tags with spaces so it renders correctly in markdown
      return '**' + content.trim().replace(/\n+/g, ' ') + '**';
    }
  });

  turndownService.addRule('emphasis', {
    filter: ['em', 'i'],
    replacement: (content) => {
      if (!content.trim()) return '';
      return '*' + content.trim().replace(/\n+/g, ' ') + '*';
    }
  });

  try {
    let markdown = turndownService.turndown(html);

    // Post-process the markdown to fix common glitches
    markdown = markdown
      // Remove broken empty links like [](url) or ](url)
      .replace(/\[\s*\]\([^)]+\)/g, '')
      .replace(/(?:^|\s)\]\([^)]+\)/g, '')
      // Basic cleanup of excessive newlines often found in converted emails
      .replace(/\n{3,}/g, '\n\n')
      // Clean up random solitary markdown markers left by broken parsing
      .replace(/^\*\*$/gm, '')
      .trim();

    return markdown;
  } catch (error) {
    console.error('Failed to clean HTML:', error);
    // Fallback: strip tags using regex if turndown completely fails
    return html.replace(/<[^>]*>?/gm, '').replace(/\n{3,}/g, '\n\n').trim();
  }
}
