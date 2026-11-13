const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

const introScreen = document.querySelector(".intro-screen");
const navigationType = performance.getEntriesByType("navigation")[0]?.type;
const pageDirectory = window.location.pathname.slice(0, window.location.pathname.lastIndexOf("/") + 1);
const referrerPath = document.referrer ? new URL(document.referrer).pathname : "";
const arrivedFromPortfolioPage = referrerPath.startsWith(pageDirectory);
const isHomepage = (
  (window.location.pathname.endsWith("/") || window.location.pathname.endsWith("/index.html"))
  && (!window.location.hash || window.location.hash === "#home")
);
const shouldPlayIntro = Boolean(
  introScreen
  && !motionPreference.matches
  && isHomepage
  && (navigationType === "reload" || (navigationType === "navigate" && !arrivedFromPortfolioPage))
);

if (shouldPlayIntro) {
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  let dismissed = false;
  let doorTimer;
  let arrivalTimer;
  let dismissTimer;

  document.body.classList.add("is-intro-active");
  introScreen.hidden = false;
  header.inert = true;
  main.inert = true;

  function dismissIntro() {
    if (dismissed) {
      return;
    }

    dismissed = true;
    window.clearTimeout(doorTimer);
    window.clearTimeout(arrivalTimer);
    window.clearTimeout(dismissTimer);
    introScreen.classList.add("is-closing");

    window.setTimeout(() => {
      introScreen.hidden = true;
      header.inert = false;
      main.inert = false;
      document.body.classList.remove("is-intro-active", "is-intro-arriving");
      document.querySelector("#hero-title").focus({ preventScroll: true });
    }, 400);
  }

  doorTimer = window.setTimeout(() => {
    introScreen.classList.add("is-opening");
  }, 650);
  arrivalTimer = window.setTimeout(() => {
    document.body.classList.add("is-intro-arriving");
  }, 1150);
  dismissTimer = window.setTimeout(() => dismissIntro(), 1900);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !introScreen.hidden) {
      dismissIntro();
    }
  });
}

if (!motionPreference.matches) {
  const transitionLayer = document.createElement("div");
  transitionLayer.className = "theme-transition";
  transitionLayer.setAttribute("aria-hidden", "true");
  document.body.append(transitionLayer);
  function onTransitionComplete(animationName, callback) {
    function handleAnimationEnd(event) {
      if (event.target !== transitionLayer || event.animationName !== animationName) {
        return;
      }

      transitionLayer.removeEventListener("animationend", handleAnimationEnd);
      callback();
    }

    transitionLayer.addEventListener("animationend", handleAnimationEnd);
  }

  if (!shouldPlayIntro) {
    transitionLayer.classList.add("is-opening");
    onTransitionComplete("transition-backdrop-open", () => {
      transitionLayer.classList.remove("is-opening");
    });
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (
      !link
      || event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
      || link.target
      || link.hasAttribute("download")
    ) {
      return;
    }

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) {
      return;
    }

    event.preventDefault();
    transitionLayer.classList.remove("is-opening");
    onTransitionComplete("transition-backdrop-cover", () => {
      window.location.assign(destination.href);
    });
    transitionLayer.classList.add("is-covering");
  });
}
