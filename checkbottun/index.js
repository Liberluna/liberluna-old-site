$(".toggle").on("click", function() {
    $(".toggle").toggleClass("checked");
    if(!$('input[name="check"]').prop("checked")) {
      $(".toggle input").prop("checked", true);
    } else {
      $(".toggle input").prop("checked", false);
    }
  });