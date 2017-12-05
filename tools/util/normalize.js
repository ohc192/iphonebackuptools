const stripAnsi = require('strip-ansi')

module.exports = function normalizeOutput(rows) {
    function padEnd(string, maxLength, fillString) {
        while(stripAnsi(string).length < maxLength) {
            string = string + fillString;
        }    
    
        return string   
    }

    var widths = []

    for(var i = 0; i < rows.length; i++) {
        for(var j = 0; j < rows[i].length; j++) {
            if(!widths[j] || widths[j] < stripAnsi(rows[i][j]).length) {
                widths[j] = stripAnsi(rows[i][j]).length
            }
        }
    }

    for(var i = 0; i < rows.length; i++) {
        for(var j = 0; j < rows[i].length; j++) {
            if(rows[i][j] == '-') {
                rows[i][j] = padEnd(rows[i][j], widths[j], '-')
            } else {
                rows[i][j] = padEnd(rows[i][j], widths[j], ' ')
            }
        }
    }

    return rows
    
}