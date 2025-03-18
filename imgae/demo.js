Element.prototype.ImageTo2Bit = function() {
  var img = this,canvas = document.createElement("canvas"),ctx = canvas.getContext('2d');
  ctx.width = canvas.width = img.width;
  ctx.height = canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width , img.height);
  var image_data = ctx.getImageData(0, 0, img.width, img.height).data;
  console.log(image_data);
  var result=[];
  for(var i = 0; i < image_data.length; i=i+4){
    var luma = 0.2126 * image_data[i] + 0.7152 * image_data[i+1] + 0.0722 * image_data[i+2];
    if (luma > 200) result.push('1');
    else result.push('0');
  }
  var array=listToMatrix(result,img.width).map(a => [a.join('')]);
  array = array.concat.apply([],array);
  return array.join('\n');
};


function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;
    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        } matrix[k].push(list[i]);
    } return matrix;
}

var img = new Image();
img.src= 'NARUTO.jpg';
img.onload = function() {
  img.width=Math.round(img.width/7);
  img.height=Math.round(img.height/7);
  console.log(img.ImageTo2Bit());
};