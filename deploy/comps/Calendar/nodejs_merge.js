var _fs = require('fs');

var _dir = __dirname + '/'
    , _paths = []
    , _contents = []
    , _outputName = 'Calendar.js'
    ;

    _paths.push( _dir + 'Calendar.date.js' );
    _paths.push( _dir + 'Calendar.week.js' );
    _paths.push( _dir + 'Calendar.month.js' );
    _paths.push( _dir + 'Calendar.season.js' );
    _paths.push( _dir + 'Calendar.year.js' );
    _paths.push( _dir + 'Calendar.monthday.js' );

for( var i = 0, j = _paths.length; i < j; i++ ){
    if( ! _fs.existsSync( _paths[i] )  ) return;
}

for( var i = 0, j = _paths.length; i < j; i++ ){
    _contents.push( _fs.readFileSync( _paths[i], 'utf8') );
}

_fs.writeFileSync( _dir + _outputName, _contents.join(';\n') );

for( var i = 0, j = _paths.length; i < j; i++ ){
    _fs.unlinkSync( _paths[i] );
}

console.log( 'merge done: ' + _outputName );


