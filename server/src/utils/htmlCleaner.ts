import TurndownService from 'turndown';

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

  // Add custom rules if needed to further clean up email-specific junk
  turndownService.addRule('stripEmptyLinks', {
    filter: (node) => {
      return node.nodeName === 'A' && !node.textContent?.trim();
    },
    replacement: () => ''
  });

  try {
    const markdown = turndownService.turndown(html);
    // Basic cleanup of excessive newlines often found in converted emails
    return markdown
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  } catch (error) {
    console.error('Failed to clean HTML:', error);
    // Fallback: strip tags using regex if turndown completely fails
    return html.replace(/<[^>]*>?/gm, '').replace(/\n{3,}/g, '\n\n').trim();
  }
}
