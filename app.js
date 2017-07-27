const BigMap = require('big-map');
const v8 = require('v8');
v8.setFlagsFromString('--max_old_space_size=4096');

const scope = {
    nums: new BigMap(5, 1),
    cursor: new Array(5),
    counter: 0,
    chars: 'abcdefghijklmnopqrstuvwxyz1234567890'.split("")
}

'use strict';
function gen(index) {
    if (index < this.cursor.length) {
        for (let i = 0; i < this.chars.length; i++) {
            this.cursor[index] = this.chars[i];
            this.counter++;
            this.counter % 100000 === 0 && process.stdout.write((this.counter).toString() + "\r")
            this.nums.set(this.cursor.join(""), "")
            gen.call(this, index + 1);
        }
    }
}
gen.call(scope, 0);
