// $(document).on('ready', function() {
//   console.log('sanity check!');

// });



// $('#paragraph-submit').on('click', function(){
//   console.log("HERERERERERER");
//   var text = $('#paragraph').val();
//   // console.log(text, "TEXTs");
//   //making a get request to server, and passing it the paragraph text - the data is the res.json(result) from the server side.
//   $.get('/analyze/'+ text, function(data){
//     // console.log(data[0]);
//     //make functions and call them in here with data as the parameters
//     sortSentiment(data);
//   });
// });

// change this to just push the objects of pos or neg into a single array
function sortSentiment(data){
  var textS = $('#paragraph').val();
  var positiveWords = [];
  var negativeWords = [];
  for (var i = 0; i < data.length; i++) {
    if(data[i].sentiment.type === "positive"){
      positiveWords.push(data[i].text);
    } else if (data[i].sentiment.type === "negative"){
      negativeWords.push(data[i].text);
    }
  }
  var positive = positiveWords.join(' ').split(' ');
  var negative = negativeWords.join(' ').split(' ');
   postParagraph(positive, negative);
   return positive, negative;
}

//Oh man - must refactor....
function postParagraph(posArray, negArray){
  var text = $('#paragraph').val();
  var textCopy = text.split(/\W+/);
  var coloredParagraph = "";
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
  // console.log(coloredParagraph, "Out");
  $('#result-paragraph').append(coloredParagraph);
}








//What to do about punctuation?


// x[0].sentiment.type



