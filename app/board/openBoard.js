async function openBoard( dir ) {
    // Clear any previous board theme before loading new board
    if (window.clearBoardTheme) {
        window.clearBoardTheme();
    }

    const directories = await window.board.listDirectories( dir );

    if ( directories.length == 0 ) {
        await window.board.createList( dir + '/000-To-do-stock');
        await window.board.createList( dir + '/001-Doing-stock');
        await window.board.createList( dir + '/002-Done-stock');
        await window.board.createList( dir + '/003-On-hold-stock');
        await window.board.createList( dir + '/XXX-Archive');

        await window.board.createCard( dir + '/000-To-do-stock/000-hello-stock.md', `👋 Hello

Welcome to Signboard! This card is your first task. Tap on it to view more or edit.

- Create new cards by clicking the + button on any list
- Edit the title or notes on any card by tapping on it
- Reorder cards in a list or move them between lists by dragging them
- Archive a card by tapping on it and tapping the archive icon
- Reorder lists by dragging them
- Create new lists by clicking the "+ Add List" button

***Keyboard Shortcuts***

Control button on Windows. Command button on macOS.

- CMD + N - New card or task (with the ability to choose list)
- CMD + Shift + N - New list
- Escape - Dismiss all open modals

**Themes**

You can choose from several built-in themes using the theme picker in the header.
To use a custom VS Code theme, place a theme JSON file named "signboard-theme.json" 
in your board folder and it will be automatically applied.

I hope you enjoy Signboard. If you have any feedback, please let me know. colin@cdevroe.com` );
    }

    window.boardRoot = dir + '/';
    localStorage.setItem('boardPath',window.boardRoot);
    
    // Load board-specific theme if present (e.g., signboard-theme.json in board root)
    if (window.loadBoardThemeIfPresent) {
        await window.loadBoardThemeIfPresent(dir);
    }
    
    await renderBoard();
    
}