function renderBook() {
    const content = document.querySelector("#content");

    const heading = document.createElement("h2");
    heading.textContent = "Book a Table";
    content.appendChild(heading);

    const bookForm = document.createElement("form");

    const fields = [
        { label: "Name", type: "text", id: "name" },
        { label: "Email", type: "email", id: "email" },
        { label: "Phone Number", type: "tel", id: "phone" },
        { label: "Date", type: "date", id: "date" },
        { label: "Time", type: "time", id: "time" },
        { label: "Number of Guests", type: "number", id: "guests" }
    ];

    fields.forEach(field => {
        const label = document.createElement("label");
        label.setAttribute("for", field.id);
        label.textContent = field.label;

        const input = document.createElement("input");
        input.setAttribute("type", field.type);
        input.setAttribute("id", field.id);
        input.setAttribute("name", field.id);
        input.setAttribute("required", true);

        bookForm.appendChild(label);
        bookForm.appendChild(input);
    });

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Book Table";
    bookForm.appendChild(submitButton);

    content.appendChild(bookForm);
}

export default renderBook;