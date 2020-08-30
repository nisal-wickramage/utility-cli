var fs = require('fs');

function moveFile(filename){
  var fileNameParts = filename.split('=>')[1].trim().split(' ');
  fileNameParts.splice(0,1);
  var filenameFilter = fileNameParts.join(' ');

  var sourceDir = '/Users/nisal/Documents/tutorials/Node.js for C# Developers';
  fs.readdir(sourceDir, (err, files) => {
    var matchingFiles = files.filter(file => file.includes(filenameFilter))
    if (matchingFiles.length == 1) {
      var source = sourceDir + '/' + matchingFiles[0];
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
  var sourceDir = '/Users/nisal/Documents/tutorials/Node.js for C# Developers';
  return sourceDir + '/' + filename.split('=>')[0].trim();
}

function getDestinationFilename(filename){
  var sourceDir = '/Users/nisal/Documents/tutorials/Node.js for C# Developers';
  return sourceDir + '/' + filename.split('=>')[0].trim() + '/' + filename.split('=>')[1].trim() + '.mp4';
}

function organize(filename){
  moveFile(filename);
  // fs.rename(getSourcePath(filename), getDestinationPath(filename), () => console.log('copied'));
}

fs.readFile('toc.txt', {encoding:'UTF-8'}, (err, data) => {
  if (err) throw err;
  var textLines = data.split('\n');

  var files = textLines
                .forEach(organize);
});

