/**
 * Theme Manager
 * Handles built-in themes, custom theme imports, and theme switching
 */

const ThemeManager = {
  // Currently applied theme ID
  currentThemeId: 'light',
  
  // All available themes (built-in + imported)
  themes: {},

  // Board-level custom theme (if loaded)
  boardTheme: null,

  /**
   * Initialize the theme manager with built-in themes
   */
  init() {
    // Register built-in themes
    this.registerBuiltInThemes();
    
    // Load saved theme preference
    const savedThemeId = localStorage.getItem('signboard-theme') || 'light';
    
    // Apply the theme (will be overridden if board has custom theme)
    this.applyTheme(savedThemeId);
  },

  /**
   * Register all built-in themes
   */
  registerBuiltInThemes() {
    // Light theme (default)
    this.themes['light'] = {
      id: 'light',
      name: 'Light',
      type: 'light',
      builtin: true,
      cssVars: {
        '--bg': '#f7f8fa',
        '--bg-card': '#ffffff',
        '--text': '#0f172a',
        '--muted': '#636e7b',
        '--border': '#e6e8ec',
        '--shadow': 'rgba(15, 23, 42, .04)',
        '--shadow-card': 'rgba(15, 23, 42, .08)',
        '--accent': '#0b5fff'
      },
      overTypeColors: {
        name: 'lite',
        colors: {
          bgPrimary: '#ffffff',
          bgSecondary: '#ffffff',
          text: '#2f2f2f',
          strong: '#000000',
          h1: '#2f2f2f',
          h2: '#2f2f2f',
          h3: '#2f2f2f',
          em: '#444444',
          link: '#3366cc',
          code: '#111111',
          codeBg: '#dedadaff',
          blockquote: '#666666',
          hr: '#e0e0e0',
          syntaxMarker: '#999999',
          cursor: '#000000',
          selection: 'rgba(215, 227, 244, 0.4)'
        }
      },
      scrollbarColors: {
        thumb: '#d7dae0',
        thumbHover: '#c8cbd2'
      }
    };

    // Copilot Dark theme
    this.themes['copilot-dark'] = {
      id: 'copilot-dark',
      name: 'Copilot Dark',
      type: 'dark',
      builtin: true,
      cssVars: {
        '--bg': '#1a2023',
        '--bg-card': '#232a2f',
        '--text': '#d4dce4',
        '--muted': '#939da5',
        '--border': '#2d363d',
        '--shadow': 'rgba(0, 0, 0, 0.45)',
        '--shadow-card': 'rgba(0, 0, 0, 0.55)',
        '--accent': '#89ddff'
      },
      overTypeColors: {
        name: 'dark',
        colors: {
          bgPrimary: '#232a2f',
          bgSecondary: '#1a2023',
          text: '#d4dce4',
          strong: '#d4dce4',
          h1: '#5bec95',
          h2: '#5bec95',
          h3: '#5bec95',
          em: '#ba8ef7',
          link: '#89ddff',
          code: '#ffa763',
          codeBg: 'rgba(35, 42, 47, 0.8)',
          blockquote: '#707a84',
          hr: '#3d464d',
          syntaxMarker: '#707a84',
          cursor: '#89ddff',
          selection: 'rgba(32, 64, 98, 0.6)'
        }
      },
      scrollbarColors: {
        thumb: '#3d464d',
        thumbHover: '#505a63'
      }
    };

    // One Dark Pro theme
    this.themes['one-dark'] = {
      id: 'one-dark',
      name: 'One Dark',
      type: 'dark',
      builtin: true,
      cssVars: {
        '--bg': '#21252b',
        '--bg-card': '#282c34',
        '--text': '#abb2bf',
        '--muted': '#5c6370',
        '--border': '#3e4451',
        '--shadow': 'rgba(0, 0, 0, 0.45)',
        '--shadow-card': 'rgba(0, 0, 0, 0.55)',
        '--accent': '#61afef'
      },
      overTypeColors: {
        name: 'dark',
        colors: {
          bgPrimary: '#282c34',
          bgSecondary: '#21252b',
          text: '#abb2bf',
          strong: '#abb2bf',
          h1: '#e5c07b',
          h2: '#e5c07b',
          h3: '#e5c07b',
          em: '#c678dd',
          link: '#61afef',
          code: '#d19a66',
          codeBg: 'rgba(40, 44, 52, 0.8)',
          blockquote: '#5c6370',
          hr: '#3e4451',
          syntaxMarker: '#5c6370',
          cursor: '#528bff',
          selection: 'rgba(62, 68, 81, 0.6)'
        }
      },
      scrollbarColors: {
        thumb: '#4b5263',
        thumbHover: '#5c6370'
      }
    };

    // Dracula theme
    this.themes['dracula'] = {
      id: 'dracula',
      name: 'Dracula',
      type: 'dark',
      builtin: true,
      cssVars: {
        '--bg': '#21222c',
        '--bg-card': '#282a36',
        '--text': '#f8f8f2',
        '--muted': '#6272a4',
        '--border': '#44475a',
        '--shadow': 'rgba(0, 0, 0, 0.45)',
        '--shadow-card': 'rgba(0, 0, 0, 0.55)',
        '--accent': '#bd93f9'
      },
      overTypeColors: {
        name: 'dark',
        colors: {
          bgPrimary: '#282a36',
          bgSecondary: '#21222c',
          text: '#f8f8f2',
          strong: '#f8f8f2',
          h1: '#ff79c6',
          h2: '#ff79c6',
          h3: '#ff79c6',
          em: '#bd93f9',
          link: '#8be9fd',
          code: '#ffb86c',
          codeBg: 'rgba(40, 42, 54, 0.8)',
          blockquote: '#6272a4',
          hr: '#44475a',
          syntaxMarker: '#6272a4',
          cursor: '#f8f8f2',
          selection: 'rgba(68, 71, 90, 0.6)'
        }
      },
      scrollbarColors: {
        thumb: '#44475a',
        thumbHover: '#6272a4'
      }
    };

    // Solarized Dark theme
    this.themes['solarized-dark'] = {
      id: 'solarized-dark',
      name: 'Solarized Dark',
      type: 'dark',
      builtin: true,
      cssVars: {
        '--bg': '#002b36',
        '--bg-card': '#073642',
        '--text': '#839496',
        '--muted': '#586e75',
        '--border': '#094656',
        '--shadow': 'rgba(0, 0, 0, 0.45)',
        '--shadow-card': 'rgba(0, 0, 0, 0.55)',
        '--accent': '#268bd2'
      },
      overTypeColors: {
        name: 'dark',
        colors: {
          bgPrimary: '#073642',
          bgSecondary: '#002b36',
          text: '#839496',
          strong: '#93a1a1',
          h1: '#b58900',
          h2: '#b58900',
          h3: '#b58900',
          em: '#6c71c4',
          link: '#268bd2',
          code: '#cb4b16',
          codeBg: 'rgba(7, 54, 66, 0.8)',
          blockquote: '#586e75',
          hr: '#094656',
          syntaxMarker: '#586e75',
          cursor: '#839496',
          selection: 'rgba(38, 139, 210, 0.3)'
        }
      },
      scrollbarColors: {
        thumb: '#094656',
        thumbHover: '#0a5568'
      }
    };

    // Solarized Light theme
    this.themes['solarized-light'] = {
      id: 'solarized-light',
      name: 'Solarized Light',
      type: 'light',
      builtin: true,
      cssVars: {
        '--bg': '#fdf6e3',
        '--bg-card': '#eee8d5',
        '--text': '#657b83',
        '--muted': '#93a1a1',
        '--border': '#ddd6c1',
        '--shadow': 'rgba(0, 0, 0, 0.08)',
        '--shadow-card': 'rgba(0, 0, 0, 0.12)',
        '--accent': '#268bd2'
      },
      overTypeColors: {
        name: 'lite',
        colors: {
          bgPrimary: '#eee8d5',
          bgSecondary: '#fdf6e3',
          text: '#657b83',
          strong: '#586e75',
          h1: '#b58900',
          h2: '#b58900',
          h3: '#b58900',
          em: '#6c71c4',
          link: '#268bd2',
          code: '#cb4b16',
          codeBg: 'rgba(238, 232, 213, 0.8)',
          blockquote: '#93a1a1',
          hr: '#ddd6c1',
          syntaxMarker: '#93a1a1',
          cursor: '#657b83',
          selection: 'rgba(38, 139, 210, 0.2)'
        }
      },
      scrollbarColors: {
        thumb: '#d4cdb7',
        thumbHover: '#c9c2ac'
      }
    };

    // Nord theme
    this.themes['nord'] = {
      id: 'nord',
      name: 'Nord',
      type: 'dark',
      builtin: true,
      cssVars: {
        '--bg': '#2e3440',
        '--bg-card': '#3b4252',
        '--text': '#eceff4',
        '--muted': '#a5abb6',
        '--border': '#4c566a',
        '--shadow': 'rgba(0, 0, 0, 0.45)',
        '--shadow-card': 'rgba(0, 0, 0, 0.55)',
        '--accent': '#88c0d0'
      },
      overTypeColors: {
        name: 'dark',
        colors: {
          bgPrimary: '#3b4252',
          bgSecondary: '#2e3440',
          text: '#eceff4',
          strong: '#eceff4',
          h1: '#8fbcbb',
          h2: '#8fbcbb',
          h3: '#8fbcbb',
          em: '#b48ead',
          link: '#88c0d0',
          code: '#d08770',
          codeBg: 'rgba(59, 66, 82, 0.8)',
          blockquote: '#a5abb6',
          hr: '#4c566a',
          syntaxMarker: '#a5abb6',
          cursor: '#d8dee9',
          selection: 'rgba(67, 76, 94, 0.6)'
        }
      },
      scrollbarColors: {
        thumb: '#4c566a',
        thumbHover: '#5e6779'
      }
    };

    // GitHub Dark theme
    this.themes['github-dark'] = {
      id: 'github-dark',
      name: 'GitHub Dark',
      type: 'dark',
      builtin: true,
      cssVars: {
        '--bg': '#0d1117',
        '--bg-card': '#161b22',
        '--text': '#c9d1d9',
        '--muted': '#8b949e',
        '--border': '#30363d',
        '--shadow': 'rgba(0, 0, 0, 0.45)',
        '--shadow-card': 'rgba(0, 0, 0, 0.55)',
        '--accent': '#58a6ff'
      },
      overTypeColors: {
        name: 'dark',
        colors: {
          bgPrimary: '#161b22',
          bgSecondary: '#0d1117',
          text: '#c9d1d9',
          strong: '#c9d1d9',
          h1: '#79c0ff',
          h2: '#79c0ff',
          h3: '#79c0ff',
          em: '#d2a8ff',
          link: '#58a6ff',
          code: '#ffa657',
          codeBg: 'rgba(22, 27, 34, 0.8)',
          blockquote: '#8b949e',
          hr: '#30363d',
          syntaxMarker: '#8b949e',
          cursor: '#58a6ff',
          selection: 'rgba(56, 139, 253, 0.3)'
        }
      },
      scrollbarColors: {
        thumb: '#30363d',
        thumbHover: '#484f58'
      }
    };
  },

  /**
   * Apply a theme by ID
   */
  applyTheme(themeId) {
    const theme = this.themes[themeId];
    if (!theme) {
      console.warn(`Theme "${themeId}" not found, falling back to light`);
      this.applyTheme('light');
      return;
    }

    this.currentThemeId = themeId;
    
    // Set data-theme attribute for dark/light base styling
    document.documentElement.dataset.theme = theme.type === 'dark' ? 'dark' : '';

    // Apply CSS variables
    const root = document.documentElement;
    for (const [property, value] of Object.entries(theme.cssVars)) {
      root.style.setProperty(property, value);
    }

    // Apply scrollbar colors
    this.applyScrollbarColors(theme.scrollbarColors, theme.type === 'dark');

    // Apply OverType theme if available
    if (typeof OverType !== 'undefined' && theme.overTypeColors) {
      OverType.setTheme(theme.overTypeColors);
    }

    // Save preference
    localStorage.setItem('signboard-theme', themeId);

    // Update theme picker if it exists
    this.updateThemePicker();
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { themeId, theme } }));
  },

  /**
   * Apply scrollbar colors via dynamic stylesheet
   */
  applyScrollbarColors(colors, isDark) {
    let styleEl = document.getElementById('theme-scrollbar-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'theme-scrollbar-styles';
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = `
      *::-webkit-scrollbar-thumb { background: ${colors.thumb}; }
      *::-webkit-scrollbar-thumb:hover { background: ${colors.thumbHover}; }
    `;
  },

  /**
   * Import a VS Code theme from JSON
   */
  importVSCodeTheme(themeJson, customId = null) {
    if (!window.ThemeParser) {
      console.error('ThemeParser not loaded');
      return null;
    }

    const parsed = window.ThemeParser.parseVSCodeTheme(themeJson);
    const id = customId || 'custom-' + Date.now();

    const theme = {
      id,
      name: parsed.name,
      type: parsed.type,
      builtin: false,
      cssVars: parsed.cssVars,
      overTypeColors: {
        name: parsed.type,
        colors: parsed.overTypeColors
      },
      scrollbarColors: parsed.scrollbarColors,
      raw: parsed.raw
    };

    this.themes[id] = theme;
    this.updateThemePicker();

    return id;
  },

  /**
   * Import a VS Code theme from a file path
   */
  async importVSCodeThemeFromFile(filePath) {
    try {
      const content = await window.themeAPI.readThemeFile(filePath);
      const themeJson = JSON.parse(content);
      return this.importVSCodeTheme(themeJson);
    } catch (err) {
      console.error('Failed to import theme from file:', err);
      return null;
    }
  },

  /**
   * Load board-level theme if present
   */
  async loadBoardTheme(boardPath) {
    if (!boardPath) return false;

    // Look for theme files in order of priority
    const themeFileNames = [
      'signboard-theme.json',
      '.signboard-theme.json',
      'vscode-theme.json',
      '.vscode-theme.json'
    ];

    for (const fileName of themeFileNames) {
      try {
        const themePath = boardPath + '/' + fileName;
        const exists = await window.themeAPI.fileExists(themePath);
        
        if (exists) {
          const content = await window.themeAPI.readThemeFile(themePath);
          const themeJson = JSON.parse(content);
          
          // Import as board theme
          const themeId = this.importVSCodeTheme(themeJson, 'board-theme');
          if (themeId) {
            this.themes[themeId].name = themeJson.name || 'Board Theme';
            this.themes[themeId].isBoardTheme = true;
            this.boardTheme = themeId;
            this.applyTheme(themeId);
            console.log(`Loaded board theme from ${fileName}`);
            return true;
          }
        }
      } catch (err) {
        // File doesn't exist or can't be read, continue to next
      }
    }

    return false;
  },

  /**
   * Clear board theme and revert to saved preference
   */
  clearBoardTheme() {
    if (this.boardTheme && this.themes[this.boardTheme]) {
      delete this.themes[this.boardTheme];
      this.boardTheme = null;
      
      // Revert to saved preference
      const savedThemeId = localStorage.getItem('signboard-theme') || 'light';
      this.applyTheme(savedThemeId);
      this.updateThemePicker();
    }
  },

  /**
   * Get list of all available themes for picker
   */
  getThemeList() {
    return Object.values(this.themes).map(theme => ({
      id: theme.id,
      name: theme.name,
      type: theme.type,
      builtin: theme.builtin,
      isBoardTheme: theme.isBoardTheme || false
    }));
  },

  /**
   * Update the theme picker UI
   */
  updateThemePicker() {
    const picker = document.getElementById('themePicker');
    if (!picker) return;

    // Clear existing options
    picker.innerHTML = '';

    // Group themes
    const builtinLight = [];
    const builtinDark = [];
    const custom = [];

    for (const theme of Object.values(this.themes)) {
      if (theme.isBoardTheme) {
        custom.unshift(theme); // Board theme first
      } else if (theme.builtin) {
        if (theme.type === 'light') {
          builtinLight.push(theme);
        } else {
          builtinDark.push(theme);
        }
      } else {
        custom.push(theme);
      }
    }

    // Add light themes group
    if (builtinLight.length > 0) {
      const lightGroup = document.createElement('optgroup');
      lightGroup.label = '☀️ Light';
      for (const theme of builtinLight) {
        const option = document.createElement('option');
        option.value = theme.id;
        option.textContent = theme.name;
        if (theme.id === this.currentThemeId) option.selected = true;
        lightGroup.appendChild(option);
      }
      picker.appendChild(lightGroup);
    }

    // Add dark themes group
    if (builtinDark.length > 0) {
      const darkGroup = document.createElement('optgroup');
      darkGroup.label = '🌙 Dark';
      for (const theme of builtinDark) {
        const option = document.createElement('option');
        option.value = theme.id;
        option.textContent = theme.name;
        if (theme.id === this.currentThemeId) option.selected = true;
        darkGroup.appendChild(option);
      }
      picker.appendChild(darkGroup);
    }

    // Add custom/board themes group
    if (custom.length > 0) {
      const customGroup = document.createElement('optgroup');
      customGroup.label = '✨ Custom';
      for (const theme of custom) {
        const option = document.createElement('option');
        option.value = theme.id;
        option.textContent = theme.isBoardTheme ? `📁 ${theme.name}` : theme.name;
        if (theme.id === this.currentThemeId) option.selected = true;
        customGroup.appendChild(option);
      }
      picker.appendChild(customGroup);
    }
  },

  /**
   * Handle theme picker change
   */
  onThemePickerChange(event) {
    const themeId = event.target.value;
    this.applyTheme(themeId);
  },

  /**
   * Export current theme configuration
   */
  exportTheme(themeId) {
    const theme = this.themes[themeId];
    if (!theme) return null;

    return {
      name: theme.name,
      type: theme.type,
      colors: theme.cssVars,
      overTypeColors: theme.overTypeColors?.colors || {}
    };
  }
};

// Make globally available
window.ThemeManager = ThemeManager;
