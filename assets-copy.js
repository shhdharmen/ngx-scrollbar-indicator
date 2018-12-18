var fs = require('fs');
var ncp = require('ncp').ncp;

var source = './projects/ngx-scrollbar-indicator/src/lib/assets';
var destination = './dist/ngx-scrollbar-indicator/assets';

fs.mkdir(destination, function (err) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log('assets directory created');
  ncp(source, destination, function (err) {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log('assets-copy done!');
  });
});
