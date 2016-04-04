/// <reference path="./main.d.ts" />

import parse = require("csv-parse");

test1();

function test1() {
  let input = '#Welcome\n"1","2","3","4"\n"a","b","c","d"';
  console.log("###Test using the callback API###");
  console.log(`#Input1#`);
  console.log(input);
  parse(input, {comment: '#'}, (err, output1:Array<Array<string>>) => {
    console.log(`#Output1#`);
    console.log(output1);
    test2();
  });
}

function test2() {
  console.log("###Test using the stream API###");
  let output2:Array<any> = [];
  let parser = parse({delimiter: ':'});

  parser.on('readable', () => {
    let record:any;
    while (record = parser.read()) {
      output2.push(record);
    }
  });
  parser.on('error', (err:Error) => {
    console.log(err.message);
  });
  parser.on('finish', () => {
    console.log(`#Output2#`);
    console.log(output2);
    test3();
  });
  let input2:Array<string> = [
    "root:x:0:0:root:/root:/bin/bash\n",
    "someone:x:1022:1022:a funny cat:/home/someone:/bin/bash\n",
  ];
  console.log(`#Input2#`);
  console.log(input2[0]);
  console.log(input2[1]);
  parser.write(input2[0]);
  parser.write(input2[1]);
  parser.end();
}

function test3() {
/*  console.log("###Test Using the synchronous API###");
  let input3 = '"key_1","key_2"\n"value 1","value 2"';
  console.log(`#Input3#`);
  console.log(input3);
  let records:any = parseSync(input3, {columns: true});
  console.log(`#Output3#`);
  console.log(records);

  console.log("Finished!");*/
}
