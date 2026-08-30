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
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML= "Delete";
        deleteBtn.setAttribute("id", "remove-btn");
        deleteBtn.setAttribute("data-unique-id", book.id);
        deleteBtn.setAttribute("data-event-listener", "false");
        const titlePara = document.createElement("p");
        const authorPara = document.createElement("p")
        const pagesPara = document.createElement("p")
        div.setAttribute("class", "book");
        container.appendChild(div);
        div.appendChild(titlePara);
        div.appendChild(authorPara);
        div.appendChild(pagesPara);
        div.appendChild(deleteBtn);
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
        enableDeleteBtnForBook();
        dialog.close()
    });
}

function enableDeleteBtnForBook(){
    const deleteBtns = document.querySelectorAll("#remove-btn");
    if (deleteBtns.length > 0){
        deleteBtns.forEach((deleteBtn) => {
            if (deleteBtn.dataset.eventListener === "false"){
                deleteBtn.addEventListener("click", () => {
                    const container = document.querySelector("#container");
                    const parentDiv = deleteBtn.parentNode;
                    id = deleteBtn.dataset.uniqueId;
                    container.removeChild(parentDiv);
                    updateCatalogue(id);
                });
                deleteBtn.dataset.eventListener = "true";
            }
        });
    }
   
}

function RemoveDeletedBookFromArr(uniqueId){
    arr = []
   for (let i = 0; i < myBooks.length; i++){
        book = myBooks[i];
        if (book.id !== uniqueId){
            arr.push(book);;
        } 
   }
   return arr;
}

function removeAllBooks(){
    while(myBooks.length > 0){
        myBooks.pop();
    }
}

function updateCatalogue(uniqueId){
    arr = RemoveDeletedBookFromArr(uniqueId);
    console.log(arr);
    removeAllBooks();
    for (let i = 0; i < arr.length; i++){
        myBooks.push(arr[i]);
    }
}

createBook("The ignited minds", "APJ abdul kalam", 259, "read");
createBook("The song of ice and fire", "George martin", 999, " not read");
enableDeleteBtnForBook();

addBook();
