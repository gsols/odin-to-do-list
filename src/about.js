import image1 from "../public/images/filet.webp";
import image2 from "../public/images/ribeye.jpg";
import image3 from "../public/images/strip.jpeg";


function renderAbout() {
    const content = document.querySelector("#content");

    const coverPhotos = document.createElement("div");
    coverPhotos.classList.add("about-cover-photos");
    content.appendChild(coverPhotos);

    const imageSlot1 = document.createElement("div");
    imageSlot1.classList.add("about-image-slot");
    coverPhotos.appendChild(imageSlot1);
    const imageSlot2 = document.createElement("div");
    imageSlot2.classList.add("about-image-slot");
    coverPhotos.appendChild(imageSlot2);
    const imageSlot3 = document.createElement("div");
    imageSlot3.classList.add("about-image-slot");
    coverPhotos.appendChild(imageSlot3);

    const image_1 = document.createElement("img");
    image_1.classList.add("about-image");
    image_1.src = image1;
    image_1.alt = "About Us";
    imageSlot1.appendChild(image_1);

    const image_2 = document.createElement("img");
    image_2.classList.add("about-image");
    image_2.src = image2;
    image_2.alt = "About Us";
    imageSlot2.appendChild(image_2);

    const image_3 = document.createElement("img");
    image_3.classList.add("about-image");
    image_3.src = image3;
    image_3.alt = "About Us";
    imageSlot3.appendChild(image_3);

    const heading = document.createElement("h2");
    heading.textContent = "About The Steakhouse";
    heading.classList.add("about-heading");
    content.appendChild(heading);

    const line = document.createElement("hr");
    line.classList.add("about-divider");
    content.appendChild(line);

    const aboutText = document.createElement("p");
    aboutText.classList.add("about-text");
    aboutText.textContent = "Welcome to our restaurant! We are passionate about serving delicious food made from the freshest ingredients. Our menu features a variety of dishes inspired by global cuisines, crafted with care by our talented chefs. Whether you're in the mood for a hearty meal or a light bite, we have something for everyone. Join us for an unforgettable dining experience where great food meets exceptional service.";
    content.appendChild(aboutText);
}

export default renderAbout;