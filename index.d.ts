declare module csv_parse_common {

  export interface IParseOpts {

    /**
     * Set the field delimiter. One character only, defaults to comma.
     */
    delimiter?:string;

    /**
     * String used to delimit record rows or a special value;
     * special constants are 'auto', 'unix', 'mac', 'windows', 'unicode';
     * defaults to 'auto' (discovered in source or 'unix' if no source is specified).
     */
    rowDelimiter?:string;

    /**
     * Optionnal character surrounding a field, one character only, defaults to double quotes.
     */
    quote?:string;

    /**
     * Set the escape character, one character only, defaults to double quotes.
     */
    escape?:string;

    /**
     * List of fields as an array,
     * a user defined callback accepting the first line and returning the column names or true
     * if autodiscovered in the first CSV line,
     * default to null,
     * affect the result data set in the sense that records will be objects instead of arrays.
     */
    columns?:Array<string>|boolean|Function;

    /**
     * Treat all the characters after this one as a comment, default to '' (disabled).
     */
    comment?:string;

    /**
     * Name of header-record title to name objects by.
     */
    objname?:string;

    /**
     * Preserve quotes inside unquoted field.
     */
    relax?:boolean;

    /**
     * Dont generate empty values for empty lines.
     */
    skip_empty_lines?:boolean;

    /**
     * If true, ignore whitespace immediately around the delimiter, defaults to false. Does not remove whitespace in a quoted field.
     */
    trim?:boolean;

    /**
     * If true, ignore whitespace immediately following the delimiter (i.e. left-trim all fields), defaults to false. Does not remove whitespace in a quoted field.
     */
    ltrim?:boolean;

    /**
     * If true, ignore whitespace immediately preceding the delimiter (i.e. right-trim all fields), defaults to false. Does not remove whitespace in a quoted field.
     */
    rtrim?:boolean;

    /**
     * If true, the parser will attempt to convert read data types to native types.
     */
    auto_parse?:boolean;

    /**
     * If true, the parser will attempt to convert read data types to dates. It requires the "auto_parse" option.
     */
    auto_parse_date?:boolean;

  }

  type ParseResultType = Array<Array<any>>|Array<{[key:string]:any}>;
  
  type ParseCallbackType = (err:Error, output:ParseResultType)=>void;

  export interface Parser extends NodeJS.ReadWriteStream {

    // Parser stream takes array of strings
    write(data:string):boolean;

    // repeat declarations from NodeJS.WritableStream to avoid compile error
    write(buffer:Buffer, cb?:Function):boolean;
    write(str:string, cb?:Function):boolean;
    write(str:string, encoding?:string, cb?:Function):boolean;
  }

}

declare module "csv-parse" {

  namespace csv_parse {
    function parse(data:string, options:csv_parse_common.IParseOpts, callback:csv_parse_common.ParseCallbackType):void;
    function parse(data:string, callback:csv_parse_common.ParseCallbackType):void;
    function parse(options?:csv_parse_common.IParseOpts):csv_parse_common.Parser;
    function parse(dataOrOptions:string|csv_parse_common.IParseOpts, optionsOrCallback?:csv_parse_common.IParseOpts|csv_parse_common.ParseCallbackType, callback?:csv_parse_common.ParseCallbackType):void|csv_parse_common.Parser;
  }

  export = csv_parse.parse;

}

declare module "csv-parse/lib/sync" {

  function parse(data:string, options?:csv_parse_common.IParseOpts):csv_parse_common.ParseResultType;

  export = parse;

}
