function setUpCaps() {
  var dropcaps = document.querySelectorAll(".dropcap");
  window.Dropcap.layout(dropcaps, 3);
}

document.addEventListener("DOMContentLoaded", setUpCaps);

document.addEventListener(
  "DOMContentLoaded",
  function addCurrentClassToMatchingNavigationItem(_event) {
    var links = document.querySelectorAll("#main_navigation ul li a");
    var pathname = location.href;

    for (var i = 0, length = links.length; i < length; i += 1) {
      if (pathname === links[i].href) {
        links[i].classList.add("current");
      }
    }
  },
);

var isAnimating = false;

document
  .querySelectorAll('#main_navigation [data-type="page-transition"]')
  .forEach(function mainNavigationEventListener(e) {
    e.addEventListener("click", function clickHandlerMainNavigation(event) {
      event.preventDefault();

      var newPage = this.getAttribute("href");

      // remove current class from all main navigation links
      var links = document.querySelectorAll("#main_navigation ul li a");
      for (var i = 0, length = links.length; i < length; i += 1) {
        links[i].classList.remove("current");
      }

      this.classList.add("current");

      if (!isAnimating) changePage(newPage);
    });
  });

function changePage(url) {
  isAnimating = true;
  document.querySelector("body").classList.add("page-is-changing");
  loadNewContent(url);
}

function loadNewContent(url) {
  var xhr = new XMLHttpRequest();
  var timer = +new Date();

  xhr.addEventListener("load", function () {
    var doc = document.createElement("div");
    doc.innerHTML = this.responseText;
    var frame = doc.querySelector("#wrapper");
    document.querySelector("#wrapper").replaceWith(frame);
    setUpCaps();

    var timeElapsed = +new Date() - timer;
    var timeoutDuration = timeElapsed < 200 ? 200 - timeElapsed : 25;

    setTimeout(function () {
      isAnimating = false;
      document.querySelector("body").classList.remove("page-is-changing");
      if (url != window.location) {
        window.history.pushState({ path: url }, "", url);
      }
    }, timeoutDuration);
  });

  xhr.open("GET", url);
  xhr.send();
}

window.addEventListener("popstate", function (_event) {
  if (!window.location.href.indexOf("#fnref:")) {
    var newPageArray = location.pathname.split("/"),
      newPage = newPageArray[newPageArray.length - 1];
    if (!isAnimating) changePage(newPage);
  }
});
