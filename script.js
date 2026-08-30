const myBooks = [];
function Book(title, author, pages){
    if (!new.target) {
        throw Error("You must use the new operator");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = "read";
    this.id = crypto.randomUUID();
    this.listed = false;
    this.updateStatus = function(){
        if (this.status === "read"){
            this.status = "not read yet!";
        } else {
            this.status = "read";
        }
    };
}

function createBook(title, author, pages){
    const book = new Book(title, author, pages);
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
        const firstChild = document.querySelector("#first-child");
        const deleteBtn = document.createElement("button");
        const totalBookpara = document.createElement("p")
        const readToggleBtn = document.createElement("button");
        readToggleBtn.innerHTML = book.status
        deleteBtn.innerHTML= "Delete";
        readToggleBtn.setAttribute("id", "status-btn");
        deleteBtn.setAttribute("id", "remove-btn");
        deleteBtn.setAttribute("data-unique-id", book.id);
        deleteBtn.setAttribute("data-event-listener", "false");
        readToggleBtn.setAttribute("data-unique-id", book.id);
        readToggleBtn.setAttribute("data-event-listener", "notAdded");
        const titlePara = document.createElement("p");
        const authorPara = document.createElement("p");
        const pagesPara = document.createElement("p");
        div.setAttribute("class", "book");
        firstChild.appendChild(totalBookpara);
        container.appendChild(div);
        div.appendChild(titlePara);
        div.appendChild(authorPara);
        div.appendChild(pagesPara);
        div.appendChild(deleteBtn);
        div.appendChild(readToggleBtn);

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
        displayTotalBookCount();
        enableDeleteBtnForBook();
        toggleReadStatus();
        dialog.close();
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
                    displayTotalBookCount();
                });
                deleteBtn.dataset.eventListener = "true";
            }
        });
    }
   
}

function toggleReadStatus(){
    const readBtns = document.querySelectorAll("#status-btn");
    if (readBtns.length > 0){
        readBtns.forEach((readBtn) => {
            if (readBtn.dataset.eventListener === "notAdded"){
                readBtn.addEventListener("click", () => {
                    const book = getBook(readBtn.dataset.uniqueId);
                    if (book.status === "read"){
                        book.status = "not read yet!";
                        readBtn.innerHTML = book.status;
                    } else {
                        book.status = "read";
                        readBtn.innerHTML = book.status;
                    }
                });
                readBtn.dataset.eventListener = "added";
            }
        });
    }
}


function displayTotalBookCount(){
    const para = document.querySelector("#first-child > p:first-of-type");
    para.innerHTML = "<b>Total Books: </b>" + `${myBooks.length}`;
}


function getBook(id){
   for (let i = 0; i < myBooks.length; i++){
    if (myBooks[i].id === id){
        return myBooks[i];
    }
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

createBook("Rails for Dummies", "Ser DHH", 300);
createBook("Bjorn the ironside", "Odin-All-father", 69);
enableDeleteBtnForBook();
toggleReadStatus();
displayTotalBookCount();

addBook();
