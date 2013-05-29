/**
 * Fix for IE8, not allowing form submition/deletion of reservation on ENTER.
 */
(function($) {
  $(document).ready(function() {
    if ($.browser.msie && parseInt($.browser.version, 10) === 8) {
	    $('input.form-submit').keydown(function(e) {
        if (e.which == 13) {
          return false;
        }
        return true;
      });
    }
  });
})(jQuery);
