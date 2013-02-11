/**
 * Run autoreservation when cookie was set and DOM is ready.
 */
(function($) {
  $(document).ready(function() {
    if ($.cookie) {
      var entityId;
      if (entityId = $.cookie('entityReserveOnce')) {
        $.cookie('entityReserveOnce', null, { path: '/' });
        var reserveTrigger = $('a[href$="reserve/' + entityId + '"]');
        if (!reserveTrigger.length) {
          reserveTrigger = $('#ding-reservation-reserve-form input[name=op]');
        }
        $('html, body').animate({
         scrollTop: $(reserveTrigger).offset().top
        }, 2000);
        $(reserveTrigger).click();
      }
    }
  });
})(jQuery);
