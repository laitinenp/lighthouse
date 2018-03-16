var b = require('bonescript');
 
b.pinMode('P8_12', b.INPUT);
b.pinMode('P8_13', b.OUTPUT);
 
setInterval(copyInputToOutput, 100);
 
function copyInputToOutput() {
    b.digitalRead('P8_12', writeToOutput);
    function writeToOutput(x) {
console.log("w: " + x.value);
        b.digitalWrite('P8_13', x.value);
    }
}

