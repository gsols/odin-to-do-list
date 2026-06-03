import image from "../public/images/1.png";
import renderBook from "./book";
import { switchPage } from "./index";

function renderHome() {
    const content = document.getElementById("content");

    const left = document.createElement("div");
    const right = document.createElement("div");
    right.classList.add("home-right");  
    left.classList.add("home-left");
    content.appendChild(left);
    content.appendChild(right);

    const greeting1 = document.createElement("div");
    const description = document.createElement("div");
    greeting1.innerText = `ENJOY YOUR MEAL \n   WITH US!`;
    description.innerText = "Experience the best steak in town at The Steakhouse. Our premium cuts of meat are cooked to perfection and served with a variety of delicious sides. Whether you're in the mood for a classic ribeye or a tender filet mignon, we have something for every steak lover. Come dine with us and savor the flavors of our expertly crafted dishes.";
    greeting1.classList.add("home-greeting");
    description.classList.add("home-description");

    const bookButton = document.createElement("button");
    bookButton.innerText = "Book a Table";
    bookButton.classList.add("home-book-button");

    left.appendChild(greeting1);
    left.appendChild(description);
    left.appendChild(bookButton);

    const image1 = document.createElement("img");
    image1.src = image;
    image1.alt = "home page image";
    image1.classList.add("home-page-image");
    right.appendChild(image1);

    bookButton.addEventListener("click", () => {
        switchPage("book", renderBook);
    });

}

export default renderHome;