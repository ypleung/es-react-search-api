const search_nav = () => {

 function closeSearch() {
    var $form = $('.navbar-collapse form[role="search"].active')
    $form.find('input').val('');
    $form.removeClass('active');
  }

  // Show Search if form is not active // event.preventDefault() is important, this prevents the form from submitting
  $(document).on('click', '.navbar-collapse form[role="search"]:not(.active) button[type="submit"]', function(event) {
    event.preventDefault();
    var $form = $(this).closest('form'),
      $input = $form.find('input');
      $form.addClass('active');
      $input.focus();
  });

  // ONLY FOR DEMO // NEED to refer to by name and create event for
  $(document).on('click', '.navbar-collapse form[role="search"].active button[type="submit"]', function(event) {
     event.preventDefault();
     var $form = $(this).closest('form'),
     $input = $form.find('input');
     window.location.href= '/article' + encodeURIComponent('/' + $input.value); return false;
     $input.value = '';
     closeSearch()
  });

};
