import "./styles.css";
import renderHome from "./home";
import renderMenu from "./menu";
import renderAbout from "./about";


const navBtns = document.querySelectorAll(".nav-btn");
const content = document.querySelector("#content");

function refresh() {
    content.innerHTML = "";
    navBtns.forEach((btn) => {
        btn.classList.remove("selected");
    });
    content.className = ""; 
}

function switchPage(pageName, renderFn) {
    refresh();
    content.classList.add(`page-${pageName}`);
    renderFn();
}

const homeBtn = document.querySelector("#home");
homeBtn.addEventListener("click", () => {
    switchPage("home", renderHome);
    homeBtn.classList.add("selected");
});

const menuBtn = document.querySelector("#menu");
menuBtn.addEventListener("click", () => {
    switchPage("menu", renderMenu);
    menuBtn.classList.add("selected");
});

const aboutBtn = document.querySelector("#about");
aboutBtn.addEventListener("click", () => {
    switchPage("about", renderAbout);
    aboutBtn.classList.add("selected");
});


homeBtn.click();
export {switchPage};