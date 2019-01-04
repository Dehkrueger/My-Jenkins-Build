window.onload=()=>{
    getBooks();
}

function getBooks(){
    //create a new xml http request
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=displayBooks;
    xhttp.open("GET","books");
    xhttp.send();

    function displayBooks(){
        if(xhttp.readyState===4 && xhttp.status===200){
            books = JSON.parse(xhttp.responseText);
            books.forEach(function(book, index){
                addBookToTable(book);
            });
        }
    }
}

function addBookToTable(book){
    console.log(book);
    var table = document.getElementById("books");
    var tr = document.createElement("tr")
    let td;
    //is
    td = document.createElement("td");
    td.innerHTML=book.id;
    tr.appendChild(td);
    //cover
    td = document.createElement("td");
    tr.appendChild(td);
    let cover = document.createElement("img");
    cover.src = book.cover;
    cover.alt = book.title;
    cover.width = 90;
    td.appendChild(cover);
    //isbn10
    addTableDef(book.isbn10, tr);
    //isbn13
    addTableDef(book.isbn13, tr);
    //title
    addTableDef(book.title, tr);
    //authors

    let authors = book.authors;
    addListtoTable(tr, book.authors, (author)=>`${author.first} ${author.last}`);
    //genres
    addListtoTable(tr, book.genres, (genre)=>`${genre.genre}`);
    //stock
    addTableDef(book.stock, tr);
    //price
    addTableDef(book.price, tr);
    //edit button
    //delete button
    table.appendChild(tr);
}

function addTableDef(value, tr){
    td = document.createElement("td");
    td.innerHTML=value;
    tr.appendChild(td);
}
function addListToTable(tr, list, parser){
     td = document.createElement("td");
     let ul = document.createElement("ul");
     for(let i = 0; i < list.length; i++){
         let li = document.createElement("li");
         li.innerHTML=parser(list[i]);
         ul.appendChild(li);
     }
     td.appendChild(ul);
     tr.appendChild(td);
}