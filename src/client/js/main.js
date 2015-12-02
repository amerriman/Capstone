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
var coloredParagraph = "";

// change this to just push the objects of pos or neg into a single array - moved to angular directive
// function sortSentiment(data){
//   var textS = $('#paragraph').val();
//   // console.log(textS, 'text S');
//   var positiveWords = [];
//   var negativeWords = [];
//   for (var i = 0; i < data.length; i++) {
//     if(data[i].sentiment.type === "positive"){
//       positiveWords.push(data[i].text);
//     } else if (data[i].sentiment.type === "negative"){
//       negativeWords.push(data[i].text);
//     }
//   }
//   var positive = positiveWords.join(' ').split(' ');
//   var negative = negativeWords.join(' ').split(' ');
//   // console.log(positive, "positive", negative, "negative")
//    postParagraph(positive, negative);
//    return positive, negative;
// }


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

// function writingData(){

// }

// /*---LEFT BAR ACCORDION----*/
// $(function() {
//     $('#nav-accordion').dcAccordion({
//         eventType: 'click',
//         autoClose: true,
//         saveState: true,
//         disableLink: true,
//         speed: 'slow',
//         showCount: false,
//         autoExpand: true,
// //        cookie: 'dcjq-accordion-1',
//         classExpand: 'dcjq-current-parent'
//     });
// });

// var Script = function () {


// //    sidebar dropdown menu auto scrolling

//     jQuery('#sidebar .sub-menu > a').click(function () {
//         var o = ($(this).offset());
//         diff = 250 - o.top;
//         if(diff>0)
//             $("#sidebar").scrollTo("-="+Math.abs(diff),500);
//         else
//             $("#sidebar").scrollTo("+="+Math.abs(diff),500);
//     });



// //    sidebar toggle

//     $(function() {
//         function responsiveView() {
//             var wSize = $(window).width();
//             if (wSize <= 768) {
//                 $('#container').addClass('sidebar-close');
//                 $('#sidebar > ul').hide();
//             }

//             if (wSize > 768) {
//                 $('#container').removeClass('sidebar-close');
//                 $('#sidebar > ul').show();
//             }
//         }
//         $(window).on('load', responsiveView);
//         $(window).on('resize', responsiveView);
//     });

//     $('.fa-bars').click(function () {
//         if ($('#sidebar > ul').is(":visible") === true) {
//             $('#main-content').css({
//                 'margin-left': '0px'
//             });
//             $('#sidebar').css({
//                 'margin-left': '-210px'
//             });
//             $('#sidebar > ul').hide();
//             $("#container").addClass("sidebar-closed");
//         } else {
//             $('#main-content').css({
//                 'margin-left': '210px'
//             });
//             $('#sidebar > ul').show();
//             $('#sidebar').css({
//                 'margin-left': '0'
//             });
//             $("#container").removeClass("sidebar-closed");
//         }
//     });

// // custom scrollbar
//     $("#sidebar").niceScroll({styler:"fb",cursorcolor:"#4ECDC4", cursorwidth: '3', cursorborderradius: '10px', background: '#404040', spacebarenabled:false, cursorborder: ''});

//     $("html").niceScroll({styler:"fb",cursorcolor:"#4ECDC4", cursorwidth: '6', cursorborderradius: '10px', background: '#404040', spacebarenabled:false,  cursorborder: '', zindex: '1000'});

// // widget tools

//     jQuery('.panel .tools .fa-chevron-down').click(function () {
//         var el = jQuery(this).parents(".panel").children(".panel-body");
//         if (jQuery(this).hasClass("fa-chevron-down")) {
//             jQuery(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
//             el.slideUp(200);
//         } else {
//             jQuery(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
//             el.slideDown(200);
//         }
//     });

//     jQuery('.panel .tools .fa-times').click(function () {
//         jQuery(this).parents(".panel").parent().remove();
//     });


// //    tool tips

//     $('.tooltips').tooltip();

// //    popovers

//     $('.popovers').popover();



// // custom bar chart

//     if ($(".custom-bar-chart")) {
//         $(".bar").each(function () {
//             var i = $(this).find(".value").html();
//             $(this).find(".value").html("");
//             $(this).find(".value").animate({
//                 height: i
//             }, 2000)
//         })
//     }


// }();



// x[0].sentiment.type



