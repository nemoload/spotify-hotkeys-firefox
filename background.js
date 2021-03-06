function runCommand(command) {
    browser.tabs.query({ url: 'https://*.spotify.com/*' }, (tabs) => {

        // Open a spotify tab if one does not exist yet.
        if (tabs.length === 0) {
            browser.tabs.create({ url: 'https://open.spotify.com' });
        }

        // Apply command
        for (let tab of tabs) {
            let code = "";
            if (tab.url.startsWith('https://play.spotify.com')) {
                code = "document.getElementById('app-player').contentDocument.getElementById('" + command + "').click()";
            }
            else if (tab.url.startsWith('https://open.spotify.com')) {
                switch (command) {
                    case "play-pause": 
                        code = '(document.querySelector(".spoticon-play-16") || document.querySelector(".spoticon-pause-16")).click()';
                        break;
                    case "next":
                        code = 'document.querySelector(".spoticon-skip-forward-16").click()';
                        break;
                    case "previous":
                        code = 'document.querySelector(".spoticon-skip-back-16").click()';
                        break;
                    case "shuffle":
                        code = 'document.querySelector(".spoticon-shuffle-16").click()';
                        break;
                    case "repeat":
                        code = '(document.querySelector(".spoticon-repeat-16") || document.querySelector(".spoticon-repeatonce-16")).click()';
                        break;
                    case "play-album":
                        code = 'document.querySelector(".btn-green").click()';
                        break;
                }
            }
            if (code.length) {
                browser.tabs.executeScript(tab.id, {code: code});
            }
        }
    });
}

/**
 * Fired when a registered command is activated using a keyboard shortcut.
 */
browser.commands.onCommand.addListener(runCommand);
browser.runtime.onMessage.addListener(runCommand);