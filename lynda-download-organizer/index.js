var fs = require('fs');

var sourceDir = 'C:\\nisal\\downloads\\software-testing-planning-tests-for-mobile';
var pathSeperator = '\\';

function moveFile(filename){
  var fileNameParts = filename.split('=>')[1].trim().split(' ');
  fileNameParts.splice(0,1);
  var filenameFilter = fileNameParts.join(' ');

  fs.readdir(sourceDir, (err, files) => {
    var matchingFiles = files.filter(file => file.includes(filenameFilter))
    if (matchingFiles.length == 1) {
      var source = sourceDir + pathSeperator + matchingFiles[0];
      var destinationPath = getDestinationPath(filename);
      var destinationFilename = getDestinationFilename(filename);
      fs.mkdir(destinationPath, (err) => {
        fs.rename(source, destinationFilename,(err) => console.log(source + ' => ' + destinationFilename));
      });
    } else {
      console.log('no match for ' + filename);
    }
  });
}

function getDestinationPath(filename){
  return sourceDir + pathSeperator + filename.split('=>')[0].trim();
}

function getDestinationFilename(filename){
  return sourceDir + pathSeperator + filename.split('=>')[0].trim() + pathSeperator + filename.split('=>')[1].trim() + '.mp4';
}

function organize(filename){
  filename = filename.replace('?', '');
  filename = filename.replace(':', ' -');
  filename = filename.replace('/', '_');
  moveFile(filename);
  // fs.rename(getSourcePath(filename), getDestinationPath(filename), () => console.log('copied'));
}

fs.readFile('toc.txt', {encoding:'UTF-8'}, (err, data) => {
  if (err) throw err;
  var textLines = data.split('\n');

  var files = textLines
                .forEach(organize);
});

