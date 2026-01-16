/**
 * Theme Integration
 * Initializes and connects the theme system with the UI
 */

// Initialize theme system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme manager
  if (window.ThemeManager) {
    window.ThemeManager.init();
    setupThemePickerListeners();
  }
});

/**
 * Set up event listeners for theme picker UI
 */
function setupThemePickerListeners() {
  // Theme picker dropdown
  const themePicker = document.getElementById('themePicker');
  if (themePicker) {
    themePicker.addEventListener('change', (e) => {
      window.ThemeManager.onThemePickerChange(e);
    });
  }

  // Import theme button
  const importBtn = document.getElementById('importThemeBtn');
  if (importBtn) {
    importBtn.addEventListener('click', handleImportTheme);
  }
}

/**
 * Handle importing a VS Code theme file
 */
async function handleImportTheme() {
  try {
    // Use the file chooser to select a JSON file
    const filePath = await window.chooser.pickDirectory({ 
      title: 'Select VS Code theme JSON file'
    });
    
    if (!filePath) return;

    // Try to find theme JSON files in the selected directory
    const themeFiles = await window.themeAPI.listThemeFiles(filePath);
    
    if (themeFiles.length === 0) {
      // Maybe they selected a file directly - try to read it
      alert('No theme JSON files found in the selected folder.\n\nLook for files like "theme-color-theme.json" in VS Code extension folders.');
      return;
    }

    // If multiple files, use the first one (could show a picker in future)
    const themeFileName = themeFiles[0];
    const fullPath = filePath + '/' + themeFileName;

    const themeId = await window.ThemeManager.importVSCodeThemeFromFile(fullPath);
    
    if (themeId) {
      window.ThemeManager.applyTheme(themeId);
      console.log(`Imported theme: ${themeId}`);
    }
  } catch (err) {
    console.error('Failed to import theme:', err);
    alert('Failed to import theme. Make sure you selected a valid VS Code theme JSON file.');
  }
}

/**
 * Load board-specific theme when a board is opened
 * This should be called from openBoard.js
 */
async function loadBoardThemeIfPresent(boardPath) {
  if (window.ThemeManager && boardPath) {
    await window.ThemeManager.loadBoardTheme(boardPath);
  }
}

/**
 * Clear board theme when switching boards
 */
function clearBoardTheme() {
  if (window.ThemeManager) {
    window.ThemeManager.clearBoardTheme();
  }
}

// Expose functions globally for use by other modules
window.loadBoardThemeIfPresent = loadBoardThemeIfPresent;
window.clearBoardTheme = clearBoardTheme;
