chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      /**
       * Listen for scroll events. It might technically be better
       * to use mutation observers, but you'd have to observe
       * the DOM root, because every other element gets unloaded
       * when the SPA navigates to a new page.
       */
      window.addEventListener('scroll', throttle(hideImages));

      /**
       * Don't fire on EVERY scroll event, just at most 3x
       * per second while scrolling is occuring.
       */
      function throttle(callback) {
        let waiting = false;
        return function() {
          if (!waiting) {
            callback();
            waiting = true;
            setTimeout(function() {
              waiting = false;
            }, 300);
          }
        }
      }

      /**
       * Iterate over ever image on the page, hide the ones
       * that match a particular source
       */
      function hideImages() {
        let images = document.querySelectorAll('img');
        if (images[0]) {
          images.forEach(function(image) {
            if (image.src.indexOf('00-1.313.768c.65.123 1.363.274') !== -1) {
              image.parentElement.parentElement.parentElement.parentElement.remove();
            }
          })
        }
      }
      hideImages();

    }
  }, 10);
});
