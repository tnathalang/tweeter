$(document).ready(function() {
  $(".new-tweet textarea").on("keyup", function(event) {
    let counterEl = $(this)
      .parent("form")
      .find(".counter");
    const currentInput = $(this).val().length;
    const maxInput = 140;

    counterEl.text(maxInput - currentInput);
    if (currentInput <= maxInput) {
      counterEl.css("color", "black");
    } else {
      counterEl.css("color", "red");
    }
  });
});
