'use strict';

module.exports = {
    clear_print(str) {
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);  // move cursor to beginning of line
        process.stdout.write(str); // write string
    }
};