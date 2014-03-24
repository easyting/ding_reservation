(function($) {

  Drupal.behaviors.reservation_deletion_confirmation = {
    attach: function(context, settings) {
      var selector = '.delete-reservation > .form-submit, #ding-reservation-reservations-notready-form';
      $(selector, context).submit(function(e){
        var self = this;
        var yes = Drupal.t("Yes");
        var cancel = Drupal.t("Cancel");
        var title = Drupal.t('Are you sure you want to delete reservation(s)?');

        $('<div class="reservation-delete-confirm-popup">' + title + '</div>').dialog({
          resizable: false,
          height: 'auto',
          modal: true,
          buttons: {
            yes: function() {
              $(this).dialog("close");
              // Trigger native submit routine so the current handler won't be fired.
              self.submit();
            },
            cancel: function() {
              $(this).dialog("close");
            }
          }
        });

        e.preventDefault();
      });
    }
  };

})(jQuery);
