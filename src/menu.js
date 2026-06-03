import ribeyeImg from "../public/images/ribeye.jpg";
import filetImg from "../public/images/filet.webp";
import stripImg from "../public/images/strip.jpeg";

let items = [
    {
        name: "Ribeye Steak",
        description: "A juicy ribeye steak cooked to perfection, served with garlic butter and your choice of sides.",
        price: 24.99,
        photoSrc: ribeyeImg
    },
    {
        name: "Filet Mignon",
        description: "Tender filet mignon wrapped in bacon, served with a red wine reduction and seasonal vegetables.",
        price: 29.99,
        photoSrc: filetImg
    },
    {
        name: "New York Strip",
        description: "A flavorful New York strip steak grilled to your liking, accompanied by mashed potatoes and steamed broccoli.",
        price: 22.99,
        photoSrc: stripImg
    },
        {
        name: "Ribeye Steak",
        description: "A juicy ribeye steak cooked to perfection, served with garlic butter and your choice of sides.",
        price: 24.99,
        photoSrc: ribeyeImg
    },
    {
        name: "Filet Mignon",
        description: "Tender filet mignon wrapped in bacon, served with a red wine reduction and seasonal vegetables.",
        price: 29.99,
        photoSrc: filetImg
    },
    {
        name: "New York Strip",
        description: "A flavorful New York strip steak grilled to your liking, accompanied by mashed potatoes and steamed broccoli.",
        price: 22.99,
        photoSrc: stripImg
    },
    {
        name: "Filet Mignon",
        description: "Tender filet mignon wrapped in bacon, served with a red wine reduction and seasonal vegetables.",
        price: 29.99,
        photoSrc: filetImg
    },
    {
        name: "New York Strip",
        description: "A flavorful New York strip steak grilled to your liking, accompanied by mashed potatoes and steamed broccoli.",
        price: 22.99,
        photoSrc: stripImg
    },
        {
        name: "Ribeye Steak",
        description: "A juicy ribeye steak cooked to perfection, served with garlic butter and your choice of sides.",
        price: 24.99,
        photoSrc: ribeyeImg
    },
    {
        name: "Filet Mignon",
        description: "Tender filet mignon wrapped in bacon, served with a red wine reduction and seasonal vegetables.",
        price: 29.99,
        photoSrc: filetImg
    },
    {
        name: "New York Strip",
        description: "A flavorful New York strip steak grilled to your liking, accompanied by mashed potatoes and steamed broccoli.",
        price: 22.99,
        photoSrc: stripImg
    },
        {
        name: "Ribeye Steak",
        description: "A juicy ribeye steak cooked to perfection, served with garlic butter and your choice of sides.",
        price: 24.99,
        photoSrc: ribeyeImg
    },
    {
        name: "Filet Mignon",
        description: "Tender filet mignon wrapped in bacon, served with a red wine reduction and seasonal vegetables.",
        price: 29.99,
        photoSrc: filetImg
    },
    {
        name: "New York Strip",
        description: "A flavorful New York strip steak grilled to your liking, accompanied by mashed potatoes and steamed broccoli.",
        price: 22.99,
        photoSrc: stripImg
    },
    {
        name: "Filet Mignon",
        description: "Tender filet mignon wrapped in bacon, served with a red wine reduction and seasonal vegetables.",
        price: 29.99,
        photoSrc: filetImg
    },
    {
        name: "New York Strip",
        description: "A flavorful New York strip steak grilled to your liking, accompanied by mashed potatoes and steamed broccoli.",
        price: 22.99,
        photoSrc: stripImg
    }
];


function renderMenu() {
    const content = document.querySelector("#content");
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu-container");
    content.appendChild(menuContainer);

    items.forEach((item) => {
        const menuItem = createMenuItem(item.name, item.description, item.price, item.photoSrc);
        menuContainer.appendChild(menuItem);
    });
}

function createMenuItem(name, description, price, photoSrc) {
    const item = document.createElement("div");
    item.classList.add("menu-item");

    const img = document.createElement("img");
    img.classList.add("menu-item-image");
    img.src = photoSrc;
    img.alt = name;
    item.appendChild(img);

    const info = document.createElement("div");
    info.classList.add("menu-item-info");

    const title = document.createElement("h3");
    title.innerText = name;
    info.appendChild(title);

    const desc = document.createElement("p");
    desc.innerText = description;
    info.appendChild(desc);

    const separator = document.createElement("div");
    info.appendChild(separator);

    const priceTag = document.createElement("span");
    priceTag.classList.add("menu-item-price");
    priceTag.innerText = `$${price.toFixed(2)}`;
    separator.appendChild(priceTag);

    const addButton = document.createElement("button");
    addButton.innerText = "+";
    addButton.classList.add("menu-item-add-button");
    separator.appendChild(addButton);

    item.appendChild(info);
    return item;
}

export default renderMenu;