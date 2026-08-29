const myBooks = [];
function Book(title, author, pages, status){
    if (!new.target) {
        throw Error("You must use the new operator");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
    this.listed = false;
}

function createBook(title, author, pages, status){
    const book = new Book(title, author, pages, status);
    myBooks.push(book);
    displayBook();
}

function displayBook(){
    const container = document.querySelector("#container");
    myBooks.forEach((book) => {
        if (book.listed == true) {
            return;
        }
        const div = document.createElement("div");
        const titlePara = document.createElement("p");
        const authorPara = document.createElement("p")
        const pagesPara = document.createElement("p")
        div.setAttribute("class", "book");
        container.appendChild(div);
        div.appendChild(titlePara);
        div.appendChild(authorPara);
        div.appendChild(pagesPara);
        titlePara.innerHTML = "<b>Title</b>: " + `${book.title}`;
        authorPara.innerHTML = "<b>Author</b>: " + `${book.author}`;
        pagesPara.innerHTML = "<b>Pages</b>: " + `${book.pages}`;
        book.listed = true;
    });
}


function addBook(){
    const form = document.querySelector("#book-info");
    const title = form.elements['title'];
    const author = form.elements['author'];
    const pages = form.elements['pages'];
    const btn = document.querySelector("#submit");
    const dialog = document.querySelector("#book-dialog");
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        createBook(title.value, author.value, pages.value);
        dialog.close()
    });
}


function removeBook(){

}

createBook("The ignited minds", "APJ abdul kalam", 259, "read");
createBook("The song of ice and fire", "George martin", 999, " not read");


addBook();

