
var coloredParagraph = "";

//Oh man - must refactor....
function postParagraph(posArray, negArray){
  var text = $('#paragraph').val();
  var textCopy = text.split(/\W+/);
  // var coloredParagraph = "";
  // var index;
  var count = 0;
  //loop through the text, and each time assign index to the tC[i], and make sure count is reset at 0
  for (var i = 0; i < textCopy.length; i++) {
    // console.log(textCopy[i], "POS ARR i")
    // index = textCopy[i];
    count = 0;
    //check to see if textCopy word matches any words in the posArray
    for (var j = 0; j < posArray.length; j++) {
      //if there's a match, add the word to the new paragraph
      if(textCopy[i]===posArray[j]){
        coloredParagraph += " " + '<span class="green">' +posArray[j].toUpperCase()+'</span>';
      } else {
      // if there's not a match, increment the counter
        count ++;
        //if the counter ends up as the same length as the array, ** reset the counter, and then search the neg array**
        if(count === posArray.length){
          count = 0;
          //start looping through the neg array
          for (var k = 0; k < negArray.length; k++) {
            //if there's a match, add the word to the new p
            if(textCopy[i]===negArray[k]){
              coloredParagraph += " " + '<span class="red">' + negArray[k].toUpperCase()+'</span>';
            } else {
            //if no match, increment the counter
              count++;
              //when the counter reaches the same as the neg Array
              if(count === negArray.length){
              //reset the count and add the original word to the new paragraph with no styling
                count = 0;
                coloredParagraph += " " + textCopy[i];
              }
            }
          }
        }
      }
    }
  }
  return coloredParagraph;
  // $('#result-paragraph').append(coloredParagraph);
}





// x[0].sentiment.type



