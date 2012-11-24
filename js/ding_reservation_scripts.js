(function($) {
  enable_reservation = function(ajax, response, status) {
    var entity_id = response.data;
    var forms = $('form');
    var regex = new RegExp(entity_id, 'g');
    // Loop through all forms on a page, deeper filtering comes next.
    forms.each(function() {
      form = $(this);
      // Wee seek for reservations forms, thus specific form whose item was clicked.
      if (form.attr('id').match(/ding-reservation-reserve-form/g) && form.attr('action').match(regex)) {
        // Dynamic form, so reattach the behaviors.
        Drupal.attachBehaviors($('#ding-reservation-reserve-form'));
        // Make sure the behaviors were attached.
        setTimeout(function() {
          form.hide();
          // Call mousedown(), since click() event is forbidden by #ajax['prevent'].
          form.find('.form-submit').mousedown();
        }, 500);
      }
    });
  }

  Drupal.behaviors.ding_reservation = {
    attach: function (context, settings) {
      Drupal.ajax.prototype.commands.enable_reservation = enable_reservation;
    }
  };
})(jQuery);
