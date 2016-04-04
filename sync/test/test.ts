/// <reference path="./main.d.ts" />

import parse = require("csv-parse/lib/sync");

console.log("###Test Using the synchronous API###");
let input3 = '"key_1","key_2"\n"value 1","value 2"';
console.log(`#Input3#`);
console.log(input3);
let records:any = parse(input3, {columns: true});
console.log(`#Output3#`);
console.log(records);

console.log("Finished!");
