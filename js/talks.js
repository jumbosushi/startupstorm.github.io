// On page load...
$(function() {

  Parse.initialize("VQV5exDOHIgQBqAnOM9KtnlyG3IIJ6qIeFwHvPxA", "V9BggunFvfLpRPUMJJvQ1tK1EnPlffoubmnD6LIl");


  // handler for form submission
  $('.preregister-modal input[value="submit"]').on("click", function(event) {
    var $form = $('.preregister-modal form');
    
    var $target = $($form.attr('data-target'));
    // Log the user out in case they're still logged in
    Parse.User.logOut();
    
    var data = convertFormToJSON($form);
    data.password = Math.random().toString(36).substring(2);
    data.username = data.email;
    
    var user = new Parse.User();
    user.signUp(data, {
      success: function(user) {
        
        $modal = $('.preregister-modal');

        $("form").find("input[type=text]").val("");
        window.setTimeout( $modal.modal('hide');, 500);

      },
      error: function(user, error) {

        //window.alert("There was an error with your application: " + error.message);
      }
    });
    event.preventDefault();

  });
});

function convertFormToJSON(form){
  var array = $(form).serializeArray();
  var json = {};
  
  jQuery.each(array, function() {
      json[this.name] = this.value || '';
  });
  
  return json;
}
