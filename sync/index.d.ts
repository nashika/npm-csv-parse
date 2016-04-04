import parseOriginal = require("csv-parse");

declare function parse(data:string, options?:parseOriginal.ICsvParseOpts):parseOriginal.CsvParseResultType;

export = parse;
