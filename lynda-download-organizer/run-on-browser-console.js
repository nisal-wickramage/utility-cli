var chapterElements = document.getElementsByClassName('chapter');
var fileNames = '';
for(var i = 0; i < chapterElements.length;i++){ 
    var chapter = chapterElements[i].getElementsByClassName('chapter__label-more')[0].innerText.trim();
    var chapterParts = chapter.split('.')
    if(chapterParts.length > 1) {
        chapterParts.splice(0,1);
        chapterParts[0] = chapterParts[0].trim();
        chapter = chapterParts.join('.');
    }
    // fileNames += (''+ (i+1)).padStart(2,'0')+ ' ' + chapter + '\n';
    var videos = chapterElements[i].getElementsByClassName('chapter__list')[0].getElementsByClassName('video__title');
    for(var j = 0; j < videos.length ;j++)  {
        fileNames += (''+ (i+1)).padStart(2,'0')+ ' ' + chapter + '\t=> ' + (''+ (j+1)).padStart(2,'0')+ ' ' + videos[j].innerText.trim() + '\n';
    }
}

console.log(fileNames);