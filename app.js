// Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI construtor
function UI(){}

// Add Book To List
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
  `;

  list.appendChild(row);
}
// Delete book

UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

//Show Alert
UI.prototype.showAlert = function(message, className){
//create div
  const div = document.createElement('div');
//Add classes
  div.className = `alert ${className}`
  div.appendChild(document.createTextNode(message));
  //Get Parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  //insert alert
  container.insertBefore(div, form);

  //Time Out after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}


// Clear Fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


//Add Event listener

document.getElementById('book-form').addEventListener('submit', function(e){
  // get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  //Instatiate book
  const book = new Book(title, author, isbn);
  
  //Instantiate UI

  const ui = new UI();

  //Validate
  if(title === '' || author === '' || isbn === ''){

    ui.showAlert('Please Fill In The All Fields', 'error');

  } else{

    //Add book to list
  ui.addBookToList(book);

  //Show Succes
  ui.showAlert('Book Added!', 'success');

  ui.clearFields();
  }



  e.preventDefault();

})

//Add event listener for delete book
document.getElementById('book-list').addEventListener('click', function(e){

  const ui = new UI();

//listen for the click and send them into the fucntion

ui.deleteBook(e.target);

// Show Alert

ui.showAlert('Book Deleted!', 'success');

e.preventDefault();




})