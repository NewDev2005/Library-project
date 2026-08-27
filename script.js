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
}

function addBookToLibrary(title, author, pages, status){
    const book = new Book(title, author, pages, status);
    myBooks.push(book);
}

function displayBook(){
    
}