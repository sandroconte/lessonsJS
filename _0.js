
$(".myButton").click(function(){
var $dx = $('#path132'), l = $dx.length, i = 0;
function right() {
  $dx.eq(i % l).fadeIn(1000, function() {
    $dx.eq(i % l).fadeOut(1000, right);
    i++;
  })
}
right();

var $sx = $('#path133'), l = $sx.length, i = 0;
function left() {
  $sx.eq(i % l).fadeIn(1000, function() {
    $sx.eq(i % l).fadeOut(1000, left);
    i++;
  })
};
setTimeout(left,1000);

});
