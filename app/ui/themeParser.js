/**
 * VS Code Theme Parser
 * Converts VS Code theme JSON files to Signboard CSS variables and OverType theme colors
 */

/**
 * Parse a VS Code theme JSON and extract colors for Signboard
 * @param {Object} vscodeTheme - Parsed VS Code theme JSON
 * @returns {Object} - Signboard theme object with cssVars and overTypeColors
 */
function parseVSCodeTheme(vscodeTheme) {
  const colors = vscodeTheme.colors || {};
  const tokenColors = vscodeTheme.tokenColors || [];
  const isDark = vscodeTheme.type === 'dark';

  // Extract key colors from VS Code theme
  const editorBg = colors['editor.background'] || (isDark ? '#1e1e1e' : '#ffffff');
  const sidebarBg = colors['sideBar.background'] || colors['activityBar.background'] || editorBg;
  const editorFg = colors['editor.foreground'] || (isDark ? '#d4d4d4' : '#333333');
  const mutedFg = colors['editorLineNumber.foreground'] || colors['sideBar.foreground'] || adjustColor(editorFg, isDark ? -30 : 30);
  const borderColor = colors['editorGroup.border'] || colors['sideBar.border'] || adjustColor(editorBg, isDark ? 20 : -15);
  const accentColor = colors['activityBar.activeBorder'] || colors['textLink.foreground'] || colors['button.background'] || '#007acc';
  const selectionBg = colors['editor.selectionBackground'] || (isDark ? '#264f78' : '#add6ff');

  // Find syntax colors from tokenColors
  const syntaxColors = extractSyntaxColors(tokenColors, isDark);

  // Build CSS variables for Signboard
  const cssVars = {
    '--bg': sidebarBg,
    '--bg-card': editorBg,
    '--text': brightenColor(editorFg, isDark ? 20 : 0),
    '--muted': mutedFg,
    '--border': normalizeBorderColor(borderColor, editorBg, isDark),
    '--shadow': isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(15, 23, 42, .04)',
    '--shadow-card': isDark ? 'rgba(0, 0, 0, 0.55)' : 'rgba(15, 23, 42, .08)',
    '--accent': accentColor
  };

  // Build OverType theme colors
  const overTypeColors = {
    bgPrimary: editorBg,
    bgSecondary: sidebarBg,
    text: brightenColor(editorFg, isDark ? 20 : 0),
    strong: brightenColor(editorFg, isDark ? 20 : 0),
    h1: syntaxColors.heading || syntaxColors.string || accentColor,
    h2: syntaxColors.heading || syntaxColors.string || accentColor,
    h3: syntaxColors.heading || syntaxColors.string || accentColor,
    em: syntaxColors.keyword || syntaxColors.emphasis || accentColor,
    link: syntaxColors.link || accentColor,
    code: syntaxColors.constant || syntaxColors.number || editorFg,
    codeBg: addAlpha(adjustColor(editorBg, isDark ? 10 : -10), 0.8),
    blockquote: mutedFg,
    hr: normalizeBorderColor(borderColor, editorBg, isDark),
    syntaxMarker: mutedFg,
    cursor: accentColor,
    selection: addAlpha(selectionBg, 0.6)
  };

  // Scrollbar colors
  const scrollbarColors = {
    thumb: adjustColor(editorBg, isDark ? 30 : -20),
    thumbHover: adjustColor(editorBg, isDark ? 45 : -30)
  };

  return {
    name: vscodeTheme.name || 'Imported Theme',
    type: isDark ? 'dark' : 'light',
    cssVars,
    overTypeColors,
    scrollbarColors,
    raw: vscodeTheme
  };
}

/**
 * Extract syntax highlighting colors from tokenColors
 */
function extractSyntaxColors(tokenColors, isDark) {
  const colors = {
    string: null,
    keyword: null,
    constant: null,
    number: null,
    comment: null,
    function: null,
    link: null,
    heading: null,
    emphasis: null
  };

  for (const token of tokenColors) {
    const scopes = Array.isArray(token.scope) ? token.scope : [token.scope];
    const foreground = token.settings?.foreground;

    if (!foreground) continue;

    for (const scope of scopes) {
      if (!scope) continue;
      
      if (scope.includes('string') && !colors.string) {
        colors.string = foreground;
      }
      if ((scope.includes('keyword') || scope.includes('storage.type')) && !colors.keyword) {
        colors.keyword = foreground;
      }
      if ((scope.includes('constant') || scope.includes('variable.other.property')) && !colors.constant) {
        colors.constant = foreground;
      }
      if (scope.includes('constant.numeric') && !colors.number) {
        colors.number = foreground;
      }
      if (scope.includes('comment') && !colors.comment) {
        colors.comment = foreground;
      }
      if ((scope.includes('entity.name.function') || scope.includes('support.function')) && !colors.function) {
        colors.function = foreground;
      }
      if ((scope.includes('markup.heading') || scope.includes('markdown.heading')) && !colors.heading) {
        colors.heading = foreground;
      }
      if ((scope.includes('markup.italic') || scope.includes('markup.bold')) && !colors.emphasis) {
        colors.emphasis = foreground;
      }
      if ((scope.includes('link') || scope.includes('markup.underline.link')) && !colors.link) {
        colors.link = foreground;
      }
    }
  }

  // Fallbacks
  if (!colors.link) colors.link = colors.function || colors.keyword;
  if (!colors.heading) colors.heading = colors.string;
  if (!colors.emphasis) colors.emphasis = colors.keyword;

  return colors;
}

/**
 * Helper: Adjust color brightness
 */
function adjustColor(hex, amount) {
  hex = hex.replace(/^#/, '');
  
  // Handle shorthand and rgba formats
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  if (hex.length === 8) {
    hex = hex.slice(0, 6); // Remove alpha
  }
  
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));

  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
}

/**
 * Helper: Brighten a color
 */
function brightenColor(hex, amount) {
  return adjustColor(hex, amount);
}

/**
 * Helper: Add alpha to a hex color
 */
function addAlpha(hex, alpha) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  if (hex.length === 8) {
    hex = hex.slice(0, 6);
  }
  
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Helper: Normalize border color (handle transparent borders)
 */
function normalizeBorderColor(borderColor, bgColor, isDark) {
  // If border is mostly transparent, derive from background
  if (borderColor.includes('00000') || borderColor.length > 7) {
    return adjustColor(bgColor, isDark ? 25 : -20);
  }
  return borderColor;
}

// Export for use in other modules
window.ThemeParser = {
  parseVSCodeTheme,
  extractSyntaxColors,
  adjustColor,
  addAlpha
};
