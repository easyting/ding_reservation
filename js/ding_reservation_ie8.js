/**
 * Fix for IE8, not allowing form submition/deletion of reservation on ENTER.
 */
(function($) {
  $(document).keydown(function(e) {
    if (e.keyCode == 13) { 
        return false;
    }
    return true;
  });
})(jQuery);
