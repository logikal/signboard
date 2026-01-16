const customOverTypeThemes = {
  dark: {
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
  light: {
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
}
};
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme;
    const newTheme = current === 'dark' ? '' : 'dark';
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    
    if ( newTheme == 'dark' ) {
        OverType.setTheme(customOverTypeThemes.dark);
    } else {
        OverType.setTheme(customOverTypeThemes.light);
    }

  });

  window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.dataset.theme = saved;
  });
}