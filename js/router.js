const routes = {
  "/": "LandingPage",
  "/jadwal": "SchedulePage",
  "/tentang": "AboutPage",
};

export function getRouteName() {
  const hash = location.hash.replace("#", "");
  const path = hash || "/";
  return routes[path] || "LandingPage";
}

export function onRouteChange(cb) {
  window.addEventListener("hashchange", cb);
}

