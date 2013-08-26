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
        form.hide();
        // Make sure the behaviors were attached.
        setTimeout(function() {
          // Call mousedown(), since click() event is forbidden by #ajax['prevent'].
          form.find('.form-submit').mousedown();
        }, 500);
      }
    });
  }

  Drupal.behaviors.ding_reservation = {
    attach: function (context, settings) {
      Drupal.ajax.prototype.commands.enable_reservation = enable_reservation;

      var items = $('.reservation-link-ajax');
      var ids = new Array(items.length);

      items.each(function(i, e) {
         local_id = $(e).attr('class').match(/ting-object-id-(\d+)/);
         ids[i] = local_id[1];
      });

      $.ajax({
        url: '/ding_availability/items/' + ids.join(','),
        dataType: 'json',
        success: function(response) {
          for (var i = 0; i < ids.length; i++) {
            if (response[ids[i]].show_reservation_button) {
              $('.reservation-link-ajax.ting-object-id-' + ids[i]).show();
            }
          }
        }
      });
    }
  };
})(jQuery);
