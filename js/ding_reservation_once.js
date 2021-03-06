/**
 * Run autoreservation when cookie was set and DOM is ready.
 */
(function($) {
  $(document).ready(function() {
    if ($.cookie) {
      var entityId;
      if (entityId = $.cookie('entityReserveOnce')) {
        // Delete the cookie.
        $.cookie('entityReserveOnce', null, { path: '/' });
        var reserveTrigger = $('a[href$="reserve/' + entityId + '"]');
        if (!reserveTrigger.length) {
          reserveTrigger = $('#ding-reservation-reserve-form input[name=op]');
        }
        $('html, body').animate({
         scrollTop: $(reserveTrigger).offset().top
        }, 2000);
        // Make sure the behaviors were attached.
        setTimeout(function() {
          // Call click() for links.
          if ($(reserveTrigger).attr('href')) {
            $(reserveTrigger).click();
          }
          // Call mousedown(), since click() event is forbidden by #ajax['prevent'].
          else {
            $(reserveTrigger).mousedown();
          }
        }, 500);
      }
    }
  });
})(jQuery);
