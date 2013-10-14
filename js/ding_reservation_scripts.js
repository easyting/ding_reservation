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
  };

  Drupal.behaviors.ding_reservation = {
    attach: function (context, settings) {
      Drupal.ajax.prototype.commands.enable_reservation = enable_reservation;
      var ele = $('.reservation-link-ajax').not('.ajax-reservable-processed');
      var ids = new Array(ele.length);
      var run_request = false;

      $(ele, context).once('ajax-reservable', function(i, e) {
        local_id = $(e).attr('class').match(/ting-object-id-([\w\d]+)/);

        if (local_id && local_id[1] !== undefined) {
          ids[i] = local_id[1];
          run_request = true;
        }
      });

      if (run_request) {
        DingAvailability.process('availability', ids, function (id, data) {
          if (data.show_reservation_button) {
            $('.reservation-link-ajax.ting-object-id-' + id).show();
          }
        });
      }
    }
  };
})(jQuery);
