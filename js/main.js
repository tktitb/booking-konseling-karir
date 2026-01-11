import { getRouteName, onRouteChange } from "./router.js";
import { el, mount } from "./utils/dom.js";
import { LandingPage } from "./pages/LandingPage.js";
import { SchedulePage } from "./pages/SchedulePage.js";
import { AboutPage } from "./pages/AboutPage.js";

const appRoot = document.getElementById("app");

function setActiveNav() {
  const route = getRouteName();
  const links = document.querySelectorAll(".nav__link");
  links.forEach(a => a.classList.remove("nav__link--active"));
  const map = {
    LandingPage: '#/',
    SchedulePage: '#/jadwal',
    AboutPage: '#/tentang'
  };
  const target = document.querySelector(`.nav a[href="${map[route]}"]`);
  if (target) target.classList.add("nav__link--active");
}

function render() {
  const route = getRouteName();
  let page;
  if (route === "SchedulePage") page = SchedulePage();
  else if (route === "AboutPage") page = AboutPage();
  else page = LandingPage();
  mount(appRoot, page);
  setActiveNav();
}

onRouteChange(render);
render();
