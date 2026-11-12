// Fades each section in as it scrolls into view. Without JavaScript, or with reduced motion,
// everything is simply visible (see the .js and prefers-reduced-motion rules in style.css).
(function () {
  var items = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduce) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  items.forEach(function (el) { observer.observe(el); });
})();

// The looping screen recordings play only while they are on screen, and stay as a still picture
// for anyone who prefers reduced motion.
(function () {
  var videos = document.querySelectorAll('.phone video');
  if (!videos.length) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  videos.forEach(function (video) { video.muted = true; });

  if (reduce || !('IntersectionObserver' in window)) {
    videos.forEach(function (video) { video.removeAttribute('autoplay'); video.pause(); });
    return;
  }

  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var video = entry.target;
      if (entry.isIntersecting) {
        var started = video.play();
        if (started && started.catch) started.catch(function () { /* autoplay refused: the poster stays */ });
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.25 });

  videos.forEach(function (video) { watcher.observe(video); });
})();

// The download button. Until the app is on the App Store (or open for pre-order) the buttons say "Coming soon".
// To switch them over, put the app's App Store link in <body data-app-store-url="..."> in index.html.
(function () {
  var url = (document.body.getAttribute('data-app-store-url') || '').trim();
  if (!/^https:\/\/apps\.apple\.com\//.test(url)) return;
  document.querySelectorAll('[data-store]').forEach(function (el) {
    var link = document.createElement('a');
    link.className = el.className;
    link.href = url;
    link.textContent = 'Download on the App Store';
    el.replaceWith(link);
  });
})();
